/* istanbul ignore file */
import Vue from 'vue'

import { getImageDataFromImg } from './component/utils'

import './component/core-css'
import './component/input-source'
import './component/settings'
import './component/output'
import './component/suggestions'
import './component/collapse'

import initialState from './initial-state'

async function main () {
  Vue.config.devtools = false
  Vue.config.productionTip = false

  window.app = new Vue({
    el: '.site__app',
    data: {
      ...initialState
    },
    mounted: async function () {

    },
    methods: {
      ready: function () {
        this.loaded = true
      },

      announce: function (msg) {
        this.alertMsg = msg
      },

      onInputFileSelected: function ($event) {
        const [selectedFile] = $event.target.files
        const { inputImage } = this.$refs

        inputImage.setAttribute('src', URL.createObjectURL(selectedFile))
      },

      onInputImageLoaded: function () {
        const { inputImage } = this.$refs

        console.log(getImageDataFromImg(inputImage))
      }
    }
  })
}

main()
