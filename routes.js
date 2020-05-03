let express = require('express');
let router = express.Router();

//Routes vers dossier controllers
var userController = require('./controllers/userController');
var userApiController = require('./controllers/userApiController');
var destinationController = require('./controllers/destinationController');
var destinationApiController = require('./controllers/destinationApiController');
var agenceController = require('./controllers/agenceController');
var agenceApiController = require('./controllers/agenceApiController');

const check = (req, res, next) => {
    if(req.session && req.session.iduser >= 0) {
        next();
    }
    else {
        res.send('Access denied');
    }
};

router.get('/', (req, res) => res.redirect('/userHome'));

//Routes <USER>
router.get('/register', userController.userFormUpdate);
router.post('/auth_register', userController.register);
router.get('/userHome', userController.userHome);
router.post('/auth_login', userController.login);
router.post('/user_delete', userController.userDelete);
router.get('/delete_account', userController.deleteAccount);

//Routes <API USER>
router.get('/api/user', userApiController.userList);
router.post('/api/user', userApiController.register);
router.delete('/api/user/:iduser', userApiController.userDelete);


//Routes <DESTINATION>
router.get('/homepage', check, destinationController.homepage);
router.get('/destaddform', destinationController.destAddForm);
router.post('/destadd', destinationController.destAdd);
router.get('/destupdateform/:iddestination', destinationController.destUpdateForm);
router.post('/destupdate', destinationController.destUpdate);
router.get('/destdeleteform/:iddestination', destinationController.destDeleteForm);
router.post('/destdelete/:iddestination', destinationController.destDelete);

//Routes <API DESTINATION>
router.get('/api/homepage', destinationApiController.homepage);
router.post('/api/destadd', destinationApiController.destAdd);
router.put('/api/destupdate/:iddestination', destinationApiController.destUpdate);
router.delete('/api/destdelete/:iddestination', destinationApiController.destDelete);

//Routes <AGENCE>
router.get('/agence', agenceController.agenceListe);
router.get('/agenceaddform', agenceController.agenceAddForm);
router.post('/agenceadd', agenceController.agenceAdd);
router.get('/agenceupdateform/:idagence', agenceController.agenceUpdateForm);
router.post('/agenceupdate', agenceController.agenceUpdate);

//Routes <API AGENCE>
router.get('/api/agence', agenceApiController.agenceListe);
router.post('/api/agence', agenceApiController.agenceAdd);
router.put('/api/agence/:idagence', agenceApiController.agenceUpdate);

module.exports = router;