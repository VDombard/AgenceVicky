let Destination = require('../models/destinationModel');
let connection = require('../db');

let destinationList = [];

//Read destination liste
exports.homepage = function (req, res) {
    console.log(req.session)
    connection.query("SELECT * FROM users.destination", function (error, resultSQL) {
        if (error) {
            res.status(400).json({'message' : error });
        }
        else {
            res.status(200);
            destinationList = resultSQL;
            console.log(destinationList);
            res.json({destination:destinationList});
        }
    });
}

//Create destination
exports.destAdd = function(req, res) {
    let iddestination = req.body.iddestination;
    let fkuser = req.body.fkuser;
    let fkagence = req.body.fkagence;
    let country = req.body.country;
    let city = req.body.city;
    let days = req.body.days;

    
    let destinationsAdd = new Destination(iddestination, fkuser, fkagence, country, city, days);
    console.log(destinationsAdd);
    connection.query("INSERT INTO users.destination SET ?", destinationsAdd, function (error, resultSQL) {
        if(error) {
            res.status(404).json({'message' : error });
        }
        else {
            console.log(req.params.iduser);
            res.status(200).json({'message' : 'success'});
        }
    });
};

//Update destination
exports.destUpdate = function(req, res) {
    let iddestination = req.params.iddestination;
    let fkuser = req.body.fkuser;
    let fkagence = req.body.fkagence;
    let country = req.body.country;
    let city = req.body.city;
    let days = req.body.days;
    
    let destinationsUpdate = new Destination(iddestination, fkuser, fkagence, country, city, days);
    console.log(destinationsUpdate);
    connection.query("UPDATE users.destination SET ? WHERE iddestination = ?", [destinationsUpdate, iddestination], function (error, resultSQL) {
        if(error) {
            res.status(404).json({'message' : error});
        }
        else {
            console.log(req.params.iduser);
            res.status(200).json({'message' : 'success'});
        }
    });
}

//Delete destination
exports.destDelete = function (req, res) {
    let iddestination = req.params.iddestination;
    console.log(iddestination);
    connection.query("DELETE FROM users.destination WHERE iddestination = ?", [iddestination], (error, resultSQL) => {
        if (error) {
            res.status(400).json({ 'message' : error});
        }
        else {
            res.status(200).json({'message' : 'success'});
        }
    });
};
