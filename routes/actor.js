var express = require('express');
const asyncErrorHandler = require('../config/asyn-error-handler');
const { updateActor, getAllActors, getStreak } = require('../controllers/actors');
var router = express.Router();

// Routes related to actor.

// GET all actors
router.get('/', asyncErrorHandler(getAllActors))

// GET all actors by streak
router.get('/streak', asyncErrorHandler(getStreak))


// Update Actors Avatar URL
router.put('/', asyncErrorHandler(updateActor))


module.exports = router;