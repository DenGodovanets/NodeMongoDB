var express = require('express');
var router = express.Router();

router.use('/books', require('./booksRoutes'));
router.use('/authors', require('./authorRoutes'));

module.exports = router;