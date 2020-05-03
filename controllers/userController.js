let User = require('../models/userModel');
let connection = require('../db');


exports.userHome = function (req, res) {
    res.render('userHome.ejs');
};

exports.login = function (req, res) {
    let email = req.body.email,
    password = req.body.password;

    if (email && password) {
        connection.query('SELECT * FROM users.user WHERE email = ? AND password = ?', [email, password], (err, results) => {
            if (err) throw err;
            if (results.length > 0) {
                console.log(results)
                req.session.iduser = results[0].iduser;
                req.session.email = email;
                res.redirect('/homepage');
            }
            else {
                res.json({code:400, err: 'Incorrect credentials'});
            }
            res.end();
        }
        );
    }
};

//Send formular to add an user
exports.userFormUpdate = function(req, res) {
    res.render('register.ejs');
}

exports.register = function (req, res) {
    let iduser = req.body.iduser;
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let email = req.body.email;
    let password = req.body.password;

    let user = new User (iduser, firstname, lastname, email, password);

    connection.query('INSERT INTO user SET ?', user, (err, results) => {
        if (err) throw err;
        else {
            console.log('Data added !', results);
            res.redirect('/userHome');
        }
    });
};

//Send formular to delete user
exports.userDelete = function (req, res) {
    let sql = "DELETE FROM `users`.`user` WHERE iduser = ?";
    connection.query( sql , [req.session.iduser], (error, resultSQL) => {
        if(error) {
            res.status(400).send(error);
        }
        else{
            res.redirect('/userHome');
        }
    }); 
    
 };

exports.deleteAccount = function (req, res) {
        res.render('deleteAccount.ejs'); 
};