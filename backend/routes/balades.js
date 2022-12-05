const express = require('express');

// Lodash utils library
const _ = require('lodash');

const router = express.Router();
const baladeController = require("../controllers/balades");


const balades = [];

/* GET events listing. */
router.get('/', baladeController.findAll);


/* GET one event. */
router.get('/:id', baladeController.findOne);


/* PUT new event. */
router.put('/', baladeController.addBalade);

/* DELETE event. */
router.delete('/:id', baladeController.deleteOne);

/* UPDATE event. */
router.post('/:id', baladeController.modifyBalade);

module.exports = router;