"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express = require('express');
var router = express.Router();
exports.router = router;
var path = require('path');
router.use(express.static(path.join(__dirname)));
router.get('/', function (req, res) {
    res.render(path.join(__dirname, '../views/index.ejs'));
});
router.get('/login', function (req, res) {
    res.render(path.join(__dirname, '../views/login.ejs'));
});
router.get('/register', function (req, res) {
    res.render(path.join(__dirname, '../views/register.ejs'));
});
router.get('/chat', function (req, res) {
    res.render(path.join(__dirname, '../views/chat.ejs'));
});
router.get('/private_chat', function (req, res) {
    res.render(path.join(__dirname, '../views/private_chat.ejs'));
});
router.get('/profil', function (req, res) {
    res.render(path.join(__dirname, '../views/profil.ejs'));
});
// POST 
router.post('/register');
router.post('/channels');
