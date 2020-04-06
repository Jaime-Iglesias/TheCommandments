# solhint-plugin-cmf-rules-stable
Notice that this plugin will only work with `solhint v2.x`, you can install it with `npm i solhint`
To use these rules with your solhint build simply `npm i solhint-plugin-cmf-rules-stable` into your repository

if you don't have a `.solhint.json` then execute `npx solhint init-config` and fill that file with the following:


```json
{
  "extends": ["solhint:recommended"],
  "plugins": ["cmf-rules-stable"],
  "rules": {
    "cmf-rules-stable/no-alias": "warn",
    "cmf-rules-stablet/no-underscore-params": "warn",
    "cmf-rules-stable/only-underscore-internal-private": "warn",
    "cmf-rules-stable/unammed-returns": "warn",
    "mark-callable-contracts": "off",
    "no-empty-blocks": "off",
    "compiler-version": ["error", "0.5.17"]
  }
}

```
