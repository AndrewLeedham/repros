const { readFileSync } = require('fs');
const Ajv = require('ajv');

const example = readFileSync('./example.json');
const fixed = readFileSync('./fixed.json');
const exampleJson = JSON.parse(example);
const fixedJson = JSON.parse(fixed);

const ajv = new Ajv({
    allErrors: true
});

console.log('example valid: ', ajv.validateSchema(exampleJson));
console.log('fixed valid: ', ajv.validateSchema(fixedJson));

const value = {
    'with-dash': 'example',
    'without': 'example'
}

console.log('check example: ', ajv.compile(exampleJson)(value));
console.log('check fixed: ', ajv.compile(fixedJson)(value));