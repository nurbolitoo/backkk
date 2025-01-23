const Question = require('../models/quizModel')

// Создание вопроса
exports.createQuestion = async (req, res) => {
	try {
		const { questionText, type, options, correctAnswer } = req.body

		const question = new Question({
			questionText,
			type,
			options,
			correctAnswer,
		})
		await question.save()
		res.status(201).json(question)
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
}

// Получение всех вопросов
exports.getAllQuestions = async (req, res) => {
	try {
		const questions = await Question.find()
		res.json(questions)
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
}

// Получение вопроса по id
exports.getQuestionById = async (req, res) => {
	try {
		const question = await Question.findById(req.params.id)
		if (!question) {
			return res.status(404).json({ message: 'Question not found' })
		}
		res.json(question)
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
}

// Обновление вопроса
exports.updateQuestion = async (req, res) => {
	try {
		const updatedQuestion = await Question.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
		)
		if (!updatedQuestion) {
			return res.status(404).json({ message: 'Question not found' })
		}
		res.json(updatedQuestion)
	} catch (err) {
		res.status(400).json({ message: err.message })
	}
}

// Удаление вопроса
exports.deleteQuestion = async (req, res) => {
	try {
		const deletedQuestion = await Question.findByIdAndDelete(req.params.id)
		if (!deletedQuestion) {
			return res.status(404).json({ message: 'Question not found' })
		}

		res.json({ message: 'Question deleted' })
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
}
