/* istanbul ignore file */

import BackgroundRemoval from '../background-removal/background-removal'
import { loadImage, getImageDataFromImg, suggestedDownloadFilename } from '../utils'
import state from '../settings/state'
import AlertService from '../alert/alert'

const imgPickerElem = document.getElementById('js-image-picker')
const imgOutputElem = document.getElementById('js-output-image')
const downloadLink = document.getElementById('js-download-link')

const bgRemovalInstance = new BackgroundRemoval()

let imageData

state.subscribers.add(updatePreview)

imgPickerElem.addEventListener('change', async function () {
  const [selectedFile] = imgPickerElem.files

  downloadLink.setAttribute('download', suggestedDownloadFilename(selectedFile.name))

  const imgElem = await loadImage(window.URL.createObjectURL(selectedFile))
  imageData = getImageDataFromImg(imgElem)

  updatePreview()
})

export function setImageData (data) {
  imageData = data
  updatePreview()
}

export function updatePreview () {
  if (!imageData) {
    return
  }

  AlertService.announce('Processing your image.')

  setTimeout(async () => {
    imgOutputElem.src = await bgRemovalInstance.remove(imageData, state.state)
    downloadLink.setAttribute('href', imgOutputElem.src)
    downloadLink.removeAttribute('aria-disabled')

    AlertService.announce('Image has been processed.')
  }, 0)
}
