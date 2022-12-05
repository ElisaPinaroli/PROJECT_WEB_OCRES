const express = require('express');

// Lodash utils library
const _ = require('lodash');

const router = express.Router();
const eventController = require("../controllers/parisEvent");


const events = [];

/* GET events listing. */
router.get('/', eventController.findAll);


/* GET one event. */
router.get('/:id', eventController.findOne);


/* PUT new event. */
router.put('/', eventController.addEvent);

/* DELETE event. */
router.delete('/:id', eventController.deleteOne);

/* UPDATE event. */
router.post('/:id', eventController.modifyEvent);

module.exports = router;