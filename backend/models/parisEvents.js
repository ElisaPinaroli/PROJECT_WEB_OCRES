const mongoose = require("mongoose");


const eventSchema = new mongoose.Schema({
    event: { type: String, required: true },
    Street: String,
    CP: String,
    City: String,
    poster: String,
    audience: String,
    description: String,
    modality: String,
    fourchettePrix: String
})
const Events = mongoose.model("Events", eventSchema);

module.exports = Events;