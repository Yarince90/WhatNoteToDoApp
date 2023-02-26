const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const Note = require('../models/note');
const User = require('../models/user')
const HttpError = require('../models/http-errors');

//Get all notes
// const getNotes = async (req, res, next) => {
//     let notes;
//     try {
//         notes = await Note.find();
//     } catch (err) {
//         const error = new HttpError(
//             'Failed to get all notes.', 500
//           );
//           return next(error);
//     }
//     res.json({notes: notes.map(note => note.toObject({getters: true}))});
// }

//Get Notes by user ID
const getNotesByUserId = async (req, res, next) => {
  const userId = req.params.uid;
  let userNotes;

  try{
    userNotes = await Note.find({ creator: userId });
  }catch(err){
    const error = new HttpError(
      'Unable to fetch notes.', 500
    );
    return next(error);
  }

  if(!userNotes || userNotes.length ===0){
    return next(
      new HttpError('Could not find Notes for the provided user id.', 404)
    );
  }
  res.json({ userNotes })
};


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
//editNote
const editNote = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid data was entered.', 422)
    );
  }

  const { title, content } = req.body;
  const noteId = req.params.nId;

  let note;
  try {
    note = await Note.findById(noteId);
  } catch(err) {
    const error = new HttpError(
      'Could not update note.', 500
    );
    return next(error);
  }

  note.title = title;
  note.content = content;

  try{
    await note.save();
  } catch(err) {
    const error = new HttpError(
      'Could not update note.', 500
    );
    return next(error);
  }

  res.status(200).json({ note: note.toObject({ getters: true })});
}

//Delete note
const deleteNote = async (req, res, next) => {
  const noteId = req.params.nId;

  let note;
  try{
    note = await Note.findById(noteId);
  } catch(err){
    const error = new HttpError(
      'Unable to delete note.', 500
    );
    return next(error);
  }

  try {
    await note.remove();
  } catch(err) {
    const error = new HttpError(
      'Unable to delete note.', 500
    );
    return next(error);
  }

  res.status(200).json({message: 'Note Deleted.'});
}

// exports.getNotes = getNotes;
exports.getNotesByUserId = getNotesByUserId;
exports.createNote = createNote;
exports.editNote = editNote;
exports.deleteNote = deleteNote;