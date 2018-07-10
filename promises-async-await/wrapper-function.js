const promisifiedTimeout = ms => new Promise((resolve) => { // This fn will return a new Promise
  const timeoutCallback = () => resolve(); // this anonymous function will resolve the Promise when called
  setTimeout(timeoutCallback, ms); // setTimeout will call the timeoutCallback fn after n ms
});


module.exports = promisifiedTimeout;
