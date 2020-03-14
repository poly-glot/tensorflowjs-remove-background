import AlertService from '../alert'

describe('AlertService test', () => {
  beforeEach(() => {
    AlertService.init()
  })

  describe('AlertService.announce()', () => {
    it('Should set text to alert element', () => {
      AlertService.announce('new text')

      const alertElem = document.getElementById('js-alert')

      expect(alertElem).toBeDefined()
      expect(alertElem.innerHTML).toEqual('new text')
    })
  })
})
