const express = require('express');
const router = express.Router();
const { check } = require('express-validator')
const notesControllers = require('../controllers/notes-controllers');



router.get('/', notesControllers.getNotes);

router.post('/', check('title').isLength({max: 16}) ,check('content').not().isEmpty(), notesControllers.createNote);




module.exports = router;