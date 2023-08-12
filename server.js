const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cors = require("cors");
// require("dotenv").config({path: "./config.env"});
require('dotenv').config({path: __dirname + '/config.env'})
const Admin = require('./models/adminModel');
const bcrypt = require("bcrypt");
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { api } = require('./apitn')


// env.config({
//     path: ,
// });


const database_connection = process.env.DATABASE_CONNECTION;
const secretKey = process.env.ACCESS_TOKEN_SECRET

app.use(cors())

 //CORS validation
app.all("*", (res, req, next) =>{
   //Rules of engagement
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
   res.header("Access-Control-Allow-Headers", "Content-Type");
   next();
 })
app.use(bodyparser.json({limit: "100mb"}));

//JSON data from Tienda Nube 
const tiendanubeData = async (req,res) => {
  const tnData = await api.get()
  console.log(tnData.data)
  let info = tnData.data;
  res.status(200).send(info);
}


function generateToken(payload) {
  const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
  return token;
}

// Establish MongoDB connection
mongoose.connect(database_connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
      //Correct credentials
      if(admin && passwordMatch){
        const payload = {email: 'test@example.com'};
        const token = generateToken(payload);
        console.log("it works")
        res.status(200).send({_token: token});
        return res.status(200).send("Valid login credentials");
      }
      const admin = await Admin.findOne({ email: email });
      if (!admin) {
        return res.status(401).send("Invalid login credentials");
      }
      
      const passwordMatch = await bcrypt.compare(password, admin.password);
      if(!passwordMatch) {
        //Wrong password
        return res.status(401).send("Invalid login credentials");
      }
      
      
      
    } catch (error) {
      res.status(500).send("An error occurred while logging in");
    }
  });
  app.post('/register', async function (req, res) {
    const { email, password } = req.body;
  
    try {
      const existingAdmin = await Admin.findOne({ email: email });
      if (existingAdmin) {
        return res.status(409).send("Email already registered");
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const newAdmin = new Admin({
        email: email,
        password: hashedPassword
      });
  
      try {
        await newAdmin.save();
        res.send("Registration successful!");
      } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while registering");
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("An error occurred while registering");
    }
  });
  
  app.get('/deliveryInfo', async function (req, res) {
    const datatn = await tiendanubeData(req,res);
 


  })
    

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App is running on port: ${port}`);
});
module.exports = app;