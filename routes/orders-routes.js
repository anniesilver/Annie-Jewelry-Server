const router = require('express').Router();
const orderController = require('../controllers/orderController');
const userController = require('../controllers/userController');

router.route('/').post(userController.authorize,orderController.newOrder);
router.route('/:orderID/capture').post(orderController.confirmOrder);

module.exports = router;