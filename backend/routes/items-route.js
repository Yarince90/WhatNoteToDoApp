const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const itemsController = require('../controllers/items-controller');


router.get('/user/:lid', itemsController.getItems);

router.post(
    '/addItem',
    [
        check('itemName').not().isEmpty()
    ],
    itemsController.createItem
);

router.delete('/user/:iid', itemsController.deleteItem);

module.exports = router;