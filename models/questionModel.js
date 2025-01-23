// models/questionModel.js
const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
	question: { type: String, required: true },
	options: { type: [String], required: true },
	correctAnswer: { type: String, required: true },
	publishedDate: { type: Date, default: Date.now },
	updatedDate: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Question', questionSchema)
