var express = require('express');
var request = require('request');
var app = express();
var resizeApiUrl = 'http://img-resize.com/resize';

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/web'));

app.post('/resize', function(req, resp) {
  req.pipe(request(resizeApiUrl)).pipe(resp);
})

app.head('/filesize', function(req, resp) {
  var imageUrl = req.query.url;

  if (imageUrl) {
    req.pipe(request(imageUrl)).pipe(resp);
  } else {
    resp.sendStatus('404');
  }
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
