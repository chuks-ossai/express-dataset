var express = require('express');
const asyncErrorHandler = require('../config/asyn-error-handler')
const { eraseEvents } = require('../controllers/events');
var router = express.Router();

// Route related to delete events

// Routes related to event
router.delete('/', asyncErrorHandler(eraseEvents))

module.exports = router;