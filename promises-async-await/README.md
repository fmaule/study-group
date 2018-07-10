# What is an asynchronous function?

The **async function** declaration defines an **asynchronous function**, which returns an *AsyncFunction* object. An asynchronous function is a function which operates asynchronously via the event loop, using an implicit *Promise* to return its result. But the syntax and structure of your code using async functions is much more like using standard synchronous functions.

# How can I use async/await with functions that are not async / Promise based?

- creating a wrapper function that returns a Promise
- using util.promisify
- using Bluebird Promisify - 
works better in some cases where util.promisify doesn't work, but this means adding a big dep to your project

# How can I *await* for something?
You can use the **await** keyword only inside an **async** function. 

So what if you want to await something inside your main scope, given that it's not *async* ?

You can achieve that in three ways:

chaining the function to a .then, and resolving the promise

```
yourAsyncFunction()
  .then(() => doOtherStuffThatCanBeSync());
```

creating an async function and call it from the main scope

**WARNING**: this is not ideal. Will work, but any *async* function will return a Promise and we are just ignoring it, could potentially lead to unhandled promise rejections
```
const fnThatCanAwait = async () => {
  await yourAsyncFunction();
  doOtherStuffThatCanBeSync();
}

fnThatCanAwait();
```
creating an asynchronous IIFE (Immediately-invoked function expression)

**WARNING**: this is not ideal. Will work, but any *async* function will return a Promise and we are just ignoring it, could potentially lead to unhandled promise rejections
```
(async () => {
  await yourAsyncFunction();
  doOtherStuffThatCanBeSync();
})();
```

# Will map work with async functions?
Let's say we have the following situation:

```
const { promisifiedWithUtilTimeout } = require('./promisify.js');

const doSomethingAsync = async (value) => {
  await promisifiedWithUtilTimeout(1000); // just faking some async operation
  return Promise.resolve(`returning some result for ${value}`);
};

const arrayToMap = ['value1', 'value2', 'value3', 'value4'];

const result = arrayToMap.map(val => doSomethingAsync(val));
console.log(result);  // what do we have here?
```

**Do we have the results or not?**

# Is async/await *really* better than then()?

```
doSomethingAsyncThatWillError()
  .then(res => console.log(res))
  .catch(e => console.error('OMG!!11 error!', e));
```

```
try {
  const res = await doSomethingAsyncThatWillError();
  console.log(res);
} catch (e) {
  console.error('OMG!!11 error!', e);
}
```




# Interesting stuff to read/watch
- [What is a promise](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-promise-27fc71e77261)
- [callbacks, Promises and async/await](https://medium.com/front-end-hacking/callbacks-promises-and-async-await-ad4756e01d90)
- Video: [Is async/await useless?](https://www.youtube.com/watch?v=ho5PnBOoacw)
- [Top level await](https://gist.github.com/Rich-Harris/0b6f317657f5167663b493c722647221)
- [Then, success, fail anti-pattern](https://github.com/petkaantonov/bluebird/wiki/Promise-Anti-patterns#the-thensuccess-fail-anti-pattern)
