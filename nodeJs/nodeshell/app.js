
var p = require('procstreams');

console.log(p);

p('cat app.log').pipe('wc -l').data(function (stdout, stderr) {
    console.log(stdout);
});
