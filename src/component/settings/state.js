export class State {
  constructor () {
    this.state = {
      flipHorizontal: false,
      internalResolution: 'medium',
      segmentationThreshold: 0.7,
      backgroundColour: '#ffffff'
    }

    this.subscribers = new Set()
  }

  set (key, value) {
    if (!key || !(key in this.state)) {
      return false
    }

    value = this._transformValue(key, value)

    if (value === this.state[key]) {
      return false
    }

    this.state[key] = value

    this._notify()

    return true
  }

  _transformValue (key, value) {
    if (key === 'segmentationThreshold') {
      return parseFloat(value)
    }

    return value
  }

  _notify () {
    this.subscribers.forEach(callback => callback(this.state))
  }
}

export default new State()
