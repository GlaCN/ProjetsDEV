import * as emailValidator from 'email-validator';
import bcrypt = require( 'bcrypt')
import mysql = require('mysql');
import { Request, Response } from 'express';



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

export async function register(req:Request,res:Response) {
    try {
    const { pseudo, email, password, password_confirm } = req.body;
  
      if (password !== password_confirm) {
        return res.render('register', {error: 'Les mots de passe ne sont pas identiques !'});
      }
  
      if(! emailValidator.validate(email)) {
        return res.render('register', {error: 'votre email n\'est pas valide'});
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashPassword = bcrypt.hashSync(password, salt)
  
      
    connection.query(`INSERT INTO users (pseudo, email, mdp) VALUES (?, ?, ?)`, [pseudo, email, hashPassword], (error, dbRes)=> {
      if (error) {
        console.log(error);
      } else {
        res.redirect(`/login`)
      }
    });
  } catch (error) {
    console.log(error);
  }
  }


  export async function login (req:Request, res:Response) {
    const { email, password } = req.body;
    // console.log(req.body);

  try {
    const sqlSearch = "Select * from users where email = ?" ;
    const search_query = mysql.format(sqlSearch, [email]);
    
    connection.query(search_query, (error, result) => {
      // console.log(`Results : ${result[0].email}`);

      if (error) {
        console.log(error);
        res.sendStatus(404);
      } else if (result.length === 0) {
        console.log("Mauvaise adresse mail.");        
        res.sendStatus(404) 
      } 
        // const sqlQuery = "Select * from users where email = ?"
        // connection.query (sqlQuery, [email], (error, result) => {
        const mdpDB = result[0].mdp;
        const match = bcrypt.compareSync(password, mdpDB);
            
          if(match){
            console.log('Connexion');

            // connexion réussie ==> on enregistre une sesion pr le user
            req.session.user = { 
              email: result[0].email,
              username: result[0].pseudo
            };
            console.log('session:', req.session)
            res.cookie('session',req.session.user)
            res.redirect('channels');

          } else {
            console.log("Mauvais mot de passe.");
            res.sendStatus(404);
          }
          // }
        })
  } catch (error) {
    console.log(error);
    return res.status(500).send("Erreur interne du serveur");
  }
}






  
// const dom = document.addEventListener('DOMContentLoaded', (event) => {

// const form: any = window.document.querySelector('.register_form');

//     // 1- Récup des données du form 
//     // ? signifie que form peut être null
//     form?.addEventListener("submit", async function(event) {
//         // Empecher le rechargement par defaut de la page
//         event.preventDefault();

//         // L'objet formData récupère tout les champs du formulaire
//         const formData = new FormData(form);
//         console.log('form :', form)
//         console.log('formData :', formData)

//         try {
//             const response = await fetch('/register', {
//                 method: 'POST',
//                 body: formData
//             });

//             const result = await response.json();
//             console.log(result);

//         } catch (error) {
//             console.error('Erreur :', error)
//         }
//     })
// })