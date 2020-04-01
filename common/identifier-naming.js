function match(text, regex) {
    return text.replace(regex, '').length === 0
  }

module.exports = {
    hasUnderScore(text) {
        return text.replace(/_/, '').length != text.length
    }
}
