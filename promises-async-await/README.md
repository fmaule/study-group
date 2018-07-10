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

chaining the function to a .then

```
yourAsyncFunction()
  .then(() => doOtherStuffThatCanBeSync());
```

creating an async function and call it from the main scope
```
const fnThatCanAwait = async () => {
  await yourAsyncFunction();
  doOtherStuffThatCanBeSync();
}

fnThatCanAwait();
```
creating an asynchronous IIFE (Immediately-invoked function expression)

```
(async () => {
  await yourAsyncFunction();
  doOtherStuffThatCanBeSync();
})();
```