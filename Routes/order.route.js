const { newOrder, getAll } = require('../controllers/order.controller');
const router = require('express').Router();


router.post('/create', newOrder);
router.get('/all', getAll);


module.exports = router;
