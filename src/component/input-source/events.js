/* istanbul ignore file */

const imgPickerElem = document.getElementById('js-image-picker')
const imgPreviewElem = document.getElementById('js-input-preview')

imgPickerElem.addEventListener('change', onChange)

function onChange () {
  const [selectedFile] = imgPickerElem.files
  imgPreviewElem.src = URL.createObjectURL(selectedFile)
}
