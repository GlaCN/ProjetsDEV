"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
// Installation et config 
require('dotenv').config();
var express = require("express");
var path = require("path");
var users_1 = require("./routes/users");
var mysql = require("mysql");
var socket_io_1 = require("socket.io");
var bodyParser = require("body-parser");
var userController_1 = require("./controllers/userController");
var channelController_1 = require("./controllers/channelController");
var app = express();
var http = require('http');
var server = http.createServer(app);
var session = require('express-session');
var port = process.env.PORT || 3000;
//view engine setup
app.set('views', path.join(__dirname, 'views'));
console.log(__dirname, "tototo");
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
// pr gerer les requetes POST des formulaires
app.use(express.urlencoded({ extended: true }));
app.use(users_1.router);
// Gestion des sessions
app.use(session({
    secret: 'secretKey', // permet de chiffrer la session
    resave: true, //sauvegarder automatiquement la session  
    saveUninitialized: true, // permet de sauvegarder une session même si elle n'a pas été initialisée
}));
// Connection entre Express et Mysql
var connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});
try {
    connection.connect();
    console.log("connection is ok");
}
catch (error) {
    console.error(error);
}
// socket.io
var io = new socket_io_1.Server(server, {
    connectionStateRecovery: {}
});
// io.engine.use(session);
io.on('connection', function (socket) { return __awaiter(void 0, void 0, void 0, function () {
    var userData;
    return __generator(this, function (_a) {
        //Gérer l'évènement de connexion/deconnexion a socket.io
        console.log("L'utilisateur ".concat(socket.id, " s'est connect\u00E9."));
        userData = session;
        console.log('User data:', (JSON.stringify(userData)));
        socket.on('Disconnect', function (socket) {
            console.log("L'utilisateur ".concat(socket.id, " s'est d\u00E9connect\u00E9."));
        });
        // Gerer la reception de l'event chat via le socket
        socket.on('chat message', function (msg) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                io.emit('chat message', msg);
                console.log("Message de ".concat(socket.id, ": ").concat(msg));
                return [2 /*return*/];
            });
        }); });
        return [2 /*return*/];
    });
}); });
// -------- INSCRIPTION ---------- //
app.post("/register", userController_1.register);
// --------- CONNEXION -----------//
app.post("/login", userController_1.login);
// ---------Pr obtenir la liste des canaux -------- //
app.get("/channels", channelController_1.getALLChannel),
    // -------- SAVE canaux in DB -------------//
    app.post("/channels", channelController_1.createChannel),
    server.listen(port, function () {
        console.log("App is listening on port ".concat(port));
        // connection.end()
    });
// --------- Pr obtenir la liste des users ------- //
// app.get("/channels", async function(req, res) {
//   try {
//   await connection.query(`SELECT * FROM users AND channels `, (error, dbRes)=> {
//       console.log('dbRes : ', dbRes)
//       if (error) {
//         console.log(error);
//       } else {
//         res.render(`channels`, {dbRes :dbRes});
//         return dbRes;
//       }
//     });
//   await connection.query(`SELECT * FROM channels `, (error, dbRes)=> {
//     // console.log('dbRes : ', dbRes.length)
//     if (error) {
//       console.log(error);
//     } else {
//       res.render(`channels`, {dbRes :dbRes});
//       return dbRes;
//     }
//   });
//   } catch (error) {
//     console.log(error);
//   }
// }),
