const { newOrder } = require('../controllers/order.controller');
const router = require('express').Router();


router.post('/create', newOrder);


module.exports = router;
