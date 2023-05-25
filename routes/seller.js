const path = require('path');

const express = require('express');

const sellerController = require('../controllers/seller');

const router = express.Router();

router.get('/get-products', sellerController.getProducts);

router.post('/add-product', sellerController.postProduct);

router.delete('/delete-product/:id', sellerController.deleteProduct);

module.exports = router;