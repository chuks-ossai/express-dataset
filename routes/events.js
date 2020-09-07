var express = require('express');
var router = express.Router();

// Routes related to event
router.get('/', (req, res) => {
    res.status(200).json({Results: [], message: 'All event gotten successfully'})
})


module.exports = router;