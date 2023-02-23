const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const Note = require('../models/note');
const User = require('../models/user')
const HttpError = require('../models/http-errors');

//Get all notes
const getNotes = async (req, res, next) => {
    let notes;
    try {
        notes = await Note.find();
    } catch (err) {
        const error = new HttpError(
            'Failed to get all notes.', 500
          );
          return next(error);
    }
    res.json({notes: notes.map(note => note.toObject({getters: true}))});
}

//Create new note
const createNote = async (req, res, next) => {
    const {title, content, creator } = req.body;
    const errors = validationResult(req);

    //Check for errors
    if (!errors.isEmpty()) {
        return next(
          new HttpError('Invalid data was entered.', 422)
        );
        }

    const createdNote = new Note ({
        title,
        content,
        creator
    })

    //Look for current active user
    let user;
    try {
        user = await User.findById(creator);
    } catch (err) {
        const error = new HttpError(
            'Unable to create note -From find by ID', 500
          );
          return next(error);
    }

    if (!user) {
        const error = new HttpError('Could not create note --Unable to locate user for provided Id.', 404);
        return next(error);
      }

      try {
        const session = await mongoose.startSession();
        session.startTransaction();

        await createdNote.save({session: session});
        user.notes.push(createdNote);
        
        await user.save({ session: session });
        await session.commitTransaction();


      } catch (err) {
        console.log(err);
        const error = new HttpError(
            'Unable to create note -From save to user.', 500
          );
          return next(error);
      }

    res.status(201).json(createdNote);
}

exports.getNotes = getNotes;
exports.createNote = createNote;