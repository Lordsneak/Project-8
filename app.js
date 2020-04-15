const express = require('express')
const app = express()
const path = require('path')
var mysql = require('mysql')
var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({
    extended: false
})

const port = 1337
// connection mysql

const connection = mysql.createConnection({
    //user connection
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ismydata'

});

connection.connect(function (error) {
    //condition connect
    if (!!error) {
        console.log('Failed to connect :(');
    } else {
        console.log('Connected :D');
    }

});
// use EJS

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// import ext file ex : Style.css

app.use(express.static(path.join(__dirname, 'public')));

// Render PAGES
app.get("/", (req, res) => {
    res.render('index')
});
app.get("/citation", (req, res) => {
    res.render('citation')
});
app.get("/auteur", (req, res) => {
    res.render('auteur')
});
//  GET API DATA
app.get('/citation/:id', (req, res) => {
    connection.query('SELECT * FROM citation WHERE id = ?', [req.params.id], (error, rows, fields) => {
        if (!!error) {
            console.log("ID NOT FOUND")
        } else {
            console.log(rows);
        }
    })
});
app.get('/auteur/:id', (req, res) => {
    connection.query('SELECT * FROM auteur WHERE id = ?', [req.params.id], (error, rows, fields) => {
        if (error) {
            console.log("ID NOT FOUND")
        } else {
            console.log(rows);
        }
    })
});
//POST Data

app.post("/", urlencodedParser, (req, res) => {
    let postData = {
        text: req.body.text,
        source: req.body.source,
        id_auteur: req.body.id_auteur
    }
    let postData2 = {
        id: req.body.id_auteur,
        nom: req.body.nom
    }
    let sql = "INSERT INTO citation SET ?"
    let sql2 = "INSERT INTO auteur SET ?"
    connection.query(sql, postData, (error, result) => {
        if (error) {
            console.log("Your Data Not Submited , TRY AGAIN");
        } else {
            console.log("Successfully");
        }

    })
    connection.query(sql2, postData2, (error, result) => {
        if (error) {
            console.log("Your Data Not Submited , TRY AGAIN");
        } else {
            console.log("Successfully")
        }

    })
    res.redirect('/')
});
//UPDATE DATA


//Delete Data
app.get("/del-citation/:id", (req, res, next) => {

    connection.query('DELETE FROM citation WHERE id = ?', [req.params.id], (error, result) => {
        if (!!error) {
            console.log("Citation Data not Deleted");
            next()
        }
        console.log("Citation Data Deleted Successfully");
        next()
    });
})
app.get("/del-auteur/:id", (req, res, next) => {

    connection.query('DELETE FROM auteur WHERE id = ?', [req.params.id], (error, result) => {
        if (!!error) {
            console.log("Auteur Data not Deleted");
            next()
        }
        console.log("Auteur Data Deleted Successfully");
        next()
    });
})


// START SERVER
app.listen(port, function () {
    console.log(`listening on port ${port}...`)
});