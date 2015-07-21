var express = require('express');
var cors = require('cors');
var http = require('http');
var app = express();
var bodyParser  = require('body-parser');
var PORT_num = process.env.PORT;


app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));



app.get('/bookDetail', cors(), function(req, res, next){
console.log(req.query.book_isbn);
var options = {
  host: 'isbndb.com',
  path: '/api/v2/json/UTUJEB5A/prices/'+req.query.book_isbn
};

  http.get(options, function(book) {
    var bodyChunks = [];
    book.on('data', function(chunk) {
      bodyChunks.push(chunk);
    }).on('end', function() {
      var body = Buffer.concat(bodyChunks);
      res.send(body);
    })
  });


});



app.listen(PORT_num || 8000);
