const { promisifiedWithUtilTimeout } = require('./promisify.js');

const doSomethingAsync = async (value) => {
  await promisifiedWithUtilTimeout(1000); // just faking some async operation
  return Promise.resolve(`returning some result for ${value}`);
};

const arrayToMap = ['value1', 'value2', 'value3', 'value4'];

const result = arrayToMap.map(val => doSomethingAsync(val));
console.log(result);  // what do we have here?
