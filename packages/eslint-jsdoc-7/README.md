# eslint-plugin-jsdoc + TypeScript + eslint 7 bug.

Running `yarn lint` throws the following error:
```bash
Oops! Something went wrong! :(

ESLint: 7.2.0

TypeError: Cannot read property 'name' of undefined
Occurred while linting *redacted*/repros/packages/eslint-jsdoc-7/example.ts:6
    at getPropertiesFromPropertySignature (*redacted*/repros/node_modules/eslint-plugin-jsdoc/dist/jsdocUtils.js:86:31)
    at *redacted*/repros/node_modules/eslint-plugin-jsdoc/dist/jsdocUtils.js:108:18
    at Array.map (<anonymous>)
    at getParamName (*redacted*/repros/node_modules/eslint-plugin-jsdoc/dist/jsdocUtils.js:107:69)
    at *redacted*/repros/node_modules/eslint-plugin-jsdoc/dist/jsdocUtils.js:182:12
    at Array.map (<anonymous>)
    at Object.getFunctionParameterNames (*redacted*/repros/node_modules/eslint-plugin-jsdoc/dist/jsdocUtils.js:181:30)
    at Object.utils.getFunctionParameterNames (*redacted*/repros/node_modules/eslint-plugin-jsdoc/dist/iterateJsdoc.js:184:32)
    at _default.meta.fixable (*redacted*/repros/node_modules/eslint-plugin-jsdoc/dist/rules/checkParamNames.js:186:40)
    at iterate (*redacted*/repros/node_modules/eslint-plugin-jsdoc/dist/iterateJsdoc.js:504:3)
```