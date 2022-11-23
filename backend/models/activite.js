const mongoose = require("mongoose");
const {Schema} = mongoose;

//cree model de BDD

const activiteSchema = new mongoose.Schema ({
    titre : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
        },
    prix :{
        type : String,
        required : true
    }
});

const Activites = mongoose.model("Activites",activiteSchema);
module.exports = Activites;

/*const Activite = mongoose.model(
    //"activites",
    {
        titre : {
            type : String,
            required : true
        },
        description : {
            type : String,
            required : true
            },
        prix :{
            type : String,
            required : true
        }
    },
    //"activiteData" //table
);*/

