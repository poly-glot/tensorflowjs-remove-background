export class Alert {
  init () {
    this._elem = document.getElementById('js-alert')
  }

  announce (text) {
    this._elem.innerHTML = text
  }
}

export default new Alert()
