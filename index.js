const express = require('express');
// const http = require('http');
const cors = require('cors');
// import routes from './src/routes/gmtnRoutes';
// const cookieParser = require('cookie-parser');
const bodyParser =  require('body-parser');
const mysql = require('mysql');

const app = express();
const PORT = 4000;

const dbConnString = {
    // Local connection
    host: "localhost",
    user: "root",
    password: "135@Mysql",
    database:"gmtndb"
  
    // AWS connection
    // host:'membersnetwork.c5fk6a6fr7id.us-east-2.rds.amazonaws.com', 
    // port:3306,
    // database:'membersnetwork',
    // username:'network',
    // password:'135Kolo83'
   
    // Afrihost connection
    // host:"sugarman.aserv.co.za",
    // port:2031,
    // user:"mahasuah_gmtn",
    // password:"wmolOZ44KkXj",
    // database:'mahasuah_gmtndb'
}

var connection;
function handleDisconnect() {
  connection = mysql.createConnection(dbConnString);

  connection.connect(function(err) {
    if(err) {   
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000);
    } else {
      console.log('You are now connected...');

      let createSocial = `create table if not exists social(
        socialId int primary key auto_increment,
        firstName varchar(255) not null,
        lastName varchar(255) not null,
        interest varchar(255) not null,
        city varchar(255) not null,
        address varchar(255) not null,
        address1 varchar(255) not null,
        zipCode varchar(255) not null,
        typeOfCommunication varchar(255) not null,
        phone varchar(255) not null,
        email varchar(255) not null
      )`;

      let createBusiness = `create table if not exists business(
        businessId int primary key auto_increment,
        firstName varchar(255) not null,
        lastName varchar(255) not null,
        interest varchar(255) not null,
        city varchar(255) not null,
        address varchar(255) not null,
        address1 varchar(255) not null,
        zipCode varchar(255) not null,
        typeOfCommunication varchar(255) not null,
        phone varchar(255) not null,
        email varchar(255) not null
      )`;

      let createLocalKnowledge = `create table if not exists localKnowledge(
        localKnowledgeId int primary key auto_increment,
        firstName varchar(255) not null,
        lastName varchar(255) not null,
        interest varchar(255) not null,
        city varchar(255) not null,
        address varchar(255) not null,
        address1 varchar(255) not null,
        zipCode varchar(255) not null,
        typeOfCommunication varchar(255) not null,
        phone varchar(255) not null,
        email varchar(255) not null
      )`;

      connection.query(createSocial, function(err, results, fields) {
        if (err) {
          console.log(err.message);
        } else {
          console.log('Social tables created!')
        }
      });

      connection.query(createBusiness, function(err, results, fields) {
        if (err) {
          console.log(err.message);
        } else {
          console.log('Business tables created!')
        }
      });

      connection.query(createLocalKnowledge, function(err, results, fields) {
        if (err) {
          console.log(err.message);
        } else {
          console.log('Local knowledge tables created!')
        }
      });

    }
  });

  connection.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleDisconnect(); 
    } else {                                     
      throw err;                                  
    }
  });
}

handleDisconnect();

// body parser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors);
// app.use(cookieParser());
// routes(app);

app.use(express.static('public'));

app.get('/socialising', (req, res) => {
    console.log(req);
    connection.query('SELECT * FROM social', (err, result, field) => {
        if (err) throw err;
        res.end(JSON.stringify(result));
    })
});

app.get('/business', (req, res) => {
  console.log(req);
  connection.query('SELECT * FROM business', (err, result, field) => {
      if (err) throw err;
      res.end(JSON.stringify(result));
  })
});

app.get('/local-knowledge', (req, res) => {
  console.log(req);
  connection.query('SELECT * FROM localKnowledge', (err, result, field) => {
      if (err) throw err;
      res.end(JSON.stringify(result));
  })
});
// app.post('/social', (req, res) => {
//   let firstName = req.body.firstName;
//   let lastName = req.body.lastName;
//   let interest = req.body.interest;
//   let location = req.body.location;
//   let phone = req.body.phone;
//   let email = req.body.email;
//   let typeOfComunication = req.body.typeOfComunication;
//   let city = req.body.city;
//   let zipCode = req.body.zipCode;
//   let address = req.body.address;
//   let address1 = req.body.address1;

//   connection.connect(function(err){
//     if (err) throw err;

//     let sqlQuery = "INSERT INTO social ('firstname', 'lastName', 'interest', 'location', 'phone', 'email', 'typeOfComunication', 'city', 'zipCode', 'address', 'address1') VALUES ('"+firstName+"','"+lastName+"', '"+interest+"', '"+location+"', '"+phone+"', '"+email+"', '"+typeOfComunication+"', '"+city+"', '"+zipCode+"', '"+address+"', '"+address1+"')";

//     connection.query(sqlQuery, function (err, result) {
//       if (err) throw err;
//       console.log("1 record inserted");
//        res.end();
//     });

//   })
  
// })

app.post('/socialising', function (req, res) {
  var postData  = req.body;
  connection.query('INSERT INTO social SET ?', postData, function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});

app.post('/business', function (req, res) {
  var postData  = req.body;
  connection.query('INSERT INTO business SET ?', postData, function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});

app.post('/local-knowledge', function (req, res) {
  var postData  = req.body;
  connection.query('INSERT INTO localKnowledge SET ?', postData, function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});

app.listen(PORT, () => {
    console.log(`Your server is running on port ${PORT}`)
});
