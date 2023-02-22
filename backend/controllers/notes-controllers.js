const { validationResult } = require('express-validator');
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
    const {title, content } = req.body;

    const createdNote = {
        title,
        content,
        creator: req.userData.userId
    }

    //Look for current active user
    let user;
    try {
        user = await User.findById(req.userData.userId);
    } catch (err) {
        const error = new HttpError(
            'Unable to create note', 500
          );
          return next(error);
    }

    if (!user) {
        const error = new HttpError('Could not create note --Unable to locate user.', 404);
        return next(error);
      }
    
      console.log(user);

      try {
        const session = await mongoose.startSession();
        session.startSession();

        await createdNote.save({session: session});
        user.notes.push(createdNote);
        await user.save({ session: session });
        await session.commitTransaction();
      } catch (err) {
        const error = new HttpError(
            'Unable to create note.', 500
          );
          return next(error);
      }

    res.status(201).json(createdNote);
}

exports.getNotes = getNotes;
exports.createNote = createNote;