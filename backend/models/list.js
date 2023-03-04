const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = new Schema({
    title: { type: String, required: true },
    items: [{type: mongoose.Types.ObjectId, required: false, ref: 'Item'}],
    creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }
});

module.exports = mongoose.model('List', listSchema);