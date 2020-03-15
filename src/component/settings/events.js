/* istanbul ignore file */

import state from './state'
const settingsForm = document.getElementById('js-input-source')

settingsForm.addEventListener('change', onChange)

function onChange (evt) {
  const { target } = evt

  state.set(target.id, target.value)
}
