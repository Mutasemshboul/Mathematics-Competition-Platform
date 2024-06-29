let currentQuestionIndex = 0;
let questions = [];
let allAnswer=[];
let questionStartTime;
function loadParticipantData() {
    const sessionData = JSON.parse(localStorage.getItem('currentSession'));
    if (sessionData && sessionData.type === 'participant') {
        const detailsContainer = document.getElementById('participantDetails');
        detailsContainer.innerHTML = `
           <div> <span>Level: ${sessionData.level} </span>
            <span>Name: ${sessionData.name} </span></div>
            <div><span id="timer">Computation Time: 00:00 </span>
            <span>Date: ${new Date().toLocaleDateString()}</span></div>
        `;

        loadQuestions(sessionData.level);
        initializeExamTimer(sessionData.level);
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No valid participant session data found.'
        });
    }
}

function initializeExamTimer(level) {
    const examStartTimeKey = level + '_startTime';
    const examStartTime = parseInt(localStorage.getItem(examStartTimeKey));
    if (!examStartTime) {
        console.error("Exam start time not found in localStorage for", level);
        return;
    }

    const now = Date.now();
    const elapsed = now - examStartTime;
    const totalExamTime = 30 * 60 * 1000; 
    const remainingTime = totalExamTime - elapsed;

    if (remainingTime <= 0) {
        document.getElementById('timer').innerHTML = "Computation Time: Time's up!";
        Swal.fire({
            icon: 'info',
            title: 'Time’s Up!',
            text: 'The exam time has expired.'
        });
        return;
    }

    updateTimer(remainingTime);
}

function updateTimer(remainingTime) {
    const timerElement = document.getElementById('timer');
    const interval = setInterval(() => {
        if (remainingTime <= 0) {
            clearInterval(interval);
            timerElement.innerHTML = "Computation Time: Time's up!";
            endExam();
            return;
        }

        const minutes = Math.floor(remainingTime / 60000);
        const seconds = Math.floor((remainingTime % 60000) / 1000);
        timerElement.innerHTML = `Computation Time: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        remainingTime -= 1000;
    }, 1000);
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
        const options = shuffleArray(question.answers); 

        questionContainer.innerHTML = `<p>Q${currentQuestionIndex + 1}: ${question.question}</p>
            <div class="options">
                ${options.map((answer, index) => 
                    `<label><input type="radio" name="choice" value="${index + 1}"> ${answer}</label>`
                ).join('')}
            </div>`;
        questionStartTime = new Date().getTime(); 

        
    } else {
        questionContainer.innerHTML = "<p>No questions available.</p>";
    }
}


function shuffleArray(array) {
    let shuffledArray = [...array]; 
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); 
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; 
    }
    return shuffledArray;
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
    const endTime = new Date().getTime();
    const timeTaken = (endTime - questionStartTime) / 1000; 
    const allAnswers = JSON.parse(localStorage.getItem('allAnswers')) || {};
    const userAnswers = allAnswers[sessionData.id] || [];
    console.log(questions[currentQuestionIndex].answers[0]);
    const isCorrect = selectedOption.nextSibling.textContent.trim() === questions[currentQuestionIndex].answers[0].trim();
    
    userAnswers.push({
        userName:sessionData.name,
        questionIndex: currentQuestionIndex,
        question: questions[currentQuestionIndex].question,
        selectedOption: selectedOption.value,
        level:sessionData.level,
        correct: isCorrect,
        timeTaken: timeTaken  
    });

    
    allAnswers[sessionData.id] = userAnswers;

    
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
        sessionData.status = true;
        console.log(sessionData);
        localStorage.setItem('currentSession', JSON.stringify(sessionData));

       
    }
}


document.addEventListener('DOMContentLoaded', loadParticipantData);
