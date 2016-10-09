var express = require('express');
var multer = require('multer');
var fs = require('fs');
var app = express();


var DIR = './uploads/';

var upload = multer({dest: DIR});

var Dictionary = {};
var x = 0; 

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept,Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});


app.use(multer({
  dest: DIR,
  rename: function (fieldname, filename) {
    return filename; //+ Date.now();
  },
  onFileUploadStart: function (file) {
    console.log(file.originalname + ' is starting ...');
   Dictionary[file.originalname] = 0; 
    app.get('/'+file.originalname , function (req, res) {
      res.end('{"state" : '+Dictionary[file.originalname]+'}');

    });



  },
  onFileUploadComplete: function (file) {
   
   var exec = require('child_process').exec;
var child = exec('java -jar videoConverterMockTest/videoConverterMockTest.jar',
  function (error, stdout, stderr){
    if(error !== null){
      console.log("Error -> "+error);
    }
});
 
child.stdout.on('data', function(data) {
    console.log(Dictionary);
    Dictionary[file.originalname] = data.toString(); 
    if (data == 100){
      console.log("Done");

      app.get('/dl/'+file.originalname, function(req, res){
        var filename = req.url.split("/")[2];
        var file = 'downloads/' + filename;
        res.download(file); // Set disposition and send it.
      });


    }
});

    console.log(file.originalname  + ' uploaded to  ' + file.path);



  }
}));




app.get('/', function (req, res) {
  res.end('{"state" : '+Math.random()+'}');
});

app.post('/', function (req, res) {
  upload(req, res, function (err) {
    if (err) {
      return res.end(err.toString());
    }

    res.end('File is uploaded');
  });
});

var PORT = 8000;

app.listen(PORT, function () {
  console.log('Working on port ' + PORT);
});