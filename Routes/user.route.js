const router = require('express').Router();
const userCtrl = require('../controllers/user.controller');
const authController = require('../controllers/auth.controller');
const {requireAuth} = require('../middleware/auth.middleware');


//auth

router.post('/register', authController.signUp)
router.post("/login", authController.signIn);
router.get('/logout', authController.logout);

//users

router.get('/all', userCtrl.getAllUser);
router.get('/:id', requireAuth, userCtrl.getUser);
router.patch('/update/:id', requireAuth, userCtrl.updateUser);
router.delete('/delete/:id', requireAuth, userCtrl.deleteUser);


module.exports = router;
