var express = require('express');
var bodyparser = require('body-parser');
var cors =  require('cors');
var path = require('path');
var mongoose = require('mongoose');
const  route = require('./routers/route');
const { mongo } = require('mongoose');

const app = express();
const port = 2000;

app.use(bodyparser.json());
app.use(cors()); // middlewire

app.use('/api',route);
app.get('/',(req, res)=>{
    res.send("It`s Worked");
});

// monmgodb connection
mongoose.connect("mongodb://localhost:27017/contacts");

mongoose.connection.on('connected',()=>{
    console.log("Connected MongoDb");
});
mongoose.connection.on('error',(error)=>{
    console.log("Database not connected:"+error);
});


app.listen(port,()=>{
    console.log("Server is  running on port: "+port);
});