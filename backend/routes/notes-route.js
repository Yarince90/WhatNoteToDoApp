const express = require('express');
const router = express.Router();
const { check } = require('express-validator')
const notesControllers = require('../controllers/notes-controllers');


//get rid of get all notes 
router.get('/', notesControllers.getNotes);

router.get('/user/:uid', notesControllers.getNotesByUserId)

router.post(
    '/addNote', 
    [
        check('title').isLength({max: 16}), 
        check('content').not().isEmpty()
    ],
    notesControllers.createNote
);

module.exports = router;