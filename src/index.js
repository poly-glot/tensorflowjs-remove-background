/* istanbul ignore file */
import Vue from 'vue'

import BackgroundRemoval from './component/background-removal/background-removal'

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
      try {
        this.announce('Loading Necessary image processing files.')

        const tf = await import(/* webpackChunkName: "tf" */ '@tensorflow/tfjs')
        const tfWasm = await import(/* webpackChunkName: "tf-wasm" */ '@tensorflow/tfjs-backend-wasm')

        tf.enableProdMode()
        tfWasm.setWasmPath('/assets/tfjs-backend-wasm.wasm')
        await tf.setBackend('wasm')

        const bgRemovalInstance = new BackgroundRemoval()
        await bgRemovalInstance.loadModel()

        this.announce('Application is ready to use.')
      } catch (err) {
        console.error(err)
      }
    },
    methods: {
      announce: function (msg) {
        this.alertMsg = msg
      }
    }
  })
}

main()
