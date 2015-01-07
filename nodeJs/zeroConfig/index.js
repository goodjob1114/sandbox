var usb = require('usb');

var panel_on_USB = usb.findByIds("0x0525", "0xa4a5");


panel_on_USB.open();

console.log("interface :");
console.log(panel_on_USB.interface(0));
console.log("timeout :" + panel_on_USB.timeout);

var panel_interface = panel_on_USB.interface(0);

panel_interface.claim();

var endpoints = panel_interface.endpoints,
    inEndpoint = endpoints[0],
    outEndpoint = endpoints[1];

/*
term.open();

term.interfaces[0].claim();

var endpoints = term.interfaces[0].endpoints,
    inEndpoint = endpoints[0],
    outEndpoint = endpoints[1];

inEndpoint.transferType = 2;
inEndpoint.startStream(1, 64);
inEndpoint.transfer(64, function (error, data) {
    if (!error) {
        console.log(data);
    } else {
        console.log(error);
    }
});
inEndpoint.on('data', function (data) {
    console.log(data);
});
inEndpoint.on('error', function (error) {
    console.log(error);
});
outEndpoint.transferType = 2;
outEndpoint.startStream(1, 64);
outEndpoint.transfer(new Buffer('d\n'), function (err) {
    console.log(err);
});

*/

var usb = require('usb');

var abcam = usb.findByIds('0x0525','0xa4a5');

abcam.open();

switch (req.url) {
    case '/updateLed':
        var light = postData['light'];

        if (!light || (typeof(LED_OPTIONS[light]) == undefined)) {
            console.log(" - No light available");
        }
        else {
            var lightId = LED_OPTIONS[light];
        
            // send control information
            

            motor.controlTransfer(new Buffer(0), 0x40, 0x06, lightId, 0x0, function(data) {
                console.log(" + LED toggled");
            });

        }
        break;
    case '/updateAngle':
        var angle = parseInt(postData['angle']);

        if (isNaN(angle)) {
            angle = 0;
        }

        angle = (angle < MIN_TILT_ANGLE) ? MIN_TILT_ANGLE : ((angle > MAX_TILT_ANGLE) ? MAX_TILT_ANGLE : angle);
        angle = angle * 2;
        console.log("Angle set to " + angle);
        
        motor.controlTransfer(new Buffer(0), 0x40, 0x31, angle, 0x0, function(data) {
            console.log(" + Angle set");
        });

        break;
    case '/getCoordinates':

    .controlTransfer(mixed read|write, int _bmRequestType, int _bRequest, int _wValue, int _wIndex, function afterTransfer(data) [, int _timeout])
    [async] delegates to libusb_control_transfer. First parameter can be either
      * int, then controlTransfer works in read mode (read data FROM USB device)
      * Buffer object, then controlTransfer works in write mode (write data TO USB device)
    _timeout parameter is optional.
    afterTransfer contains a Buffer object with the data read from device.
        
        motor.controlTransfer(10 /* read 10 bytes */, 0xC0 /* bmRequestType */, 0x32 /* bRequest */, 0, 0, function(data) {
            for (var i = 0; i < 10; i++) {
                console.log("buffer[" + i + "]: " + data[i])
            }
            console.log("Accelerometer axis:")
            var x = ((data[2] << 8) | data[3]), y = ((data[4] << 8) | data[5]), z = ((data[6] << 8) | data[7])
            x = (x + Math.pow(2,15)) % Math.pow(2,16) - Math.pow(2,15)
            y = (y + Math.pow(2,15)) % Math.pow(2,16) - Math.pow(2,15)
            z = (z + Math.pow(2,15)) % Math.pow(2,16) - Math.pow(2,15)

            console.log("  X:" + x)
            console.log("  Y:" + y)
            console.log("  Z:" + z)
        })
        break;
}