let Agence = require('../models/agenceModel');
let connection = require('../db');

let agenceList = [];

// Retourne une liste d'agence
exports.agenceListe = function(req, res) {
    connection.query("SELECT * FROM users.agence", function (error, resultSQL) {
        if (error) {
            res.status(400).json({'message' : error });
        }
        else {
            res.status(200);
            agenceList = resultSQL;
            res.json({agence: agenceList});  
        }  
    });  
}

//Nouvelle destination
exports.agenceAdd = function(req, res) {
    let idagence = req.body.idagence;
    let nomagence = req.body.nomagence;
    
    let agencesAdd = new Agence(idagence, nomagence);
    console.log(agencesAdd);
    connection.query("INSERT INTO users.agence set ?", agencesAdd, function (error, resultSQL) {
        if(error) {
            res.status(404).json({'message' : error });
        }
        else {
            res.status(200).json({'message' : 'success'});
        }
    })
};

//Modifier une destination de la liste
exports.agenceUpdate = function(req, res) {
    let idagence = req.body.idagence;
    let nomagence = req.body.nomagence;

    let agencesUpdate = new Agence(idagence, nomagence);
    console.log(agencesUpdate);
    connection.query("UPDATE users.agence SET ? WHERE idagence = ?", [agencesUpdate, idagence], function (error, resultSQL) {
        if(error) {
            res.status(404).json({'message' : error });
        }
        else {
            res.status(200).json({'message' : 'success'});
        }
    });
}