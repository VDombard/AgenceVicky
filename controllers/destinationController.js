let Destination = require('../models/destinationModel');
let connection = require('../db');

let destinationList = [];

exports.homepage = function (req, res) {
    console.log(req.session)
    connection.query("SELECT des.iddestination, fkuser, des.country, des.city, des.days, age.nomagence FROM users.destination des inner join users.agence age on des.fkagence = age.idagence where des.fkuser = ?", req.session.iduser, function (error, resultSQL) {
        if (error) {
            res.status(400).send(error);
        }
        else {
            res.status(200);
            destinationList = resultSQL;
            console.log(destinationList);
            res.render('homepage.ejs', {destination:destinationList});
        }
    });
}

//Send formular to add a new destination
exports.destAddForm = function(req, res) {
    res.render('destAdd.ejs', {country:"", city:"", days:"",fkagence:""});
}

exports.destAdd = function(req, res) {
    let iddestination = req.body.iddestination;
    let fkuser = req.session.iduser;
    let fkagence = req.body.fkagence;
    let country = req.body.country;
    let city = req.body.city;
    let days = req.body.days;

    
    let destinationsAdd = new Destination(iddestination, fkuser, fkagence, country, city, days);
    console.log(destinationsAdd);
    connection.query("INSERT INTO users.destination set ?", destinationsAdd, function (error, resultSQL) {
        if(error) {
            res.status(404).send(error);
        }
        else {
            console.log(req.session.iduser);
            res.status(200).redirect('/homepage');
        }
    });
};

//Modifier une destination de la liste
exports.destUpdate = function(req, res) {
    let iddestination = req.body.iddestination;
    let fkuser = req.session.iduser;
    let fkagence = req.body.fkagence;
    let country = req.body.country;
    let city = req.body.city;
    let days = req.body.days;
    
    let destinationsUpdate = new Destination(iddestination, fkuser, fkagence, country, city, days);
    console.log(destinationsUpdate);
    connection.query("UPDATE users.destination SET ? WHERE iddestination = ?", [destinationsUpdate, iddestination], function (error, resultSQL) {
        if(error) {
            res.status(404).send(error);
        }
        else {
            res.redirect('/homepage');
        }
    });
}

exports.destUpdateForm = function (req, res) {
    let iddestination = req.params.iddestination;
    connection.query("SELECT des.iddestination, fkuser, des.country, des.city, des.days, des.fkagence, age.nomagence FROM users.destination des inner join users.agence age on des.fkagence = age.idagence WHERE des.iddestination = ?", iddestination ,function (error, resultSQL) {
        if (error)  {
            res.status(400).send(error);
        }
        else {
            res.status(200);
            destination = resultSQL;
            res.render('destUpdate.ejs', {iddestination:destination[0].iddestination, fkuser:destination[0].fkuser, fkagence:destination[0].fkagence, country:destination[0].country, city:destination[0].city, days:destination[0].days});
        }
    });
    console.log(destinationList);
}

//Send formular to delete a destination
exports.destDelete = function (req, res) {
    let iddestination = req.params.iddestination;
    console.log(iddestination);
    connection.query("DELETE FROM users.destination WHERE iddestination = ?", [iddestination], (error, resultSQL) => {
        if (error) {
            res.status(400).send(error);
        }
        else {
            res.redirect('/homepage');
        }
    });
};

exports.destDeleteForm = function (req, res) {
    let iddestination = req.params.iddestination;
    connection.query("SELECT * FROM users.destination WHERE iddestination =?", iddestination, function (error, resultSQL) {
        if (error) {
            res.status(400).send(error);
        }
        else {
            res.status(200);
            destination = resultSQL;
            res.render('destDelete.ejs', {iddestination:destination[0].iddestination, fkagence:destination[0].fkagence, country:destination[0].country, city:destination[0].city, days:destination[0].days});
        }
    });
    console.log(destinationList);
}
