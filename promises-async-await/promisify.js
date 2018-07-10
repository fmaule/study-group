const promisifiedWithUtilTimeoutShorter = require('util').promisify(setTimeout);

const { promisify } = require('util');

const promisifiedWithUtilTimeout = promisify(setTimeout);

module.exports = {
  promisifiedWithUtilTimeout,
  promisifiedWithUtilTimeoutShorter,
};
