const mongoose = require("mongoose");


const baladeSchema = new mongoose.Schema({
    balade: { type: String, required: true },
    Street: String,
    categorie: String,
    CP: String,
    poster: String,
    description: String
    
})
const Balades = mongoose.model("Balades", baladeSchema);

module.exports = Balades;