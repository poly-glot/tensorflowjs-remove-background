/* istanbul ignore file */

import * as tf from '@tensorflow/tfjs'
import { setWasmPaths } from '@tensorflow/tfjs-backend-wasm'

import BackgroundRemoval from './component/background-removal/background-removal'
import AlertService from './component/alert/alert'

import './component/core-css'
import './component/input-source'
import './component/settings'
import './component/output'
import './component/suggestions'
import './component/collapse'

async function main () {
  AlertService.init()

  tf.enableProdMode()
  setWasmPaths({
    'tfjs-backend-wasm.wasm': '/assets/tfjs-backend-wasm.wasm',
    'tfjs-backend-wasm-simd.wasm': '/assets/tfjs-backend-wasm-simd.wasm',
    'tfjs-backend-wasm-threaded-simd.wasm': '/assets/tfjs-backend-wasm-threaded-simd.wasm'
  })
  await tf.setBackend('wasm')

  AlertService.announce('Loading Necessary image processing files.')
  const bgRemovalInstance = new BackgroundRemoval()
  await bgRemovalInstance.loadModel()

  AlertService.announce('Application is ready to use')
}

main()
