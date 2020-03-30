const naming = require("./common/identifier-naming");

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

class NoUintAlias {
    constructor(reporter, config) {
        this.ruleId = 'no-alias'
        this.reporter = reporter
        this.config = config
    }

    exitElementaryTypeName(ctx) {
        this.exitUint(ctx)
    }

    exitUint(ctx) {
        const identifier = ctx.children[1];
        const text = identifier.getText();

        if(text === 'uint') {
            this.reporter.error(ctx, this.ruleId, 'Uint variables need to be more precise');
        }
    }
}


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

module.exports = [UnNamedReturns, NoUintAlias, NoUnderScoreParams];
