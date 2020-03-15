/* istanbul ignore file */
import { getImageDataFromImg, onImageLoaded, suggestedDownloadFilename } from '../utils'
import { setImageData } from '../output/events'

const imgPreviewElem = document.getElementById('js-input-preview')
const downloadLink = document.getElementById('js-download-link')

document.addEventListener('click', (evt) => {
  if (evt.target.closest('.suggestions__option')) {
    const button = evt.target.closest('.suggestions__option')
    const imgUrl = button.getAttribute('data-asset')

    downloadLink.setAttribute('download', suggestedDownloadFilename(imgUrl))

    trySuggestion(imgUrl)
  }
})

async function trySuggestion (imgUrl) {
  imgPreviewElem.src = imgUrl

  await onImageLoaded(imgPreviewElem)

  setImageData(getImageDataFromImg(imgPreviewElem))
}
