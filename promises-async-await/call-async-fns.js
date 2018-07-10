const wrappedTimeout = require('./wrapper-function');
const {
  promisifiedWithUtilTimeout,
  promisifiedWithUtilTimeoutShorter,
} = require('./promisify.js');

const timeoutPromise = wrappedTimeout(1000);              // Call the function, it will return a Promise
console.log('timeoutPromise:', timeoutPromise);           // This will (immediately) print Promise { <pending> }

// chain the function returning a promise to a .then
timeoutPromise
  .then(() => console.log('.then, awaited 1s'));          // Chain the promise to .then(), in order to wait until it resolves


// But what if we want to use async/await in the main scope?
// You can't use 'await' outside an 'async' function.

const fnThatCanAwait = async () => {
  await wrappedTimeout(3000);                            // This will await() and stop the execution inside this function, until the Promise resolves.
  console.log('async called from main, awaited 3s');     // This will executed AFTER the Promise resolves
};

fnThatCanAwait();                                        // Call the async function from the main scope

//
// Create an IIFE
//
(async () => {
  await wrappedTimeout(2000);                             // This will await() and stop the execution inside this function, until the Promise resolves.
  console.log('IIFE call, awaited 2s');                   // This will executed AFTER the Promise resolves
})();

// Call the other implementations
(async () => {
  await promisifiedWithUtilTimeout(1000);
  console.log('promisifiedWithUtilTimeout, awaited 1s');
  await promisifiedWithUtilTimeoutShorter(1000);
  console.log('promisifiedWithUtilTimeoutShorter, awaited 1s');
})();
