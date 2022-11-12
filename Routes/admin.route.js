const router = require('express').Router();
const adminCtrl = require('../controllers/admin.controller');


router.get('/', adminCtrl.getHomePage);


module.exports = router;
