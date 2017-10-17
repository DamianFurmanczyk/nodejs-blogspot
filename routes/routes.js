const express = require('express');
const passport = require('passport');
const router = express.Router();

const mainC = require('../controllers/mainController');

// uwaga plan: zamiast async await -response jako middleware/endware ktore albo
// responsuje albo nextuje z errorem

router.get('/', mainC.getHomepage);

module.exports = router;