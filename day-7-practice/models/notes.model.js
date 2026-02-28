
const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const noteModel = mongoose.model("notes",noteSchema);

module.exports = noteModel;