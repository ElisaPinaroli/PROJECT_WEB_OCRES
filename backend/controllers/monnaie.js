const mongoose = require('mongoose');
const axios = require('axios');

const Monnaies = require('../models/monnaie');

exports.findAll = (req, res) => {
    Monnaies.find({}).then((monnaies) => {
        // Get List of monnaie and return JSON
        res.status(200).json({ monnaies });
    })
}

exports.findOne = (req, res) => {
    const { id } = req.params;

    // Find monnaie which has [id] name in DB
    Monnaies.findOne({ monnaie: id })
        .then(monnaie => {
            if (monnaie) {
                // Return monnaie
                res.status(200).json({
                    message: 'monnaie found!',
                    monnaie
                });
            } else {
                res.status(404).json({
                    message: `monnaie ${id} not found!`
                });
            }
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: 'monnaie not found with id' + req.paramas.monnaieId
                });
            }

            return res.status(500).send({
                message: 'Error retrieving monnaie with id' + req.paramas.monnaieId
            });
        })
}

exports.addMonnaie = (req, res) => {
    // Get the data from request from request
    const { monnaie } = req.body;
    console.log({ monnaie });
    const url = `https://exchange-rates.abstractapi.com/v1/live=${monnaie}`;

    // Make a request for a monnaie
    axios.get(url)
        .then((data) => {
            console.log("data monnaie",data);
            // handle success
            if (data.data) {
                const {  target, base, api_key } = data.data;
                const newmonnaie = {
                    // _id: _.uniqueId(), // Fait par Mongodb
                    Target: target,
                    Base: base,
                    api_key: api_key
                }

                Monnaies.create(newmonnaie).then(monnaie => {
                    console.error(monnaie);
                    if (monnaie) {
                        // Return validation message
                        res.status(200).json({
                            message: `Just added ${base}`,
                            monnaie: { newmonnaie },
                        });
                    }
                }).catch(error => {
                    res.status(404).json({
                        theerror: error,
                    });
                });

            } else {
                res.status(404).json({
                    message: `monnaie not found`
                });
            }
        })
        .catch(function(error) {
            // handle error
            res.json({
                error,
                monnaies: Monnaies
            });
        });
}

// Pas testé
exports.deleteOne = (req, res) => {
    // Get the :id of the monnaie we want to delete from the params of the request
    const { id } = req.params;
    console.log(req.params)
    Monnaies.deleteOne({ _id: id }).then((monnaie) => {
        res.status(200).json({
            monnaie,
            message: `${monnaie} deleted !`
        });
    }).catch(() => {
        res.status(404).json({
            message: `monnaie not found !`
        });
    })
}

// Pas testé
exports.modifyMonnaie = (req, res) => {
    // Get the :id of the monnaie we want to update from the params of the request
    const { id } = req.params;
    // Get the new data of the monnaie we want to update from the body of the request
    const { monnaie } = req.body;


    Monnaies.findByIdAndUpdate(id, {...monnaie }).then(() => { // Return message
        res.json({
            message: `monnaie updated: ${monnaie}`
        });
    })
};