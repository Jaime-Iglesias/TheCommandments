const naming = require("./common/identifier-naming");
const { typeOf } = require("./common/treeTraversing");
const TreeTraversing = require("./common/treeTraversing");

const traversing = new TreeTraversing()
class NoFoosAllowed {
    constructor(reporter, config) {
      this.ruleId = 'no-foos'
  
      this.reporter = reporter
      this.config = config
    }
  
    enterContractDefinition(ctx) {
      const identifier = ctx.children[1]
      const text = identifier.getText()
  
      if (text === 'Foo' || text === 'foo') {
        this.reporter.error(ctx, this.ruleId, 'Contracts cannot be named "Foo"')
      }
    }
  }

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
        const identifier = ctx.children[0]
        const text = identifier.getText()

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
        console.log('identifer', identifier)
        console.log('b')
        if (identifier) {
            this._error(identifier)
        }
    }

    findIdentifier(ctx) {
        return traversing.findIdentifier(ctx);
    }

    _error(identifier) {
        this.reporter.error(identifier, this.ruleId, 'return params must be unnamed')
    }
}

module.exports = [NoFoosAllowed, UnNamedReturns, NoUintAlias, NoUnderScoreParams];
