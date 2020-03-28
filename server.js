require("dotenv").config();
const express = require("express");
const app = express();
const ejs = require('ejs');
const session = require('express-session');
const flash = require('express-flash')
const passport = require('passport');

const loginroutes = require('./routes/loginroutes');
const registerroutes = require('./routes/registerroutes');

app.use(session({ secret: 'thisiseducationboard'}));

app.set('view-engine', ejs)
app.use(express.urlencoded({ extended: false}));

//database connection
const connection = require('./connection');

//routes to handle login

app.post('/register', registerroutes.register);
app.post('/login', loginroutes.login);
app.get('/validation', loginroutes.validation);




app.get('/', (req,res) => {
    res.render('index.ejs', {message: "To education board"})
})
app.get('/login', (req,res) => {
    res.render('login.ejs')
});
app.get('/register', (req,res) => {
    res.render('register.ejs')
});
app.get('/dashboard', (req, res) => {
    res.render('dashboard.ejs', {message: ''})
})


// app.post('/register', (req, res) => {
//     console.log(req.body);
//     bcrypt.genSalt(10, (err,salt) => {
//         bcrypt.hash(req.body.password_hash, salt, (err, p_hash) => {
//             connection.query(`INSERT INTO users (userfullname, username, password_hash, auth_level) VALUES (?,?,?,?)`, [
//                 req.body.userfullname, req.body.username, p_hash, req.body.auth_level
//             ], (err, results, fields) => {
                
//                 if (err) {
//                     console.log("error ocurred",err);
//                     res.send({
//                        "code":400,
//                        "failed":"error ocurred"
//                     })
//                 } else {
//                     res.redirect('/login');
//                 }
//             })
//         })
//     })

// })



app.listen(3000);