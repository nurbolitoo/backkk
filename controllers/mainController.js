const Landmark = require('../models/landmarkModel')

exports.indexPage = async (req, res) => {
	console.log('User session:', req.session) // Логируем сессию
	const landmarks = await Landmark.find()
	landmarks.map(landmark => {
		landmark.pictures = landmark.pictures.map(picture => picture.substring(6))
		return landmark
	})
	const user = req.session.user
	const loggedIn = req.session.isLoggedIn
	let isAdmin = false
	if (loggedIn) {
		isAdmin = user.role === 'admin'
	}
	res.render('index', { user, isAdmin, loggedIn, landmarks })
}

exports.inRussianEmpirePage = async (req, res) => {
	res.render('inRussianEmpire')
}

exports.kazakhKhanatePage = async (req, res) => {
	res.render('kazakhKhanate')
}

exports.partOfUSSRPage = async (req, res) => {
	res.render('partOfUSSR')
}

exports.quizPage = async (req, res) => {
	console.log('User session:', req.session) // Логируем сессию
	const question = await Question.find()
	const user = req.session.user
	const loggedIn = req.session.isLoggedIn
	let isAdmin = false
	if (loggedIn) {
		isAdmin = user.role === 'admin'
	}
	res.render('quiz', { user, isAdmin, loggedIn, question })
}

exports.account = (req, res) => {
	const user = req.session.user
	const loggedIn = req.session.isLoggedIn
	if (loggedIn) {
		let isAdmin = false
		isAdmin = user.role === 'admin'
		res.render('account', { user, isAdmin, loggedIn })
	} else {
		res.redirect('/')
	}
}

exports.adminPage = (req, res) => {
	const user = req.session.user
	if (req.session.isLoggedIn) {
		if (user.role === 'admin') {
			return res.render('admin', { user })
		} else {
			return res.redirect('/')
		}
	} else {
		return res.redirect('/')
	}
}

exports.stockMarketAPI = (req, res) => {
	const user = req.session.user
	const loggedIn = req.session.isLoggedIn
	if (loggedIn) {
		let isAdmin = false
		isAdmin = user.role === 'admin'
		res.render('stockmarketapi', { user, isAdmin, loggedIn })
	} else {
		res.redirect('/')
	}
}

exports.newsAPI = (req, res) => {
	const user = req.session.user
	const loggedIn = req.session.isLoggedIn
	if (loggedIn) {
		let isAdmin = false
		isAdmin = user.role === 'admin'
		res.render('newsapi', { user, isAdmin, loggedIn })
	} else {
		res.redirect('/')
	}
}
