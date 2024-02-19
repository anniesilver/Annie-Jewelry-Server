const router = require('express').Router();
const orderController = require('../controllers/orderController');


router.route('/').post(orderController.newOrder);
router.route('/:orderID/capture').post(orderController.confirmOrder);

module.exports = router;