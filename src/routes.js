const router = require('express').Router();
const DealsController = require('./controllers/DealsController');

router.get('/deals', DealsController.index);

module.exports = router;
