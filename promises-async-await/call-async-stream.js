const sts = require('string-to-stream');
const chance = require('chance').Chance();
const promisifiedStream = require('./promisified-stream');

const randomString = chance.string({ length: 1000 });
const stream = sts(randomString);

promisifiedStream(stream)
  .then(data => console.log(data));
