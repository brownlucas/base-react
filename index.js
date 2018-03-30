/**
 * Created by brownlg on 30/03/18.
 */

/*
Start database:
 sudo mongod --dbpath ./dbData


 */

/*
 * Module dependencies
 */

// Node Modules:
var   express   = require('express')
    , stylus    = require('stylus')
    , nib       = require('nib')
    , MongoClient = require('mongodb').MongoClient
    , assert    = require('assert');

// Custom routes:
var DbOps = require('./dbOperations/dbOperations.js');



const app = express();

function compile(str, path) {
    return stylus(str)
        .set('filename', path)
        .use(nib())
}

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(stylus.middleware(
    { src: __dirname + '/public'
        , compile: compile
    }
));

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.render('index',
        { title : 'Home' }
    )
});

var url = 'mongodb://localhost:27017';
var myDb = null;

// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");

     myDb = db.db('test');

    // db.close();
});

app.get('/set', function (req, res) {
    var dbOps = new DbOps(myDb);
    console.log(dbOps.addData());

    res.render('index',
        { title : 'Home' }
    )
});



app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});