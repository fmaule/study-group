/* eslint-disable no-restricted-syntax */

const { promisifiedWithUtilTimeout } = require('./promisify.js');

const doSomethingAsync = async (value) => {
  await promisifiedWithUtilTimeout(200); // just faking some async operation
  return Promise.resolve(`processed ${value}`);
};

const doSomethingElseAsync = async (value) => {
  await promisifiedWithUtilTimeout(100); // just faking some async operation
  return Promise.resolve(`superprocessed ${value}`);
};

const arrayToReduce = ['value1', 'value2', 'value3', 'value4'];

const doReduce = async () => {
  const asyncReducer = async (prevPromise, current) => {  // the reducer will run sequentially
    const results = await prevPromise;
    const processedValue = await doSomethingAsync(current);
    const superProcessedValue = await doSomethingElseAsync(current);

    results.push({
      [current]:
      {
        standard: processedValue,
        super: superProcessedValue,
      },
    });
    return results;
  };

  const reduced = await arrayToReduce.reduce(asyncReducer, Promise.resolve([]));

  console.log('reduce\ninput:\n', arrayToReduce, '\noutput:\n', reduced);
};


const doForLoop = async () => {
  const results = [];
  for (const current of arrayToReduce) {
    const processedValue = await doSomethingAsync(current); // eslint-disable-line no-await-in-loop
    const superProcessedValue = await doSomethingElseAsync(current); // eslint-disable-line no-await-in-loop

    results.push({
      [current]:
      {
        standard: processedValue,
        super: superProcessedValue,
      },
    });
  }

  console.log('for/loop\ninput:\n', arrayToReduce, '\noutput:\n', results);
};

console.time('doReduce');
doReduce()
  .then(() => console.timeEnd('doReduce'))
  .catch(e => console.log('ERROR!', e));


console.time('doForLoop');
doForLoop()
  .then(() => console.timeEnd('doForLoop'))
  .catch(e => console.log('ERROR!', e));
