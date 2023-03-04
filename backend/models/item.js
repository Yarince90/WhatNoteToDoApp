const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: { type: String, required: true },
    creator: { type: mongoose.Types.ObjectId, required: true, ref: 'List' }
});

module.exports = mongoose.model('Item', itemSchema);