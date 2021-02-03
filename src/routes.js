const router = require('express').Router();
const DealsController = require('./controllers/DealsController');
const OrderController = require('./controllers/OrderController');

router.get('/deals', DealsController.index);
router.get('/orders', OrderController.index);

module.exports = router;
