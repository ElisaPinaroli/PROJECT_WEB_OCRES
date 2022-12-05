const mongoose = require('mongoose');
const axios = require('axios');

const Movies = require('../models/movie');

exports.findAll = (req, res) => {
    Movies.find({}).then((movies) => {
        // Get List of movie and return JSON
        res.status(200).json({ movies });
    })
}

exports.findOne = (req, res) => {
    const { id } = req.params;

    // Find movie which has [id] name in DB
    Movies.findOne({ movie: id })
        .then(movie => {
            if (movie) {
                // Return movie
                res.status(200).json({
                    message: 'movie found!',
                    movie
                });
            } else {
                res.status(404).json({
                    message: `movie ${id} not found!`
                });
            }
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: 'Movie not found with id' + req.paramas.movieId
                });
            }

            return res.status(500).send({
                message: 'Error retrieving movie with id' + req.paramas.movieId
            });
        })
}

exports.addMovie = (req, res) => {
    // Get the data from request from request
    const { movie } = req.body;
    console.log({ movie });
    const url = `http://www.omdbapi.com/?i=tt3896198&apikey=94da689c&t=${movie}`;

    // Make a request for a movie
    axios.get(url)
        .then((data) => {
            // handle success
            if (data.data) {
                const { Title, Year, Runtime, Actors, Poster, BoxOffice, Ratings } = data.data;
                const newMovie = {
                    // _id: _.uniqueId(), // Fait par Mongodb
                    movie: Title,
                    yearOfRelease: Year,
                    duration: Runtime, // en minutes,
                    actors: Actors,
                    poster: Poster, // lien vers une image d'affiche,
                    boxOffice: BoxOffice, // en USD$,
                    rottenTomatoesScore: Ratings && Ratings[1].Value
                }

                Movies.create(newMovie).then(movie => {
                    console.error(movie);
                    if (movie) {
                        // Return validation message
                        res.status(200).json({
                            message: `Just added ${Title}`,
                            movie: { newMovie },
                        });
                    }
                }).catch(error => {
                    res.status(404).json({
                        theerror: error,
                    });
                });

            } else {
                res.status(404).json({
                    message: `Movie not found`
                });
            }
        })
        .catch(function(error) {
            // handle error
            res.json({
                error,
                movie: Movies
            });
        });
}

// Pas testé
exports.deleteOne = (req, res) => {
    // Get the :id of the movie we want to delete from the params of the request
    const { id } = req.params;
    console.log(req.params)
    Movies.deleteOne({ _id: id }).then((movie) => {
        res.status(200).json({
            movie,
            message: `${movie} deleted !`
        });
    }).catch(() => {
        res.status(404).json({
            message: `Movie not found !`
        });
    })
}

// Pas testé
exports.modifyFilm = (req, res) => {
    // Get the :id of the movie we want to update from the params of the request
    const { id } = req.params;
    // Get the new data of the movie we want to update from the body of the request
    const { movie } = req.body;


    Movies.findByIdAndUpdate(id, {...movie }).then(() => {
        // Return message
        res.json({
            message: `Movie updated: ${movie}`
        });
    });
}