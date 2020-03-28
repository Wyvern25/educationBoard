const express = require("express");
const bcrypt = require('bcrypt');
const connection = require('../connection');

module.exports.register = (req, res) => {
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
}