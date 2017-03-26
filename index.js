var express = require('express');
var app = express();
var redis = require("redis");

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


app.get('/redis-test', function (request, response) {
  client = redis.createClient();

  // if you'd like to select database 3, instead of 0 (default), call
  // client.select(3, function() { /* ... */ });

  client.on("error", function (err) {
    console.log("Error " + err);
  });

  client.set("string key", "string val", redis.print);
  client.hset("hash key", "hashtest 1", "some value", redis.print);
  client.hset(["hash key", "hashtest 2", "some other value"], redis.print);
  client.hkeys("hash key", function (err, replies) {
    var reply = "";
    replies.forEach(function (reply, i) {
      reply += "    " + i + ": " + reply + "\n";
    });
    client.quit();
    response.status(200).send("res: \n" + reply);
  });
});