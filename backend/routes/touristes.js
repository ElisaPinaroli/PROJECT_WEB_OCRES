const express = require('express');
const axios = require('axios');

const_ = require('lodash');

const router = express.Router();
const touristeController = require("../controllers/touriste");

const touristes = [];

router.get('/', touristeController.findAll);

router.get('/:id', touristeController.findOne);
router.put('/', touristeController.addTouriste);
/* DELETE event. */
router.delete('/:id', touristeController.deleteOne);

module.exports = router;