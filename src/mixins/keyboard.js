export default {
  created () {
    // Events
    document.addEventListener('keydown', this._handleKeyboardKeydown)
    document.addEventListener('keypress', this._handleKeyboardKeypress)
    document.addEventListener('keyup', this._handleKeyboardKeyup)
  },

  destroyed () {
    // Events
    document.removeEventListener('keydown', this._handleKeyboardKeydown)
    document.removeEventListener('keypress', this._handleKeyboardKeypress)
    document.removeEventListener('keyup', this._handleKeyboardKeyup)
  },

  methods: {
    _handleKeyboardKeydown (e) {},

    _handleKeyboardKeypress (e) {},

    _handleKeyboardKeyup (e) {}
  }
}
