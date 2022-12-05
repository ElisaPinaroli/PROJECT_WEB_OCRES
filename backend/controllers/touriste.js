const mongoose = require('mongoose');
const axios = require('axios');

const touristes = require('../models/touristes');

exports.findAll = (req, res) => {
    touristes.find({}).then((touristes) => {
        res.status(200).json({ touristes });
    })
}


exports.findOne = (req, res) => {
    const { id } = req.params;

    touristes.find({ touriste: id }).then(touriste => {
        if (touriste) {
            res.status(200).json({
                message: 'touriste found',
                touriste
            });
        } else {
            res.status(404).json({
                message: `touriste ${id} not found.`
            });
        }
    })
}

exports.addTouriste = (req, res) => {
    // Get the data from request from request
    console.log("dans addTouriste controllers")
    const { continent } = req.body;
    console.log("continent:", { continent }.continent);
    const url = `http://localhost:5500/touristes/${{continent}.continent}`;

    // Make a request for a tourist repartition
    axios.get(url)
        .then((response) => {
            console.log("response api: ", response)
                // handle success
            if (response.data) {
                const { continent, tauxTouriste } = response.data[0];
                const newTouriste = {
                    // _id: _.uniqueId(), // Fait par Mongodb
                    continent: continent,
                    tauxTouriste: tauxTouriste,
                }
                console.log("new touriste :", newTouriste)
                touristes.create(newTouriste).then(touriste => {
                    console.error("erreur creation touriste :", touriste);
                    if (touriste) {
                        // Return validation message
                        res.status(200).json({
                            message: `Just added ${touriste}`,
                            touriste: { newTouriste },
                        });
                    }
                }).catch(error => {
                    res.status(404).json({
                        theerror: error,
                    });
                });

            } else {
                res.status(404).json({
                    message: `Not found`
                });
            }
        })
        .catch(function(error) {
            // handle error
            res.json({
                error,
                touriste: touristes
            });
        });
}

exports.deleteOne = (req, res) => {
    // Get the :id of the movie we want to delete from the params of the request
    const { id } = req.params;

    touristes.deleteOne({ _id: id }).then((touriste) => {
        res.status(200).json({
            touriste,
            message: `${touriste} deleted !`
        });
    }).catch(() => {
        res.status(404).json({
            message: `Not found !`
        });
    })
}

exports.modifyTouriste = (req, res) => {
    // Get the :id of the movie we want to update from the params of the request
    const { id } = req.params;
    // Get the new data of the movie we want to update from the body of the request
    const { touriste } = req.body;


    touristes.findByIdAndUpdate(id, {...touriste }).then(() => {
        // Return message
        res.json({
            message: `Data updated: ${touriste}`
        });
    });
}