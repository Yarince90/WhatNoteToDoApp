const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const usersController = require('../controllers/users-controller');

router.get('/', usersController.getUser);

router.post(
    '/register',
    [
        check('userName').not().isEmpty(),
        check('password').not().isEmpty()
    ],
    usersController.register
);

module.exports = router;