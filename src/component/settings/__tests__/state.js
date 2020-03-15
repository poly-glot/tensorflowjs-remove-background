import state from '../state'

describe('State test', () => {
  describe('state.set()', () => {
    afterEach(() => {
      // Reset state
      state.set('flipHorizontal', false)
    })

    it('Should only allow to set value to known keys', () => {
      expect(state.set('RandomKey', 'yeye')).toBeFalsy()
      expect(state.set('flipHorizontal', true)).toBeTruthy()
    })

    it('Should transform values to correct type', () => {
      state.set('segmentationThreshold', '0.5')
      expect(state.state.segmentationThreshold).toEqual(0.5)
    })

    it('Should notify subscribers about any changes to state', () => {
      const listener = jest.fn()
      state.subscribers.add(listener)

      state.set('flipHorizontal', false)
      expect(listener).not.toBeCalled()

      state.set('flipHorizontal', true)
      expect(listener).toBeCalled()

      state.set('flipHorizontal', true)
      expect(listener).toHaveBeenCalledTimes(1)
    })
  })
})
