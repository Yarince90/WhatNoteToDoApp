const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const HttpError = require('../models/http-errors');

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
        password: hashedPassword,
        notes: []
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
    .json({userId: createUser.id, email: createUser.email, token: token});
}

//Look for user
const logIn = async (req, res, next) => {
    const { email, password } = req.body;

    //Look for existing user
    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });
    } catch (err) {
        const error = new HttpError(
            'Logging in failed, please try again later.', 500
            );
            return next(error);
    }

    if (!existingUser) {
        const error = new HttpError(
            'Invalid username or password', 403
          );
          return next(error);
    }

    //Compare entered password
    let correctPassword = false
    try  {
        correctPassword = await bcrypt.compare(password, existingUser.password);
    } catch (err) {
        const error = new HttpError(
          'Logging in failed, please try again later.', 500
        );
        return next(error);
      }

      if (!correctPassword) {
        const error = new HttpError(
            'Invalid username or password.', 403
          );
          return next(error);
      }

      //create Token
      let token;
      try {
        token = jwt.sign(
            { userId: existingUser.id, email: existingUser.email},
            'SuperSecretCode_DO_NOT_SHARE',
            {   expiresIn: '1h' }
        );
      } catch (err) {
        const error = new HttpError(
          'Logging in failed, please try again later.', 500
        );
        return next(error);
      }

      //Server response
    res.status(201)
    .json({userId: existingUser.id, email: existingUser.email, token: token});
}

exports.logIn = logIn;
exports.register = register;