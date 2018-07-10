const { promisifiedWithUtilTimeout } = require('./promisify.js');

const doSomethingAsyncThatWillError = async () => {
  await promisifiedWithUtilTimeout(1000); // just faking some async operation
  throw new Error('Super general failure');
};


// Does this look cleaner?
doSomethingAsyncThatWillError()
  .then(res => console.log(res))
  .catch(e => console.error('OMG!!11 error!', e));


(async () => {
  try {
    const res = await doSomethingAsyncThatWillError();
    console.log(res);
  } catch (e) {
    console.error('OMG!!11 error!', e);
  }
})();
