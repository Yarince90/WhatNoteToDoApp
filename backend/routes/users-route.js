const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const usersController = require('../controllers/users-controller');

router.post(
    '/register',
    [
        check('userName').not().isEmpty(),
        check('email').normalizeEmail().isEmail(),
        check('password').isLength({ min: 6 })
    ],
    usersController.register
);

router.post('/login', usersController.logIn);

module.exports = router;