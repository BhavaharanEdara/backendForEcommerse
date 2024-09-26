const express = require('express');
const { isLoggedin, isAdmin } = require('../middlewares/authMiddleware');
const { getAllOrders, updateOrder } = require('../controller/orderController');
const router = express.Router();

router.route('/getOrders/').get(isLoggedin, isAdmin, getAllOrders);
router.route('/updateOrders/:id').put(isLoggedin, updateOrder);

module.exports = router;
