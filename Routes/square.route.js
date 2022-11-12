const router = require('express').Router();
const squareCtrl = require('../controllers/square.controller');
const {adminAuth} = require('../middleware/auth.middleware');


router.get('/', squareCtrl.allTreeSquare);
router.post('/create', adminAuth, squareCtrl.createSquare);



module.exports = router;
