const router = require('express').Router();
const DealsController = require('./controllers/deals.controller');
const OrderController = require('./controllers/order.controller');
const HistoryController = require('./controllers/history.controller');

router.get('/deals', DealsController.index);
router.get('/orders', OrderController.index);
router.post('/orders/sync', OrderController.sync);
router.get('/histories', HistoryController.index);

module.exports = router;
