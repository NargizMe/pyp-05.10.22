const express = require('express');
const mongoose = require('mongoose');
const {Schema} = mongoose
const server = express();
const bodyParser = require('body-parser');
const cors = require('cors');

mongoose.connect("mongodb+srv://codeacademy:codeacademy@pyp-crud.eaozgxf.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true }, () => {
    console.log('mongo success');
});

server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())
server.use(cors())

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    birthDay: String,
    email: String
})

const User = mongoose.model('User', userSchema);


const getUsers = (req, res) => {
    User.find({}, (err, docs) => {
        if(!err){
            res.json(docs);
        }
        else{
            res.status(313).json(err);
        }
    })
}


const getUser = (req, res) => {
    let id = req.params.id;

    User.findById(id, (err, doc) => {
        if(!err){
            if(doc){
                res.json(doc);
            }
            else{
                res.status(404).json();
            }
        }
        else{
            res.status(313).json(err);
        }
    })
}

const deleteUser = (req, res) => {
    let id = req.params.id;

    User.findByIdAndDelete(id, (err, doc) => {
        if(!err){
            res.json({"message": "User deleted"});
        }
        else{
            res.status(313).json(err);
        }
    })

}


const changeUser = (req, res) => {
    let id = req.params.id;

    User.findByIdAndUpdate(id, req.body, (err, doc) => {
        if(!err){
            res.json({"message": "User changed"});
        }
        else{
            res.status(313).json(err);
        }
    })
}

const addUser = (req, res) => {
    let person = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthDay: req.body.birthDay,
        email: req.body.email,
    });

    person.save();
    res.send("User added");
}

server.get("/getUsers", getUsers);
server.get("/getUser/:id", getUser);
server.put("/changeUser/:id", changeUser);
server.post("/addUser", addUser);
server.delete("/deleteUser/:id", deleteUser);

server.listen(8080, () => {
    console.log("I'm listening... Tell me about your traumas");
})

