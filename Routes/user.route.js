const router = require('express').Router();
const userCtrl = require('../controllers/user.controller');
const authController = require('../controllers/auth.controller');


//auth

router.post('/register', authController.signUp)
router.post("/login", authController.signIn);
router.get('/logout', authController.logout);

router.get('/',userCtrl.getUsers);

module.exports = router;
