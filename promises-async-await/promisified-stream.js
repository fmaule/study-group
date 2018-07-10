module.exports = (stream) => {
  let streamData = ''
  
  return new Promise ((resolve, reject) => {
      stream.on('data', chunk => streamData += chunk.toString());
      stream.on('end', () => resolve(streamData));
      stream.on('error', err => reject(err));
  })
}