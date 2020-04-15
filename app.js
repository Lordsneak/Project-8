const express = require('express')
const app = express()
const path = require('path')
const mysql = require('mysql')

const port = 1337
// connection mysql

const connection = mysql.createConnection({
    //user connection
    host:'localhost',
    user : 'root',
    password : '',
    database : 'ismydata'

});

connection.connect(function(error){
    //condition connect
    if(!!error) {
        console.log('Failed to connect :(');
    } else {
        console.log('Connected :D');
    }

});
// use EJS

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// import ext file

app.use(express.static(path.join(__dirname, 'public')));

// GET data
app.get("/", (req,res) => {
    res.render('index')
});
app.get("/citation", (req,res) => {
    res.render('citation')
});
app.get("/auteur", (req,res) => {
    res.render('auteur')
});
//POST Data
app.post("/", (res, req) => {

});
app.post("/citation", (res, req) => {

});
app.post("/auteur", (res, req) => {

});

app.listen(port, function() {
    console.log(`listening on port ${port}...`)
});
