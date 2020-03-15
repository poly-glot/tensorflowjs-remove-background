import * as bodyPix from '@tensorflow-models/body-pix'
import BackgroundRemoval from '../background-removal'

jest.mock('@tensorflow-models/body-pix', () => {
  return {
    load: jest.fn()
  }
})

describe('BackgroundRemoval test', () => {
  let instance

  beforeEach(() => {
    instance = new BackgroundRemoval()
  })

  describe('BackgroundRemoval.loadModel()', () => {
    beforeEach(() => {
      jest.spyOn(bodyPix, 'load').mockResolvedValue('body-pix-object')
    })

    it('Should exists', () => {
      expect(instance.loadModel).toBeTruthy()
    })

    it('Should load & return bodyPix model', () => {
      expect(instance.loadModel()).resolves.toEqual('body-pix-object')
    })

    it('Should only call bodyPix once', async () => {
      await instance.loadModel()
      await instance.loadModel()
      await instance.loadModel()

      expect(bodyPix.load.mock.calls.length).toEqual(1)
    })
  })

  describe('BackgroundRemoval._predict()', () => {
    const mockBodyPix = {
      segmentPerson: jest.fn()
    }

    beforeEach(() => {
      jest.spyOn(bodyPix, 'load').mockResolvedValue(mockBodyPix)
    })

    it('Should exists', () => {
      expect(instance._predict).toBeTruthy()
    })

    it('Should pass arguments to bodyPix', async () => {
      const imgData = 'imgData'
      const config = 'config'
      await instance._predict(imgData, config)

      expect(mockBodyPix.segmentPerson).toBeCalled()
      expect(mockBodyPix.segmentPerson).toBeCalledWith(imgData, config)
    })
  })

  describe('BackgroundRemoval._intersectPixels()', () => {
    const backgroundColour = '#0000ff' // blue

    it('Given I have 1x1 image and segment identified pixel as a body then return image body pixel', async () => {
      const imgData = {
        width: 1,
        height: 1,
        data: [
          255, 255, 255, 255 // white
        ]
      }

      const predictedSegmentPixelData = {
        width: 1,
        height: 1,
        data: [
          1 // match
        ]
      }

      const expected = {
        width: 1,
        height: 1,
        data: Uint8ClampedArray.from([
          255, 255, 255, 255
        ])
      }

      const actual = await instance._intersectPixels(imgData, predictedSegmentPixelData, backgroundColour)

      expect(actual).toEqual(expected)
    })

    it('Given I have 1x2 image then intersect the identified body with given image and replace other pixel by given background colour', async () => {
      const imgData = {
        width: 1,
        height: 2,
        data: [
          255, 255, 255, 255, // white
          255, 0, 0, 255 // red
        ]
      }

      const predictedSegmentPixelData = {
        width: 1,
        height: 2,
        data: [
          0, // ignore
          1 // match
        ]
      }

      const expected = {
        width: 1,
        height: 2,
        data: Uint8ClampedArray.from([
          0, 0, 255, 255, // blue
          255, 0, 0, 255 // red
        ])
      }

      const actual = await instance._intersectPixels(imgData, predictedSegmentPixelData, backgroundColour)

      expect(actual).toEqual(expected)
    })

    it('Given I have 2x2 image then intersect the identified body with given image and replace other pixel by given background colour', async () => {
      const imgData = {
        width: 2,
        height: 2,
        data: [
          255, 255, 255, 255, // white
          255, 0, 0, 255, // red
          255, 0, 0, 255, // red
          255, 255, 255, 255 // white
        ]
      }

      const predictedSegmentPixelData = {
        width: 2,
        height: 2,
        data: [
          0, // ignore
          0, // ignore
          1, // match
          0 // ignore
        ]
      }

      const expected = {
        width: 2,
        height: 2,
        data: Uint8ClampedArray.from([
          0, 0, 255, 255, // ignore
          0, 0, 255, 255, // ignore
          255, 0, 0, 255, // red from imgData
          0, 0, 255, 255 // ignore
        ])
      }

      const actual = await instance._intersectPixels(imgData, predictedSegmentPixelData, backgroundColour)

      expect(actual).toEqual(expected)
    })
  })

  describe('BackgroundRemoval.remove(imgData, config)', () => {
    const imgData = {
      width: 1,
      height: 1,
      data: Uint8ClampedArray.from([
        255, 255, 255, 255 // white
      ])
    }

    beforeEach(() => {
      jest.spyOn(instance, 'loadModel').mockResolvedValue('')
      jest.spyOn(instance, '_predict').mockResolvedValue('')
      jest.spyOn(instance, '_intersectPixels').mockResolvedValue(imgData)
    })

    it('Should return data URI to be used by img element', async () => {
      const actual = await instance.remove(imgData, {})
      expect(actual).toEqual(expect.stringContaining('data:image/png;'))
    })
  })
})
