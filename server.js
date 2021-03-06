var express = require("express");
var app = express();
var fs = require("fs");
var path = require("path");
var mongoose = require("mongoose");

//test
// var MongoClient = require("mongodb").MongoClient;
// MongoClient.connect("mongodb://localhost:27017/films_database", function(err, db){
//     if(err) throw err;
//     console.log("COnnection successfull");
//     db.collection("films").find().toArray(function(err, result){
//         if(err) throw err;
//         console.log(result);
//     });
// });

//static files to use in the project
app.use(express.static(path.join(__dirname.concat("/public"))));
app.use(express.static("bower_components"));
app.use(express.static("node_modules"));

//connect to database
mongoose.connect("mongodb://localhost:27017/films_database");
//make Schema to template data
var Schema = mongoose.Schema;
var filmSchema = new Schema({
    // id: {
    //     type: String,
    //     required: true,
    //     unique: true
    // },
    name: String,
    year: String,
    format: String,
    actors: [String],
    image: String
});
//filmSchema generate film id method
// filmSchema.methods.generateId = function(){
//     this.id = (Math.random() * 1000000).toString().slice(0, (Math.random() * 1000000).toString().indexOf(".")-1);
//     return this.id;
// };

//added only in the end when all properties and methods defined
var Film = mongoose.model("Film", filmSchema);
// make this available to our users in our Node applications (not required)
module.exports = Film;


//create film and save it to database

var film1 = new Film({
    name: "Rocky",
    year:"1976",
    actors:["Sylvester Stallone", "Talia Shire", "Burt Young"],
    image: "/img/rocky.jpg"
});
// film1.generateId();
// console.log(film1);
// film2.save(function(err){
//     if(err) throw err;
//     console.log("Film saved");
// });

Film.find({}, function(err, film){
    if(err) throw err;
    console.log(film);
    // film[0].image = "/img/rocky2.jpg";
    // film[0].save(function(err){
    //     if(err) throw err;
    //     console.log("Film successfully saved");
    // });
});


//base request
app.get("/", function(request, response){
    response.sendFile(path.join(__dirname.concat("/index.html")));
})
//request handler
.get("/all", function(request, response){
    var responseBody = [];
    Film.find({}, function(err, films){
        if(err) throw err;
        // console.log(films[0]);
        for(var i = 0; i < films.length; i++){
            responseBody.push(films[i]);
        }
        response.end(JSON.stringify(responseBody));
    });    
})
.get("/addFilm", function(request, response){
    console.log(request);
    var responseBody = {
        name: request.query.name,
        year: request.query.year
    }
    console.log(responseBody);
    response.end(JSON.stringify(responseBody));

}).listen(8080, function(){
    console.log("Server is running on 8080");
});