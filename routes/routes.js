const express = require('express');
const passport = require('passport');
const router = express.Router();

const mainC = require('../controllers/mainController');
const usersC = require('../controllers/usersController');

// uwaga plan: zamiast async await -response jako middleware/endware ktore albo
// responsuje albo nextuje z errorem

router.get('/', mainC.getHomepage);

router.get('/register', usersC.gregister);
router.post('/register', usersC.valReg, usersC.register2DB, usersC.authUser);

router.get('/logout', usersC.logout);
router.get('/login', usersC.login);
router.post('/login', usersC.loginM, usersC.authUser);

module.exports = router;