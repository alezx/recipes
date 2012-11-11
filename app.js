var express = require('express');
var app = express();
app.get('/', function(req, res){
  res.send('Hello World');
});

app.engine('jade', require('jade').__express);

app.get('/about', function(req, res){
  res.render('about', {
    title: 'About'
  });
});

app.listen(3000);
console.log('Listening on port 3000');