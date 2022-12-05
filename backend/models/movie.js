const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    movie: { type: String, required: true },
    yearOfRelease: Number,
    duration: String, // en minutes,
    actors: String,
    poster: String, // lien vers une image d'affiche,
    boxOffice: String, // en USD$,
    rottenTomatoesScore: String
}, {
    timestamps: true
});

const Movies = mongoose.model("Movies", movieSchema);

module.exports = Movies;