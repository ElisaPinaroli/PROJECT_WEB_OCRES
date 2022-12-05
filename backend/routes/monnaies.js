const express = require('express');

// Lodash utils library
const _ = require('lodash');

const router = express.Router();
const monnaieController = require("../controllers/monnaie");


const monnaies = [];

/* GET events listing. */
router.get('/', monnaieController.findAll);


/* GET one event. */
router.get('/:id', monnaieController.findOne);


/* PUT new event. */
router.put('/', monnaieController.addMonnaie);

/* DELETE event. */
router.delete('/:id', monnaieController.deleteOne);

/* UPDATE event. */
router.post('/:id', monnaieController.modifyMonnaie);

module.exports = router;