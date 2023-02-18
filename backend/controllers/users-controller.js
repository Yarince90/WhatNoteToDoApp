const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const HttpError = require('../models/http-errors');

//get All users
const getUser = (req, res, next) => {
console.log('Connected to users!')
}

//Log user into account
const logIn = (req, res, next) => {

}

//Create user account
const register = async (req, res, next) => {
    const { userName, email, password } = req.body;
    const errors = validationResult(req);

    //Check for errors
    if (!errors.isEmpty()) {
        return next(
          new HttpError('Invalid data was entered.', 422)
        );
        }
    

    //Check for existing user by email
    let existingUser;
    try {
        existingUser = await User.findOne({ email });
    } catch(err) {
        const error = new HttpError(
            'User already exists.', 422
          );
          return next(error);
    }

    //Hash Password
    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, 12);
    } catch(err) {
        const error = new HttpError(
            'Error creating user. Please try again', 500
          );
          return next(error);
    }


    //Create new user
    const createUser = new User ({
        email,
        userName,
        password: hashedPassword
    });

   try {
    await createUser.save()
   }catch (err){
    const error = new HttpError(
        'Registration failed', 500
    );
    return next(error);
   }

   //Create login token 
   let token;
   try {
    token = jwt.sign(
        {   userId: createUser.id, email: createUser.email  },
        'SuperSecretCode_DO_NOT_SHARE',
        {   expiresIn: '1h' }
    )
   } catch (err) {
    const error = new HttpError(
      'Signing up failed, please try again later.',
      500
    );
    return next(error);
  }

    //Server response
    res.status(201)
    .json({userId: createUser.id, email: createUser.email, token: token})
}


exports.getUser = getUser;
exports.logIn = logIn;
exports.register = register;