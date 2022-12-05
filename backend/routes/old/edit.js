const express = require('express');
const axios = require('axios');

const_ = require('lodash');

const router = express.Router();
const activityController = require("../controllers/activity");

const activities = [];

router.get('/', activityController.findAll);

router.get('/:id', activityController.findOne);

router.put('/', activityController.addActivity);

router.delete('/:id', activityController.deleteOne);

router.post('/:id', activityController.modifyActivity);

module.exports = router;