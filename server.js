var express = require("express");
var app = express();
var fs = require("fs");
var path = require("path");
var mongoose = require("mongoose");

app.use(express.static(path.join(__dirname.concat("/public"))));
app.use(express.static("bower_components"));

mongoose.connect("mongodb://localhost:27017/e:\mongodb\data\database\myproject");

//base request
app.get("/", function(request, response){
    response.sendFile(path.join(__dirname.concat("/index.html")));
})
//request handler
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