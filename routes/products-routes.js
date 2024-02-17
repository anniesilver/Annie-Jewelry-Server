const router = require('express').Router();
const productsController = require('../controllers/productsController');

router.route('/li').get(productsController.productList);
router.route("/:id").get(productsController.productById);
router.route("/:id").post(productsController.productById);
router.route("/ts/:limit").get(productsController.productBySold);
router.route("/ct/:category_id").get(productsController.productByCategory);
router.route("/cl/:collection_id").get(productsController.productByCollection);

module.exports = router;