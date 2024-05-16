// Installation et config 
require('dotenv').config();

import express = require("express");
import path = require("path");
import {router} from "./routes/users";
import mysql = require('mysql');

import bcrypt = require('bcrypt')
import { Server, Socket } from 'socket.io';
import * as bodyParser from 'body-parser';
import { login, register } from "./controllers/userController";
import { createChannel, getALLChannel } from "./controllers/channelController";



let app = express();
const http = require('http');
const server = http.createServer(app);
const session =require('express-session');


const port = process.env.PORT || 3000;

//view engine setup
app.set('views', path.join(__dirname, 'views'));
// console.log(__dirname, "tototo")
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

// pr gerer les requetes POST des formulaires
app.use(express.urlencoded({ extended: true }));
app.use(router);

// Gestion des sessions
app.use(session({
  secret: 'secretKey', // permet de chiffrer la session
  resave: true, //sauvegarder automatiquement la session  
  saveUninitialized: true, // permet de sauvegarder une session même si elle n'a pas été initialisée
}))
// on etends l'objet session avc la propriete user qui n'etait pas reconnu
declare module "express-session" {
  interface SessionData {
    user: any;
  }
}

// Connection entre Express et Mysql
const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
})

    try {
    connection.connect()
        console.log("connection is ok");
    }catch(error){
        console.error(error)
    }

// socket.io
const io = new Server(server,{
  connectionStateRecovery: {}
});


// io.engine.use(session);

io.on('connection', async (socket: any)=> {
  //Gérer l'évènement de connexion/deconnexion a socket.io
    console.log(`L'utilisateur ${socket.id} s'est connecté.`);

    const userData = session
    console.log('User data:', (JSON.stringify(userData)));

    socket.on('Disconnect', (socket: any)=> {
    console.log(`L'utilisateur ${socket.id} s'est déconnecté.`);
    });

  // Gerer la reception de l'event chat via le socket
    socket.on('chat message', async(msg: string)=> {
      io.emit('chat message', msg);
      console.log(`Message de ${socket.id}: ${msg}`)
    });
})


// -------- INSCRIPTION ---------- //
app.post("/register",register)

// --------- CONNEXION -----------//
app.post("/login", login)

// ---------Pr obtenir la liste des canaux -------- //
app.get("/channels",getALLChannel),

// -------- SAVE canaux in DB -------------//
app.post("/channels", createChannel),




server.listen(port, () => {
console.log(`App is listening on port ${port}`);

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