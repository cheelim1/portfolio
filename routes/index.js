var express = require('express');
var router = express.Router();

// router.get('/', (req, res) => {
//   res.send("Hello World!");
// });
router.get('/', function(req,res){
  res.sendFile(__dirname + '/index.html')
})

router.get('/hello/:name',function(req,res){
  res.render('hello',{param: req.params.name})
})

router.get('/twilio', function(req,res){
  res.render('twilio.ejs')
})

module.exports = router;