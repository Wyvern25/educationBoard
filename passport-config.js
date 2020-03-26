// const passport = require('passport');
// const connection = require('./connection');
// const bcrypt = require('bcrypt');

// function initialize(passport) {

//     //used to serialize the user fo the session
//     passport.serializeUser(function(user, done) {
//         done(null, user.id);
//     });

//     //used to deserialize the user
//     passport.deserializeUser(function(id, done) {
//         connection.query(`SELECT * FROM users WHERE id = `+id, function(er, rows) {
//             done(err, rows[0]);
//         });
//     });

//     passport.use(new LocalStrategy ({
//         usernameField : 'username',
//         passwordField : 'password_hash',
//         passReqToCallBack : true
//     },
//     function(req, username, password_hash, done) {
//         connection.query(`SELECT * FROM users WHERE username = `+ username + '', function(err, rows) {
//             if(err) return done(err);
//             if(!rows.length) {
//                 return done(null, false, req.flash('loginMessage', 'No user found.'))
//             }
//             if(!(rows[0].password_hash == password_hash))
//                 return done(null, false, req.flash('loginMessage', 'Ops! wrong password.'));

//             return done(null, row[0]);
//         });
//     }));
// };

const LocalStrategy = require('passport-local').LocalStrategy;
const bcrypt = require('bcrypt');

function initialize(passport, getUserByUsername, getUserById) {
    const authenticateUser = async (req, username, password_hash, done) => {
        connection.query(`SELECT * FROM users WHERE username = `+ username + '', function(err, rows) {
            const user = getUserByUsername(username)
            if(err) return done(err);
            if(!rows.length) {
                return done(null, false,{ message: 'No user found.'})
            }
            try {
                if(bcrypt.compare(password_hash, user.password_hash)){
                    return done(null, user)
                }else {
                    return done (null, false, { message: 'password incorrect'})
                }
            } catch (e){
                return done(e);
            }

            // return done(null, row[0]);
        });
    }
    // passport.use(new LocalStrategy({usernameField: 'username'}),authenticateUser)
    passport.serializeUser((user, done) => {
        done(null, user.id)
    })
    passport.deserializeUser((id, done) => { 
        connection.query('SELECT * FROM users WHERE id = ' +id, (err, rows) => {
            done(err, rows[0]);
        })
    })


}

module.exports = initialize;