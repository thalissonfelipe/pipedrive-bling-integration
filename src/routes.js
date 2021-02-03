const router = require('express').Router();
const DealsController = require('./controllers/deals.controller');
const OrderController = require('./controllers/order.controller');

router.get('/deals', DealsController.index);
router.get('/orders', OrderController.index);

module.exports = router;
