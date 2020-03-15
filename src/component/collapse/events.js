/* istanbul ignore file */

document.addEventListener('click', (evt) => {
  if (evt.target.closest('[aria-expanded]')) {
    const source = evt.target.closest('[aria-expanded]')
    const textElem = source.querySelector('[data-collapse-text]')
    const state = source.getAttribute('aria-expanded')
    const target = document.getElementById(source.getAttribute('aria-controls'))

    if (!(target instanceof HTMLElement)) {
      return
    }

    // Toggle State
    source.setAttribute('aria-expanded', state === 'false' ? 'true' : 'false')
    textElem.innerHTML = source.getAttribute(state === 'false' ? 'data-label-expanded' : 'data-label-collapse')

    if (state === 'false') {
      target.style.height = `${target.scrollHeight}px`
      return
    }

    // Close it
    target.style.height = 0
  }
})
