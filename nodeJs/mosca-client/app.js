var mqtt = require('mqtt');

client = mqtt.createClient(1883, 'localhost');

client.subscribe('test/mq');

for(i = 0; i < 10; i++)
  client.publish('test/mq', 'Hello Sir, Time to lunch');

client.on('message', function (topic, message) {
  console.log(message);
});

client.end();
