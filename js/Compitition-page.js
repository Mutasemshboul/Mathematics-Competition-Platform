let currentQuestionIndex = 0;
let questions = [];
let allAnswer=[];
function loadParticipantData() {
    const sessionData = JSON.parse(localStorage.getItem('currentSession'));
    if (sessionData && sessionData.type === 'participant') {
        const detailsContainer = document.getElementById('participantDetails');
        detailsContainer.innerHTML = `
            <span>${sessionData.level}, </span>
            <span>${sessionData.name}, </span>
            <span>Computation Time: 30:00, </span>
            <span>Date: 18/6/2024</span>
        `;
        
        // Load questions for the participant's level
        loadQuestions(sessionData.level);
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No valid participant session data found.'
        });
    }
}

function loadQuestions(level) {
    const allQuestions = JSON.parse(localStorage.getItem('questions')) || {};
    questions = allQuestions[level] || [];
    console.log(questions);
    displayQuestion();
}

function displayQuestion() {
    const questionContainer = document.getElementById('displayQuestion');
    const nextButton = document.querySelector('.next');
    
    if (questions.length > 0 && questions[currentQuestionIndex]) {
        const question = questions[currentQuestionIndex];
        questionContainer.innerHTML = `<p>Q${currentQuestionIndex + 1}: ${question.question}</p>
            <div class="options">
                ${question.answers.map((answer, index) => 
                    `<label><input type="radio" name="choice" value="${index + 1}"> ${answer}</label>`
                ).join('')}
            </div>`;
    } else {
        questionContainer.innerHTML = "<p>No questions available.</p>";
    }
}

function submitAnswer() {
    const selectedOption = document.querySelector('input[name="choice"]:checked');
    if (!selectedOption) {
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'Please select an answer before submitting.'
        });
        return;
    }

    const sessionData = JSON.parse(localStorage.getItem('currentSession'));
    if (!sessionData) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Session data not found. Please start your session properly.'
        });
        return;
    }

    // Load existing answers for this user or initialize a new array if none exist
    const allAnswers = JSON.parse(localStorage.getItem('allAnswers')) || {};
    const userAnswers = allAnswers[sessionData.id] || [];
    
    userAnswers.push({
        userName:sessionData.name,
        questionIndex: currentQuestionIndex,
        question: questions[currentQuestionIndex].question,
        selectedOption: selectedOption.value,
        level:sessionData.level,
        correct: selectedOption.value === "1"  // Since the correct answer is always the first option
    });

    // Update the answers for this user in the main allAnswers object
    allAnswers[sessionData.id] = userAnswers;

    // Save the updated all answers object back to localStorage
    localStorage.setItem('allAnswers', JSON.stringify(allAnswers));

    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
    } else {
        document.getElementById('displayQuestion').innerHTML = "<p>You have completed all questions.</p>";
        Swal.fire({
            icon: 'success',
            title: 'Completed!',
            text: 'You have completed the quiz.',
            confirmButtonText: 'Finish'
        });
        location.href = 'Compitition-details.html'
    }
}


document.addEventListener('DOMContentLoaded', loadParticipantData);
