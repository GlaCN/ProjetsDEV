"use strict";
// import { login, register } from "../controllers/userController";
var express = require('express');
var router = express.Router();
var path = require('path');
router.use(express.static(path.join(__dirname)));
router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../views/index.ejs'));
});
// router.post('/login', login)
// GET
router.get('/register', function (req, res) {
    res.sendFile(('../views/register.ejs'));
});
module.exports = router;
