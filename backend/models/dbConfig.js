//const mongoose permet de connaitre toutes methode du paquet
const mongoose = require('mongoose');

//se connecter a BDD
mongoose.connect(
    "mongodb://localhost:27017/nodeapi",
    { useNewUrlParser: true, useUnifiedTopology: true, family : 4,},
    (err) => {
        if(!err) console.log("mongodb connected");
        else console.log("connection err :" + err);
    }
)