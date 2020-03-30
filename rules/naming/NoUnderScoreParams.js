const naming = require("../../common/identifier-naming")

class NoUnderScoreParams {
    constructor(reporter, config) {
        this.ruleId = 'param-name-underscore'
        this.reporter = reporter
        this.config = config
    }

    exitEventParameter(ctx) {
        this.exitParameter(ctx)
    }

    exitParameter(ctx) {
        const identifier = this.findIdentifier(ctx)
    
        if (identifier && naming.hasUnderScore(identifier.getText())) {
          this._error(identifier)
        }
    }

    findIdentifier(ctx) {
        const children = ctx.children
    
        const ids = children.filter(i => typeOf(i) === 'identifier')
    
        return ids.length > 0 && ids[0]
    }
    
    _error(identifier) {
        this.reporter.error(identifier, this.ruleId, 'Function param identifier cannot be preceded by _')
    }
}

module.exports = NoUnderScoreParams