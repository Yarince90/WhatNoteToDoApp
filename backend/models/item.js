const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: {type: String, required: false},
    listName: {type: mongoose.Types.ObjectId, required: false, ref: 'List'}
})

module.exports = mongoose.model('Item', itemSchema);