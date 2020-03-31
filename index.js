const naming = require("./common/identifier-naming");
const { typeOf } = require("./common/treeTraversing");

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
        console.log('exitEvenParameter');
        this.exitParameter(ctx)
    }

    exitParameter(ctx) {
        console.log('exitParameter');
        const identifier = this.findIdentifier(ctx)
        console.log('identifier',identifier);
        if (identifier && naming.hasUnderScore(identifier.getText())) {
          this._error(identifier)
        }
    }

    findIdentifier(ctx) {
        const children = ctx.children
        console.log('findIdentifier', children);
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
        console.log('ElementaryTypeName')
        this.exitUint(ctx)
    }

    exitUint(ctx) {
        console.log('Uint')
        const identifier = ctx.children[1];
        const text = identifier.getText();

        if(text === 'Uint') {
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

module.exports = [NoFoosAllowed, UnNamedReturns, NoUintAlias, NoUnderScoreParams];
