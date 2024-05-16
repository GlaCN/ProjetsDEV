var express = require('express');
var router = express.Router();
const path = require('path');

router.use(express.static(path.join(__dirname)))



router.get('/',(req,res)=>{
  res.render(path.join(__dirname,'../views/index.ejs'))
});

router.get('/login', (req, res) => {
  res.render(path.join(__dirname,'../views/login.ejs'));
});

router.get('/register', (req, res) => {
  res.render(path.join(__dirname,'../views/register.ejs'));
});



router.get('/chat', (req, res) => {
  res.render(path.join(__dirname,'../views/chat.ejs'));
});

router.get('/private_chat', (req, res) => {
  res.render(path.join(__dirname,'../views/private_chat.ejs'));
});

router.get('/profil', (req, res) => {
  res.render(path.join(__dirname,'../views/profil.ejs'));
});

// POST 
router.post('/register')
router.post('/channels');




export {router}