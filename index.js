var express = require('express');
var app = express();
var redis = require("redis");
var bodyParser = require('body-parser')
app.use(bodyParser.json())

client = redis.createClient({
  url: "redis://h:p931a15716ad2b8cfe36404b28315e98346ff2091a5162d8efddee9c1cf25a496@ec2-34-206-56-30.compute-1.amazonaws.com:11299",
});
app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function (request, response) {
  response.render('pages/index');
});

app.post('/text', function (request, response) {
  response.status(200).send("RADI!!!!!!!!")
});
app.post('/json', function (request, response) {
  response.status(200).json({
    status: "RADI!!!!!!!!"
  })
});

app.get('/test', function (request, response) {
  response.status(200).send("TEST!!!!!!!!")
});

app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});


app.post('/redis-test', function (request, response) {


  // if you'd like to select database 3, instead of 0 (default), call
  // client.select(3, function() { /* ... */ });

  client.on("error", function (err) {
    console.log("Error " + err);
  });
  console.log(request.body);
  client.set("poslovnica_1", JSON.stringify(request.body));
  response.status(200).send("OK");
});
app.get('/redis-test', function (request, response) {
  client.get("poslovnica_1", function (err, reply) {
    response.status(200).json(JSON.parse(reply.toString()));
  });
})