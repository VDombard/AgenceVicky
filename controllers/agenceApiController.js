let Agence = require('../models/agenceModel');
let connection = require('../db');

let agenceList = [];

// Retourne une liste de destinations
exports.agenceListe = function(req, res) {
    connection.query("SELECT * FROM users.agence", function (error, resultSQL) {
        if (error) {
            res.status(404).send(error);
        }
        else {
            res.status(200);
            agenceList = resultSQL;
            res.render('agence.ejs', {agence: agenceListe});  
        }  
    });  
}
//Ajouter une destination
exports.agenceAddForm = function(req, res) {
    res.render('agenceAdd.ejs', {idagence:"", nomagence:""});
}

//Nouvelle destination
exports.agenceAdd = function(req, res) {
    let idagence = req.body.idagence;
    let nomagence = req.body.nomagence;
    //let sess = req.session.iduser
    
    let agencesAdd = new Agence(idagence, nomagence);
    console.log(agencesAdd);
    connection.query("INSERT INTO users.agence set ?", agencesAdd, function (error, resultSQL) {
        if(error) {
            res.status(404).send(error);
        }
        else {
            res.status(200).redirect('/agence');
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
            res.status(404).send(error);
        }
        else {
            res.redirect('/agence');
        }
    });
}

exports.agenceUpdateForm = function (request, response) {
    let idagence = request.params.idagence;
    connection.query("Select * from users.agence WHERE idagence = ?", idagence ,function (error, resultSQL) {
        if (error)  {
            response.status(400).send(error);
        }
        else {
            response.status(200);
            agenceList = resultSQL;
            response.render('agenceUpdate.ejs', {idagence:agence[0].idagence, nomagence:agence[0].nomagence});
        }
    });
}