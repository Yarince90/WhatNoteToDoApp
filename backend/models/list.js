const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = new Schema({
    name: { type: String, required: true },
    items: [{type: mongoose.Types.ObjectId, required: false, ref: 'Item'}]
});

module.exports = mongoose.model('List', listSchema);