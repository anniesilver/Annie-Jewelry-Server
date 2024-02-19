

const router = require('express').Router();
const userController = require('../controllers/userController');


router.route('/login').post(userController.userLogin);
router.route('/signup').post(userController.userSignup);

router.route('/profile').get(userController.authorize, userController.userProfile);

module.exports = router;