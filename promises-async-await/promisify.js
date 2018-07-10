const promisifiedWithUtilTimeoutShorter = require('util').promisify(setTimeout);

const { promisify } = require('util');
const promisifiedWithUtilTimeout = promisify(setTimeout);

const bluebirdPromisify = require('bluebird').promisify;
const promisifiedWithBluebirdTimeout = bluebirdPromisify(setTimeout);

module.exports = {
  promisifiedWithUtilTimeout,
  promisifiedWithUtilTimeoutShorter,
  promisifiedWithBluebirdTimeout,
}