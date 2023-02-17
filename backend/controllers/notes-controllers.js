const getNotes = (req, res, next) => {
    console.log('Connected to Notes!')
}

const getNotesById = (req, res, next) => {

}

const createNote = (req, res, next) => {
    const {title, content, creator} = req.body;

    const createdNote = {
        title,
        content,
        creator
    }

    newNote.push(createdNote);
    res.status(201).json(createdNote);
}

exports.getNotes = getNotes;
exports.getNotesById = getNotesById;
exports.createNote = createNote;