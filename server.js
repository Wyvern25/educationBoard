require("dotenv").config();
const express = require("express");
const app = express();
const ejs = require('ejs');
const bcrypt = require('bcrypt');
const session = require('express-session');
const flash = require('express-flash')
const passport = require('passport');

app.use(session({ secret: 'thisiseducationboard'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

const initializePassport = require('./passport-config');
initializePassport(
    passport, 
    username => user.find(user => user.username === username)
    );

//database connection
const connection = require('./connection');

app.set('view-engine', ejs)
app.use(express.urlencoded({ extended: false}));

app.get('/', (req,res) => {
    res.render('index.ejs', {message: "To education board"})
})
app.get('/login', (req,res) => {
    res.render('login.ejs')
});
app.post('/login', (req, res) => {
    
});

app.get('/register', (req,res) => {
    res.render('register.ejs')
});



app.post('/register', (req, res) => {
    console.log(req.body);
    bcrypt.genSalt(10, (err,salt) => {
        bcrypt.hash(req.body.password_hash, salt, (err, p_hash) => {
            connection.query(`INSERT INTO users (userfullname, username, password_hash, auth_level) VALUES (?,?,?,?)`, [
                req.body.userfullname, req.body.username, p_hash, req.body.auth_level
            ], (err, results, fields) => {
                
                if (err) {
                    console.log("error ocurred",err);
                    res.send({
                       "code":400,
                       "failed":"error ocurred"
                    })
                } else {
                    res.redirect('/login');
                }
            })
        })
    })

})



app.listen(3000);