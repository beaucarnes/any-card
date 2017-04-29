var express = require("express")
var app = express()

var secret = require('./secret');
var index = require('./index');


app.set('port', (process.env.PORT || 5000));

app.use('/secret', secret);
app.use('/', index);



app.listen(app.get('port'), function () {
  console.log('PAC app listening on port ' + app.get('port'))
})