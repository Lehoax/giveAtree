const router = require('express').Router();
const treeCtrl = require('../controllers/tree.controller');
const {adminAuth} = require('../middleware/auth.middleware');


router.post('/create', adminAuth, treeCtrl.createTree);
router.get('/all', treeCtrl.allTreeNotPlaced);


module.exports = router;
