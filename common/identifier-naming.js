function match(text, regex) {
    return text.replace(regex, '').length === 0
  }

module.exports = {
    hasUnderScore(text) {
        return match(text, /_/)
    }
}
