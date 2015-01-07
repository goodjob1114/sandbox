var SerialPort = require("serialport").SerialPort
var serialPort = new SerialPort("/dev/ttyUSB0", {
  baudrate: 115200
}, false);

serialPort.open(function (error) {
  if ( error ) {
    console.log('failed to open: '+error);
  } else {
    console.log('open');
    serialPort.on('data', function(data) {
      console.log('data received: ' + data);
    });
    serialPort.write("cmd curl -v http://127.0.0.1/cgi-bin/param.cgi?action=list\&group=Ability.MotionDetectionSensitive\n", function(err, results) {
      console.log('err ' + err);
      console.log('results ' + results);
    });
  }
});
