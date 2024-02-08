const router = require('express').Router();
const productsController = require('../controllers/productsController');

router.route('/').get(productsController.productList);
router.route("/:id").get(productsController.productById);
router.route("/:id").post(productsController.productById);


module.exports = router;