const router = require('express').Router();
const treeCtrl = require('../controllers/tree.controller');
const {requireAuth} = require('../middleware/auth.middleware');


router.post('/create', requireAuth, treeCtrl.createTree);

module.exports = router;
