/* istanbul ignore file */
import Vue from 'vue'

import BackgroundRemoval from './component/background-removal/background-removal'
import { getImageDataFromImg, suggestedDownloadFilename, loadJSProgressively } from './component/utils'

import './component/core-css'
import './component/input-source'
import './component/settings'
import './component/output'
import './component/suggestions'
import './component/collapse'

import initialState from './initial-state'

const bgRemovalInstance = new BackgroundRemoval()

async function main () {
  Vue.config.devtools = false
  Vue.config.productionTip = false

  window.app = new Vue({
    el: '.site__app',
    data: {
      ...initialState
    },

    mounted: async function () {
      await loadJSProgressively(this)
    },

    methods: {
      ready: function () {
        this.appReady = true
      },

      announce: function (msg) {
        this.alertMsg = msg
      },

      onInputFileSelected: function ($event) {
        const [selectedFile] = $event.target.files
        const { inputImage } = this.$refs

        this.downloadFilename = suggestedDownloadFilename(selectedFile.name)
        inputImage.setAttribute('src', URL.createObjectURL(selectedFile))
      },

      onInputImageLoaded: function () {
        const { inputImage } = this.$refs

        this.inputImageData = getImageDataFromImg(inputImage)
      },

      onClickSuggestion: function (suggestion) {
        const { inputImage } = this.$refs

        inputImage.setAttribute('src', suggestion.asset)
        this.downloadFilename = suggestedDownloadFilename(suggestion.label)
      },

      async generateOutput () {
        const { outputImage, downloadButton } = this.$refs

        if (!this.appReady) {
          return
        }

        this.announce('Processing your image.')

        const image = await bgRemovalInstance.remove(this.inputImageData, {})

        outputImage.setAttribute('src', image)
        downloadButton.removeAttribute('aria-disabled')
        downloadButton.setAttribute('href', image)

        this.announce('Image has been processed.')
      }
    },
    watch: {
      inputImageData: function (newInputImageData, oldInputImageData) {
        this.generateOutput()
      }
    }
  })
}

main()
