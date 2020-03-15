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

export function loadImage (fileBlob) {
  const imgElem = new Image()
  imgElem.src = fileBlob

  return onImageLoaded(imgElem)
}

export function onImageLoaded (imgElem) {
  return new Promise((resolve, reject) => {
    imgElem.addEventListener('load', () => {
      resolve(imgElem)
    }, { once: true })

    imgElem.addEventListener('error', (err) => {
      reject(err)
    }, { once: true })
  })
}
