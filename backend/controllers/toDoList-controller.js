const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const List = require('../models/list');
const User = require('../models/user');
const HttpError = require('../models/http-errors');

//Get To-Do List by user id
const getLists = async (req, res, next) => {
    const userId = req.params.uid;
    let userLists;

    try{
        userLists = await List.find({ creator: userId });
    }catch(err){
        const error = new HttpError(
            'Unable to fetch Lists.', 500
          );
          return next(error);
    }

    res.json({ userLists });
}

//Create To-Do List
const createList = async (req, res, next) => {
    const {title, items, creator} = req.body;
    const errors = validationResult(req);

    
    //Check for errors
    if (!errors.isEmpty()) {
        return next(
          new HttpError('Invalid data was entered.', 422)
        );
        }

    const createdList = new List({
        title,
        items,
        creator
    })

    //Look for current active user
    let user;
    try {
        user = await User.findById(creator);
    } catch (err) {
        const error = new HttpError(
            'Unable to create List -From find user by ID', 500
          );
          return next(error);
    }

    if (!user) {
        const error = new HttpError('Could not create List --Unable to locate user for provided Id.', 404);
        return next(error);
      }

    //Attempt to create new List
    try {
        const session = await mongoose.startSession();
        session.startTransaction();

        await createdList.save({ session: session })
        user.lists.push(createdList);

        await user.save({ session: session })
        await session.commitTransaction();

    } catch (err){
        console.log(err);
        const error = new HttpError(
          'Unable to create List -From save to user.', 500
        );
        return next(error);
    }

    res.status(201).json(createdList);
}

exports.createList = createList;
exports.getLists = getLists;