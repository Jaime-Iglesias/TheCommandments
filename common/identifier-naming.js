function match(text, regex) {
    return text.replace(regex, '').length === 0
  }

moduler.exports {
    hasUnderscore(text) {
        return match(text, /_/)
      }
}