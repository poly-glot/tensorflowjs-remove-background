/* istanbul ignore file */

export function hex2rgba (hex) {
  hex = hex.replace('#', '')

  const r = parseInt(hex.slice(0, 2), 16)
  const g = parseInt(hex.slice(2, 4), 16)
  const b = parseInt(hex.slice(4, 6), 16)

  return [
    r,
    g,
    b,
    255
  ]
}

export function getImageDataFromImg (imgElem) {
  const { width, height } = imgElem

  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')

  canvas.width = width
  canvas.height = height

  context.drawImage(imgElem, 0, 0)

  return context.getImageData(0, 0, width, height)
}

export function suggestedDownloadFilename (filename) {
  const extIndex = filename.split('/').pop().lastIndexOf('.')
  const postfix = '--with-background.png'

  if (extIndex === -1) {
    return `${filename}${postfix}`
  }

  return `${filename.substr(0, extIndex)}${postfix}`
}

export async function loadJSProgressively (app) {
  try {
    app.announce('Loading Necessary image processing files.')

    const tf = await import(/* webpackChunkName: "tf" */ '@tensorflow/tfjs')
    const tfWasm = await import(/* webpackChunkName: "tf-wasm" */ '@tensorflow/tfjs-backend-wasm')
    const { default: BackgroundRemoval } = await import(/* webpackChunkName: "app-background-removal" */ '../background-removal/background-removal')

    tf.enableProdMode()
    tfWasm.setWasmPath('/assets/tfjs-backend-wasm.wasm')
    await tf.setBackend('wasm')

    const bgRemovalInstance = new BackgroundRemoval()
    await bgRemovalInstance.loadModel()

    app.announce('Application is ready to use.')
    app.ready()
  } catch (err) {
    console.error(err)
  }
}
