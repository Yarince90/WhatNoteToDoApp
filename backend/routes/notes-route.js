const express = require('express');
const router = express.Router();
const { check } = require('express-validator')
const notesControllers = require('../controllers/notes-controllers');

// router.get('/', notesControllers.getNotes);

router.get('/user/:uid', notesControllers.getNotesByUserId)

router.post(
    '/addNote', 
    [
        check('title').isLength({max: 16}), 
        check('content').not().isEmpty()
    ],
    notesControllers.createNote
);

router.patch(
    '/user/:nId',
    [
        check('title').isLength({max: 16}), 
        check('content').not().isEmpty()
    ],
    notesControllers.editNote
)

router.delete('/user/:nId', notesControllers.deleteNote);

module.exports = router;