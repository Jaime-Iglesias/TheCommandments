const naming = require("./common/identifier-naming");
const { typeOf } = require("./common/treeTraversing");
const TreeTraversing = require("./common/treeTraversing");

const traversing = new TreeTraversing()

class NoUnderScoreParams {
    constructor(reporter, config) {
        this.ruleId = 'no-underscore-params'
        this.reporter = reporter
        this.config = config
    }

    exitEventParameter(ctx) {
        this.exitParameter(ctx)
    }

    exitParameter(ctx) {
        const identifier = this.findIdentifier(ctx)

        if (identifier && identifier.getText().startsWith('_')) {
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
        this.ruleId = 'unammed-returns'
        this.reporter = reporter
        this.config = config
    }

    exitReturnParameters(ctx) {
        const identifier = this.findIdentifier(ctx)

        if (identifier && identifier.getText() != null) {
            this._error(identifier)
        }
    }

    findIdentifier(ctx) {
        return traversing.findDownType(ctx.children[1], 'IdentifierContext');
    }

    _error(identifier) {
        this.reporter.error(identifier, this.ruleId, 'return params must be unnamed')
    }
}

class OnlyUnderScoreOnInternalPrivate {
    constructor(reporter, config) {
        this.ruleId = 'only-underscore-internal-private'
        this.reporter = reporter
        this.config = config
    }

    exitFunctionDefinition(ctx) {
        const modifier = this.findModifier(ctx);
        const identifier = this.findIdentifier(ctx);

        if (modifier.getText().includes('internal') || modifier.getText().includes('private')) {
            if (identifier && !identifier.getText().startsWith('_')) {
                this.reporter.error(identifier, this.ruleId, 'internal and private function identifiers must be preceeded by _')
            }
        } else {
            if (identifier && identifier.getText().startsWith('_')) {
                this.reporter.error(identifier, this.ruleId, 'only internal and private function identifiers can be preceeded by _')
            }
        }
    }

    exitStateVariableDeclaration(ctx) {
        const location = ctx.children[1]
        const identifier = ctx.children[2]
        
        if (location.getText().includes('internal') || location.getText().includes('private')) {
            if (identifier && !identifier.getText().startsWith('_')) {
                this.reporter.error(identifier, this.ruleId, 'internal and private variable identifiers must be preceeded by _')
            }
        } else {
            if (identifier && identifier.getText().startsWith('_')) {
                this.reporter.error(identifier, this.ruleId, 'only internal and private variable identifiers can be preceeded by _')
            }
        }
    }

    findModifier(ctx) {
        const children = ctx.children
    
        const ids = children.filter(i => typeOf(i) === 'modifierList')
    
        return ids.length > 0 && ids[0]        
    }

    findIdentifier(ctx) {
        const children = ctx.children
    
        const ids = children.filter(i => typeOf(i) === 'identifier')
    
        return ids.length > 0 && ids[0]
    }
}

module.exports = [UnNamedReturns, NoUintAlias, NoUnderScoreParams, OnlyUnderScoreOnInternalPrivate];
