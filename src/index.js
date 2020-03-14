/* istanbul ignore file */

import AlertService from './component/alert/alert'

import './component/core-css'

async function main () {
  AlertService.init()
  AlertService.announce('Application is ready to use')
}

main()
