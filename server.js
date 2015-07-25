var express = require('express');
var cors = require('cors');
var http = require('http');
var app = express();
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var PORT_num = process.env.PORT;

app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.get('/bookDetail', cors(), function(req, res, next) {
  console.log(req.query.book_isbn);
  var options = {
    host: 'isbndb.com',
    path: '/api/v2/json/UTUJEB5A/prices/' + req.query.book_isbn
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

app.post('/sendMail', function(req, res) {
  var data = req.body;

  //gather mail options from body
  var mailOptions = {
    from: data.from, // sender address
    to: data.to, // list of receivers
    subject: data.subject, // Subject line
    text: data.text, // plaintext body
    // html: data.html // html body
  };
  console.log(mailOptions)

  //create transporter object w/ mailgun credentials
  var transporter = nodemailer.createTransport({
    service: 'Mailgun',
    auth: {
      user: 'omnibooks@sandboxd3dc8fa818a14352baca775bf44944f7.mailgun.org',
      pass: 'makersquare'
    }
  });

  transporter.sendMail(mailOptions, function(error) {
    if (error) {
      console.log(error);
      res.send("error");
    } else {
      console.log("Message sent");
      res.send("sent");
    }
  });
});

app.listen(PORT_num || 8000);
