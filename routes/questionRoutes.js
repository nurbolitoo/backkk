const express = require('express')
const router = express.Router()
const {
	createQuestion,
	getAllQuestions,
	getQuestionById,
	updateQuestion,
	deleteQuestion,
} = require('../controllers/questionController')

router.post('quiz', createQuestion) // Создание вопроса
router.get('quiz', getAllQuestions) // Получение всех вопросов
router.get('quiz:id', getQuestionById) // Получение вопроса по id
router.put('quiz:id', updateQuestion) // Обновление вопроса
router.delete('quiz:id', deleteQuestion) // Удаление вопроса

module.exports = router
