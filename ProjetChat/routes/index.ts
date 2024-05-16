var express = require('express');
var router = express.Router();
const path = require('path');


router.use(express.static(path.join(__dirname)))

// GET
router.get('/',(req,res)=>{
  res.render(path.join(__dirname,'../views/index.ejs'))
});

router.get('/register', (req, res) => {
  res.sendFile(('../views/register.ejs'));
});

router.get('/channels', (req, res) => {
  res.render(path.join(__dirname,'../views/channels.ejs'));
});


// POST 
router.post('/register')






module.exports = router;
