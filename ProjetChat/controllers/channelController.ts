
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

export async function getALLChannel(req: Request, res: Response) {
    try {
    await connection.query(`SELECT * FROM channels `, (error, dbRes)=> {
        console.log('dbRes : ', dbRes.length)
        if (error) {
          console.log(error);
        } else {
          res.render(`channels`, {dbRes :dbRes})
        }
      });
  
    } catch (error) {
      console.log(error);
    }
}


export async function createChannel(req:Request, res:Response) {
    console.log('ICIIIIIIIIIII')

  try {
    const { channel } = req.body;
    console.log(req.body);
    if (channel.length < 0) {
      return res.render('channels', {error: 'Veuillez remplir le champs'});
    }
    
    connection.query(`INSERT INTO channels (identifier) VALUES (?)`, [channel], (error, dbRes)=> {
      if (error) {
        console.log(error);
      } else {
        // window.location.href = '/channels'
        console.log('Channels successfully created !');
      }
    });

  } catch (error) {
    console.log(error);
  }
}