const mongoose = require("mongoose");

const touristeSchema = new mongoose.Schema({
    continent: { type: String, required: true },
    tauxTouriste: { type: Number, required: true },
});

const Touristes = mongoose.model("Touristes", touristeSchema);

module.exports = Touristes;