var express = require('express');
var router = express.Router();
var usersCtrl = require('../controllers/users')

/* GET users listing. */

router.get('/login', usersCtrl.loginPage)


module.exports = router;