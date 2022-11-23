const express = require('express');
const axios = require('axios');
// Lodash utils library
const _ = require('lodash');

const router = express.Router();
const movieController = require("../controllers/movie");


const movies = [];
// .../movies/
/* GET movies listing. */
router.get('/', movieController.findAll);

// .../movies/86
/* GET one movie. */
router.get('/:id', movieController.findOne);

// ..../movies/
/* PUT new movie. */
router.put('/', movieController.addMovie);

/* DELETE movie. */
router.delete('/:id', movieController.deleteOne);

/* UPDATE movie. */
router.post('/:id', movieController.modifyFilm);

module.exports = router;
