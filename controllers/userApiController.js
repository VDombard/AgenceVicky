let User = require('../models/userModel');
let connection = require('../db');

let userList = [];

exports.userList = function (req, res) {
    console.log(req.session)
    connection.query("SELECT * FROM users.user", function (error, resultSQL) {
        if (error) {
            res.status(400).json({'message' : error });
        }
        else {
            res.status(200);
            userList = resultSQL;
            console.log(userList);
            res.json({user:userList});
        }
    });
}

//Add user
exports.register = function (req, res) {
    let iduser = req.body.iduser;
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let email = req.body.email;
    let password = req.body.password;

    let user = new User (iduser, firstname, lastname, email, password);

    connection.query('INSERT INTO user SET ?', user, (err, results) => {
        if (err) {
            res.status(404).json({'message' : error });
        }
        else {
            console.log('Data added !', results);
            res.status(200).json({'message' : 'success'});
        }
    });
};

//Delete an user
exports.userDelete = function (req, res) {
    let sql = "DELETE FROM `users`.`user` WHERE iduser = ?";
    connection.query( sql , [req.params.iduser], (error, resultSQL) => {
        if(error) {
            res.status(400).json({'message' : error });
        }
        else{
            res.status(200).json({'message' : 'success'});
        }
    }); 
 };