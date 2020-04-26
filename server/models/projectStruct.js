const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const setStringType = (maxLength) => ({ type: String, required: true, maxlength: maxLength })

const projectSchema = new Schema({
    userId: setStringType(512),
    title: setStringType(256),
    description: setStringType(2048),
    tech: setStringType(50),
    language: setStringType(50),
    link: setStringType(512),
    images: { type: Schema.Types.Mixed},
    startDate: { type: Date, required: true},
    endDate: Date
});

module.exports = mongoose.model('Project', projectSchema);
