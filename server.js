let express = require('express'); //appel l'express
let app = express(); //nommé app utilisant express

let bodyParser = require('body-parser'); //pour gerer les req. POST
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

var session = require('express-session');

app.use(session({
    secret : 'my secret',
    resave : false,
    saveUninitialized : false
}));

//var cookieParser = require ('cookie-Parser')
//app.use(cookieParser())
//app.use(cookieParser());

app.all('/*', function(req, res, next) {
    //CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-type, Accept,X-Access-Token,X-Key');
    if(req.method== 'OPTIONS') {res.status(200).end();
    }
    else { next();}
});

app.get('/public/style.css', function (req, res) {
    res.sendFile(__dirname + '/public/style.css');
});

//Import routes
let router = require('./routes');
app.use('/', router);

var port = 8080
app.listen(port, function () { console.log('Running server on port ' + port); })