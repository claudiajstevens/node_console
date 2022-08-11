let express = require('express');
let app = express();
let bodyParser = require('body-parser');

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


/*Build an echo server, mounted at the route GET /:word/echo. Respond with a JSON object, taking the structure {echo: word}. You can find the word to be repeated at req.params.word. You can test your route from your browser's address bar, visiting some matching routes, e.g. your-app-rootpath/freecodecamp/echo.*/
app.get("/:word/echo", function(req,res){
  res.json({
    echo:req.params.word
  })
});


/*Build an API endpoint, mounted at GET /name. Respond with a JSON document, taking the structure { name: 'firstname lastname'}. The first and last name parameters should be encoded in a query string e.g. ?first=firstname&last=lastname.

Note: In the following exercise you are going to receive data from a POST request, at the same /name route path. If you want, you can use the method app.route(path).get(handler).post(handler). This syntax allows you to chain different verb handlers on the same path route. You can save a bit of typing, and have cleaner code

app.route("/name").get(function(req, res, next){
  let fname = req.query.first;
  let lname = req.query.last;
  res.json({
    name:fname + ' ' + lname
  })
  next();
}).post();
*/


/*body-parser has already been installed and is in your project's package.json file. require it at the top of the myApp.js file and store it in a variable named bodyParser. The middleware to handle URL encoded data is returned by bodyParser.urlencoded({extended: false}). Pass the function returned by the previous method call to app.use(). As usual, the middleware must be mounted before all the routes that depend on it.*/
app.use(bodyParser.urlencoded({extended: false}));

/*Mount a POST handler at the path /name

Respond with the same JSON object as before: {name: 'firstname lastname'}. Test if your endpoint works using the html form we provided in the app frontpage.
*/
app.post("/name", function(req, res){
  let fname = req.body.first;
  let lname = req.body.last;
  res.json({
    name:fname + ' ' + lname
  })
})































 module.exports = app;
