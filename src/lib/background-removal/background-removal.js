import * as bodyPix from '@tensorflow-models/body-pix'
import { hex2rgba } from '../../utils'

const defaultBodyPixConfig = {
  flipHorizontal: false,
  internalResolution: 'full',
  segmentationThreshold: 0.7,
  backgroundColour: '#ffffff'
}

export default class BackgroundRemoval {
  constructor () {
    this.model = null
  }

  async remove (imgData, newConfig = {}) {
    const { width, height } = imgData
    const config = { ...defaultBodyPixConfig, ...newConfig }

    await this.loadModel()

    const predictedImgData = await this._predict(imgData, config)
    const rawImageData = await this._intersectPixels(imgData, predictedImgData, config.backgroundColour)

    const canvas = document.createElement('canvas')
    canvas.setAttribute('width', width)
    canvas.setAttribute('height', height)

    const ctx = canvas.getContext('2d')

    const imageData = ctx.createImageData(width, height)
    for (let i = 0; i < imageData.data.length; i++) {
      imageData.data[i] = rawImageData.data[i]
    }

    ctx.putImageData(imageData, 0, 0)

    return canvas.toDataURL()
  }

  async loadModel () {
    if (this.model) {
      return this.model
    }

    this.model = await bodyPix.load()

    return this.model
  }

  async _predict (imgData, config = {}) {
    await this.loadModel()

    return this.model.segmentPerson(imgData, config)
  }

  async _intersectPixels (imgData, predictedImgData, backgroundColour = '#ffffff') {
    const { width, height } = imgData
    const [r, g, b, a] = hex2rgba(backgroundColour)

    const newImageData = {
      width,
      height,
      data: new Uint8ClampedArray(width * height * 4)
    }

    for (let index = 0; index < (width * height * 4); index += 4) {
      // Use a background colour specified by user
      const isBody = predictedImgData.data[index / 4] > 0

      newImageData.data[index] = isBody ? imgData.data[index] : r
      newImageData.data[index + 1] = isBody ? imgData.data[index + 1] : g
      newImageData.data[index + 2] = isBody ? imgData.data[index + 2] : b
      newImageData.data[index + 3] = isBody ? imgData.data[index + 3] : a
    }

    return newImageData
  }
}
