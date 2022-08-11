let express = require('express');
let app = express();

console.log("Hello World");

/*app.get('*', function routeHandler(req, res) {
  res.send('Hello Express');
});*/

app.use("/public", express.static(__dirname + "/public"));

app.get('/', function routeHandler(req, res, next) {
  res.sendFile(__dirname + '/views/index.html')
  console.log(req.method + " " + req.path + " - " + req.ip);
  //next();
});


app.get("/json", function(req, res, next) {
  const mySecret = process.env['MESSAGE_STYLE'];
  let message = "Hello json";
  
  if(mySecret == 'uppercase'){
    message = message.toUpperCase();
  }
  
  res.json({
    "message":message
  });

  console.log(req.method + " " + req.path + " - " + req.ip);
  //next();
});


/*In the route app.get('/now', ...) chain a middleware function and the final handler. In the middleware function you should add the current time to the request object in the req.time key. You can use new Date().toString(). In the handler, respond with a JSON object, taking the structure {time: req.time}.*/
app.get("/now", function(req, res, next){
  req.time = new Date().toString();
  next();
}, function (req, res){
    res.json({
      "time":req.time
    });
});









































 module.exports = app;
