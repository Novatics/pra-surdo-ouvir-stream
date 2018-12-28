const path = require('path');
const io = require('socket.io')();

const speechToTextUtils = require('./util/speechToTextUtils');

io.on('connection', function (socket) {
  socket.on('startGoogleCloudStream', function(request) {
    console.log('Receiving audio binary.');
    speechToTextUtils.startRecognitionStream(io, null, request);
  });
  // Receive audio data
  socket.on('binaryAudioData', function(data) {
    speechToTextUtils.receiveData(data);
  });

  // End the audio stream
  socket.on('endGoogleCloudStream', function() {
    speechToTextUtils.stopRecognitionStream();
  });

});

const port = process.env.PORT || 5000;

io.listen(port);

console.log(`Pra surdo ouvir streaming on ${port}`);
