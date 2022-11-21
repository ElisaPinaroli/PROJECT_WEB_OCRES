const mongoose = require("mongoose");
//cree model de BDD
const PostsModel = mongoose.model(
    "nodeapi",
    {
        author : {
            type : String,
            required : true
        },
        message : {
            type : String,
            required : true
            },
        date :{
            type : Date,
            default : Date.now
        }
    },
    "posts" //table
);

module.exports = {PostsModel}; //acces a postsmodel depuis toute l'appli
