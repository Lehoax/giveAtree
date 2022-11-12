const router = require('express').Router();
const auth = require('../middleware/auth.middleware');
const adminCtrl = require('../controllers/admin.controller');


router.get('/', adminCtrl.getHomePage);


module.exports = router;
