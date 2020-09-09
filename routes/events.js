const express = require('express');
const asyncErrorHandler = require('../config/asyn-error-handler');
const { addEvent, getAllEvents, getByActor } = require('../controllers/events');
const router = express.Router();

// Routes related to event
router.get('/', asyncErrorHandler(getAllEvents))

// Add new event
router.post('/', asyncErrorHandler(addEvent))

// Get Event by ActorID
router.get('/actors/:actorID', asyncErrorHandler(getByActor))


module.exports = router;