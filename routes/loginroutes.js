
require("dotenv").config();
const bcrypt = require('bcrypt');

//database connection
const connection = require('../connection');

module.exports.login = (req, res) => {
    var username = req.body.username;
    var password_hash = req.body.password_hash;

    connection.query(`SELECT * FROM users WHERE username = ?`, [username], (err, results, fields) => {
        if(err) {
            res.json({
                status: false,
                message: 'error with query'
            })
        } else {
            if( results.length > 0) {
                bcrypt.compare( password_hash, results[0].password_hash, (err, result) => {
                    if(result == true) {
                        req.session.user_id = results[0].id;
                        req.session.userfullname = results[0].userfullname;
                        req.session.username = results[0].username;
                        req.session.auth_level = results[0].auth_level;
                        page = [results[0].id, results[0].userfullname];

                        res.redirect('/dashboard');
                    } else {
                        res.send({
                            "code":204,
                            "success":"Email and password does not match"
                        });
                    }
                })
            } else {
                res.send({
                    "code":204,
                    "success":"Username does not exits"
                });
            }
        }
    })
}

module.exports.validation = (req, res, next) =>{
           
    var user =  req.session.userfullname,
    user_id = req.session.user_id;
    console.log(userId);
    if(user_id == null){
       res.redirect("/login");
       return;
    }    
};

