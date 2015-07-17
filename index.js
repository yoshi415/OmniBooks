var express = require('express');
var app = express();
var bodyParser  = require('body-parser');
var PORT_num = process.env.PORT;


var users = {
  'user':'123',
};

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });


app.post('/login', function(req,res){
  var username = req.body.username;
  var password = req.body.password;


  if(users[username] === password && (password)){
    res.send({userName:username, getIn:'OK'});
    res.end();
  }else{
    res.send('404');
    res.end();
  }

});

app.listen(PORT_num || 8000);
