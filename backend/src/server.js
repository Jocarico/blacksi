const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cors = require("cors");
const env = require("dotenv");
const Admin = require('./models/adminModel');
const bcrypt = require("bcrypt");
const mongoose = require('mongoose');

env.config({
    path: "./config.env",
});

app.use(cors());
app.use(bodyparser.json({limit: "100mb"}));

// Establish MongoDB connection
mongoose.connect('mongodb+srv://jonatanrico:SCRUMMaster!@blacksitest.qjf6dae.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

app.all("*", (res, req, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.post('/login', async function (req, res) {
    const {email, password} = req.body;

    try {
        const admin = await Admin.findOne({email: email, password: password});
        if (admin) {
            res.send("Login successful!");
        } else {
            res.status(401).send("Invalid login credentials");
        }
    } catch (error) {
        res.status(500).send("An error occurred while logging in");
    }
});

app.post('/register', async function (req, res) {
    const {email, password} = req.body;

    try {
        const existingAdmin = await Admin.findOne({email: email});
        if (existingAdmin) {
            return res.status(409).send("Email already registered");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new Admin({
            email: email,
            password: hashedPassword
        });

        await newAdmin.save();

        res.send("Registration successful!");
    } catch (error) {
        res.status(500).send("An error occurred while registering");
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App is running on port: ${port}`);
});
