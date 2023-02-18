const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const HttpError = require('../models/http-errors');


const getUser = (req, res, next) => {
console.log('Connected to users!')
}

const logIn = (req, res, next) => {

}

const register = async (req, res, next) => {
    const { userName, password } = req.body;

    const createUser = new User ({
        userName,
        password
    });

   try{
    await createUser.save()
   }catch (err){
    const error = new HttpError(
        'Registration failed', 500
    );
    return next(error);
   }

    res.status(201)
    .json({
        userName: createUser.userName,
        password: createUser.password
    })
}


exports.getUser = getUser;
exports.logIn = logIn;
exports.register = register;