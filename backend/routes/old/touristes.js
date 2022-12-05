const express = require('express');
const axios = require('axios');
// Lodash utils library
const _ = require('lodash');

const router = express.Router();

// Create RAW data array
let touristes = [];

// On insère un film initial
const touriste = "jsp koi ecrire";
//const url = `http://www.omdbapi.com/?i=tt3896198&apikey=94da689c&t=${touriste}`;

// Make a request for a movie
axios.get(url)
    .then(function(response) {
        // handle success
        if (response.data) {
               
                const {Continent, TauxTouristes} = response.data;

                touriste.push({
                id: _.uniqueId(),
                Continent: Continent,
                TauxTouristes: TauxTouristes
            });
        }
        console.log(touristes);
    });

// .../movies/
/* GET movies listing. */
router.get('/', (req, res) => {
    // Get List of movie and return JSON
    res.status(200).json({ touristes });
});

// .../movies/86
/* GET one movie. */
router.get('/:id', (req, res) => {
    const { id } = req.params;
    // Find movie in DB
    const movie = _.find(touristes, ["id", id]);

    if (movie) {
        // Return movie
        res.status(200).json({
            message: 'touriste found!',
            touriste
        });
    } else {
        res.status(404).json({
            message: 'touriste not found!'
        });
    }
});

// ..../movies/
/* PUT new movie. */
router.put('/', (req, res) => {
    // Get the data from request from request
    const { touriste } = req.body;

    const url = `http://localhost:8080/${touriste}`;

    // Make a request for a movie
    axios.get(url)
        .then((data) => {
            // handle success
            if (data.data) {
                const {Continent, TauxTouristes} = data.data;
                const newTouriste = {
                    id: _.uniqueId(),
                    
                        
                    Continent: Continent,
                    TauxTouristes: TauxTouristes
                }

                touristes.push(newTouriste);

                // Return validation message
                res.json({
                    message: `Just added ${TauxTouristes}`,
                    touriste: { newTouristes },
                });
            } else {
                res.json({
                    message: `touriste not found`
                });
            }
        })
        .catch(function(error) {
            // handle error
            res.json({ error });
        });
});

/* DELETE movie. */
router.delete('/:id', (req, res) => {
    // Get the :id of the movie we want to delete from the params of the request
    const { id } = req.params;

    // Remove from "DB"
    _.remove(touristes, ["id", id]);

    // Return message
    res.json({
        message: `Just removed ${id}`
    });
});

/* UPDATE movie. */
router.post('/:id', (req, res) => {
    // Get the :id of the movie we want to update from the params of the request
    const { id } = req.params;
    // Get the new data of the movie we want to update from the body of the request
    const { touriste } = req.body;
    // Find in DB
    const touristeToUpdate = _.find(touristes, ["id", id]);
    // Update data with new data (js is by address)
    touristeToUpdate.touriste = touriste;

    // Return message
    res.json({
        message: `Just updated ${id} with ${touriste}`
    });
});

module.exports = router;