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

moduler.exports = NoUintAlias