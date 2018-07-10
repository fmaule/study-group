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

const doIt = async () => {
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

  console.log('input:\n', arrayToReduce, '\noutput:\n', reduced);
};

doIt()
  .catch(e => console.log('ERROR!', e));
