
class UnNamedReturns {
    constructor(reporter, config) {
        this.ruleId = 'return-no-name'
        this.reporter = reporter
        this.config = config
    }

    exitReturnParameters(ctx) {
        const identifier = this.findIdentifier(ctx)
    
        if (identifier) {
          this._error(identifier)
        }
    }

    findIdentifier(ctx) {
        const children = ctx.children
    
        const ids = children.filter(i => typeOf(i) === 'identifier')
    
        return ids.length > 0 && ids[0]
    }
    
    _error(identifier) {
        this.reporter.error(identifier, this.ruleId, 'return params must be unnamed')
    }
}

module.exports = UnNamedReturns