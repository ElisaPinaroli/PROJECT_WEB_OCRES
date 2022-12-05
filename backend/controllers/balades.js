const mongoose = require('mongoose');
const axios = require('axios');

const Balades = require('../models/balade');

exports.findAll = (req, res) => {
    Balades.find({}).then((balades) => {
        // Get List of balade and return JSON
        res.status(200).json({ balades });
    })
}

exports.findOne = (req, res) => {
    const { id } = req.params;

    // Find balade which has [id] name in DB
    Balades.findOne({ balade: id })
        .then(balade => {
            if (balade) {
                // Return balade
                res.status(200).json({
                    message: 'balade found!',
                    balade
                });
            } else {
                res.status(404).json({
                    message: `balade ${id} not found!`
                });
            }
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: 'balades not found with id' + req.paramas.baladeId
                });
            }

            return res.status(500).send({
                message: 'Error retrieving balades with id' + req.paramas.baladeId
            });
        })
}

exports.addBalade = (req, res) => {
    // Get the data from request from request
    const { balade } = req.body;
    console.log({ balade });
    const url = `https://opendata.paris.fr/api/records/1.0/search/?dataset=paris-autrement-balades-dans-les-arrondissements-peripheriques-poi&q=${balade}`;

    // Make a request for a balade
    axios.get(url)
        .then((response) => {
            // handle success
            if (response.data.records[0].fields) {
                const { nom_poi, adresse, code_postal, url_image, categorie, texte_intro } = response.data.records[0].fields;
                const newbalade = {
                    // _id: _.uniqueId(), // Fait par Mongodb
                    balade: nom_poi,
                    Street: adresse,
                    CP: code_postal,
                    poster: url_image, // lien vers une image d'affiche,
                    categorie: categorie,
                    description: texte_intro



                }

                Balades.create(newbalade).then(balade => {
                    console.error(balade);
                    if (balade) {
                        // Return validation message
                        res.status(200).json({
                            message: `Just added ${nom_poi}`,
                            balade: { newbalade },
                        });
                    }
                }).catch(error => {
                    res.status(404).json({
                        theerror: error,
                    });
                });

            } else {
                res.status(404).json({
                    message: `balade not found`
                });
            }
        })
        .catch(function(error) {
            // handle error
            res.json({
                error,
                balades: Balades
            });
        });
}

// Pas testé
exports.deleteOne = (req, res) => {
    // Get the :id of the balade we want to delete from the params of the request
    const { id } = req.params;
    console.log(req.params)
    Balades.deleteOne({ _id: id }).then((balade) => {
        res.status(200).json({
            balade,
            message: `${balade} deleted !`
        });
    }).catch(() => {
        res.status(404).json({
            message: `balade not found !`
        });
    })
}

// Pas testé
exports.modifyBalade = (req, res) => {
    // Get the :id of the balades we want to update from the params of the request
    const { id } = req.params;
    // Get the new data of the balades we want to update from the body of the request
    const { balade } = req.body;


    Balades.findByIdAndUpdate(id, {...balade }).then(() => { // Return message
        res.json({
            message: `balade updated: ${balade}`
        });
    })
};