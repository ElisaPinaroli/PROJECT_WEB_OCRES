const mongoose = require('mongoose');
const axios = require('axios');

const Events = require('../models/parisEvents');

exports.findAll = (req, res) => {
    Events.find({}).then((events) => {
        // Get List of event and return JSON
        res.status(200).json({ events });
    })
}

exports.findOne = (req, res) => {
    const { id } = req.params;

    // Find event which has [id] name in DB
    Events.findOne({ event: id })
        .then(event => {
            if (event) {
                // Return event
                res.status(200).json({
                    message: 'event found!',
                    event
                });
            } else {
                res.status(404).json({
                    message: `event ${id} not found!`
                });
            }
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: 'event not found with id' + req.paramas.eventId
                });
            }

            return res.status(500).send({
                message: 'Error retrieving event with id' + req.paramas.eventId
            });
        })
}

exports.addEvent = (req, res) => {
    // Get the data from request from request
    const { event } = req.body;
    console.log({ event });
    const url = `https://opendata.paris.fr/api/records/1.0/search/?dataset=que-faire-a-paris-&q=${event}`;

    // Make a request for a event
    axios.get(url)
        .then((response) => {
            // handle success
            if (response.data.records[0].fields) {
                const { title, cover_url, audience, lead_text, address_street, address_zipcode, address_city, price_type, price_detail } = response.data.records[0].fields;
                const newevent = {
                    // _id: _.uniqueId(), // Fait par Mongodb
                    event: title,
                    Street: address_street,
                    CP: address_zipcode,
                    City: address_city,
                    poster: cover_url, // lien vers une image d'affiche,
                    audience: audience,
                    description: lead_text,
                    modality: price_type,
                    fourchettePrix: price_detail
                }

                Events.create(newevent).then(event => {
                    console.error(event);
                    if (event) {
                        // Return validation message
                        res.status(200).json({
                            message: `Just added ${title}`,
                            event: { newevent },
                        });
                    }
                }).catch(error => {
                    res.status(404).json({
                        theerror: error,
                    });
                });

            } else {
                res.status(404).json({
                    message: `event not found`
                });
            }
        })
        .catch(function(error) {
            // handle error
            res.json({
                error,
                events: Events
            });
        });
}

// Pas testé
exports.deleteOne = (req, res) => {
    // Get the :id of the event we want to delete from the params of the request
    const { id } = req.params;
    console.log(req.params)
    Events.deleteOne({ _id: id }).then((event) => {
        res.status(200).json({
            event,
            message: `${event} deleted !`
        });
    }).catch(() => {
        res.status(404).json({
            message: `Event not found !`
        });
    })
}

// Pas testé
exports.modifyEvent = (req, res) => {
    // Get the :id of the event we want to update from the params of the request
    const { id } = req.params;
    // Get the new data of the event we want to update from the body of the request
    const { event } = req.body;


    Events.findByIdAndUpdate(id, {...event }).then(() => { // Return message
        res.json({
            message: `Event updated: ${event}`
        });
    })
};