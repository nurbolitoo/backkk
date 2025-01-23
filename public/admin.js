function createLandmark() {
	const title = document.getElementById('ctitle').value.trim()
	const description = document.getElementById('cdescription').value.trim()
	const pictures = document.getElementById('cpictures').files

	if (title === '' || description === '' || pictures.length === 0) {
		displayMessage('error', 'Please fill in all fields.')
		return
	}

	const formData = new FormData()
	formData.append('title', title)
	formData.append('description', description)
	for (let i = 0; i < pictures.length; i++) {
		formData.append('pictures', pictures[i])
	}

	fetch('/landmarks', {
		method: 'POST',
		body: formData,
	})
		.then(response => {
			if (!response.ok) {
				throw new Error('Failed to create blog post.')
			}
			return response.json()
		})
		.then(data => {
			console.log('New blog post created:', data)
			displayMessage('success', 'Blog post created successfully.')
		})
		.catch(error => {
			console.error('Error creating blog post:', error)
			displayMessage(
				'error',
				'Failed to create blog post. Please try again later.'
			)
		})
}

function readLandmark() {
	const blogId = document.getElementById('readId').value.trim()
	if (blogId === '') {
		displayMessage('error', 'Please fill in the field.')
		return
	}
	fetch(`/landmarks/${blogId}`)
		.then(response => {
			if (!response.ok) {
				throw new Error('Failed to fetch blog post.')
			}
			return response.json()
		})
		.then(data => {
			displayLandmark(data, 'readResult')
		})
		.catch(error => {
			console.error('Error: landmark is not found.', error)
			displayMessage('error', 'Landmark is not found.')
		})
}

function updateLandmark() {
	const id = document.getElementById('updateId').value.trim()
	const title = document.getElementById('updateTitle').value.trim()
	const description = document.getElementById('updateDescription').value.trim()
	const pictures = document.getElementById('updatePictures').files

	const data = {}

	if (title !== '') {
		data.title = title
	}
	if (description !== '') {
		data.description = description
	}

	if (pictures.length > 0) {
		data.pictures = pictures
	}

	fetch(`/landmarks/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})
		.then(response => {
			if (!response.ok) {
				throw new Error('Failed to update landmark.')
			}
			return response.json()
		})
		.then(data => {
			console.log('Landmark updated:', data)
			displayMessage('success', 'Landmark updated successfully.')
		})
		.catch(error => {
			console.error('Error updating landmark:', error)
			displayMessage(
				'error',
				'Failed to update landmark. Please try again later.'
			)
		})
}

function deleteLandmark() {
	const id = document.getElementById('deleteId').value.trim()
	fetch(`/landmarks/${id}`, {
		method: 'DELETE',
	})
		.then(response => {
			if (!response.ok) {
				throw new Error('Failed to delete landmark.')
			}
			return response.json()
		})
		.then(data => {
			console.log('Landmark deleted:', data)
			displayMessage('success', 'Landmark deleted successfully.')
		})
		.catch(error => {
			console.error('Error deleting landmark:', error)
			displayMessage(
				'error',
				'Failed to delete landmark. Please try again later.'
			)
		})
}

function fetchAllLandmarks() {
	fetch('/landmarks')
		.then(response => {
			if (!response.ok) {
				throw new Error('Failed to fetch landmarks.')
			}
			return response.json()
		})
		.then(data => {
			const fetchAllResult = document.getElementById('fetchAllResult')
			fetchAllResult.innerHTML = ''

			for (let i = 0; i < data.length; i++) {}

			let i = 0
			data.forEach(post => {
				const postDiv = document.createElement('div')
				postDiv.id = `fetchAllResultChild${i}`
				fetchAllResult.appendChild(postDiv)
				postDiv.classList.add('mb-4')
				displayLandmark(post, postDiv.id)
				i++
			})
		})
		.catch(error => {
			console.error('Error fetching landmarks:', error)
			displayMessage(
				'error',
				'Failed to fetch all landmarks. Please try again later.'
			)
		})
}

let carouselId = 1
function displayLandmark(data, targetElementId) {
	const targetElement = document.getElementById(targetElementId)
	targetElement.innerHTML = ''

	let carouselHTML = `
        <div id="carouselExampleIndicators${carouselId}" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
    `

	data.pictures.slice(0, 3).forEach((picture, index) => {
		carouselHTML += `
            <div class="carousel-item ${index === 0 ? 'active' : ''}">
                <img src="${picture.substring(
									6
								)}" class="d-block w-100" alt="...">
            </div>
        `
	})

	carouselHTML += `
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators${carouselId}" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators${carouselId}" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
    `

	targetElement.innerHTML = carouselHTML

	const titleElement = document.createElement('h3')
	titleElement.textContent = data.title

	const descriptionElement = document.createElement('p')
	descriptionElement.textContent = data.description

	const publishedDateElement = document.createElement('p')
	const publishedDate = new Date(data.publishedDate)
	publishedDateElement.textContent =
		'Posted on: ' + publishedDate.toLocaleString()

	const updatedDateElement = document.createElement('p')
	const updatedDate = new Date(data.updatedDate)
	updatedDateElement.textContent = 'Updated on: ' + updatedDate.toLocaleString()

	targetElement.appendChild(titleElement)
	targetElement.appendChild(descriptionElement)
	targetElement.appendChild(publishedDateElement)
	targetElement.appendChild(updatedDateElement)
	carouselId++
}

function displayMessage(type, message) {
	const messageBox = document.getElementById('messageBox')
	messageBox.textContent = message
	messageBox.classList.remove('alert-success', 'alert-danger')
	if (type === 'success') {
		messageBox.classList.add('alert', 'alert-success')
	} else if (type === 'error') {
		messageBox.classList.add('alert', 'alert-danger')
	}

	setTimeout(() => {
		messageBox.textContent = ''
		messageBox.classList.remove('alert-success', 'alert-danger')
	}, 4000)
}

function createQuestion() {
	const landmarkId = document.getElementById('landmarkId').value.trim()
	const questionText = document.getElementById('questionText').value.trim()

	if (landmarkId === '' || questionText === '') {
		displayMessage('error', 'Please fill in all fields.')
		return
	}

	const formData = new FormData()
	formData.append('landmarkId', landmarkId)
	formData.append('questionText', questionText)

	fetch('/questions', {
		method: 'POST',
		body: formData,
	})
		.then(response => {
			if (!response.ok) {
				throw new Error('Failed to create question.')
			}
			return response.json()
		})
		.then(data => {
			console.log('New question created:', data)
			displayMessage('success', 'Question created successfully.')
		})
		.catch(error => {
			console.error('Error creating question:', error)
			displayMessage(
				'error',
				'Failed to create question. Please try again later.'
			)
		})
}

function fetchQuestionsForLandmark() {
	const landmarkId = document.getElementById('questionLandmarkId').value.trim()

	if (landmarkId === '') {
		displayMessage('error', 'Please provide a landmark ID.')
		return
	}

	fetch(`/questions/${landmarkId}`)
		.then(response => {
			if (!response.ok) {
				throw new Error('Failed to fetch questions.')
			}
			return response.json()
		})
		.then(data => {
			const questionsList = document.getElementById('questionsList')
			questionsList.innerHTML = ''
			data.forEach(question => {
				const questionDiv = document.createElement('div')
				questionDiv.classList.add('question')
				questionDiv.innerHTML = `
                    <p><strong>Question:</strong> ${question.text}</p>
                    <p><strong>Asked on:</strong> ${new Date(
											question.createdAt
										).toLocaleString()}</p>
                `
				questionsList.appendChild(questionDiv)
			})
		})
		.catch(error => {
			console.error('Error fetching questions:', error)
			displayMessage(
				'error',
				'Failed to fetch questions. Please try again later.'
			)
		})
}

function deleteQuestion() {
	const questionId = document.getElementById('deleteQuestionId').value.trim()

	if (questionId === '') {
		displayMessage('error', 'Please provide a question ID.')
		return
	}

	fetch(`/questions/${questionId}`, {
		method: 'DELETE',
	})
		.then(response => {
			if (!response.ok) {
				throw new Error('Failed to delete question.')
			}
			return response.json()
		})
		.then(data => {
			console.log('Question deleted:', data)
			displayMessage('success', 'Question deleted successfully.')
		})
		.catch(error => {
			console.error('Error deleting question:', error)
			displayMessage(
				'error',
				'Failed to delete question. Please try again later.'
			)
		})
}
