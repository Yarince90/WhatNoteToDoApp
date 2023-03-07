const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const listsControllers = require('../controllers/toDoList-controller');


router.get('/user/:uid', listsControllers.getLists);

router.post(
    '/addList',
    [
        check('title').not().isEmpty()
    ],
    listsControllers.createList
);

router.delete('/user/:lid', listsControllers.deleteList);

module.exports = router;