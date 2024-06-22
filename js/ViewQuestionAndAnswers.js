function displayQuestionsForLevel(level) {
    
    const questionsContainer = document.getElementById(level + 'QuestionBody');
    const questions = JSON.parse(localStorage.getItem('questions')) || {};
    console.log(questionsContainer);
    let indexLevel;
    if(level==='levelOne'){
        indexLevel = 'Level 1';
    }
    else if(level==='levelTwo'){
        indexLevel = 'Level 2';
        }

    if (questions[indexLevel]) {
        questions[indexLevel].forEach((question, index) => {
            const row = document.createElement('tr');
            const optionHtml = question.answers.map(answer => `<td>${answer}</td>`).join('');
            const correctAnswer = question.answers[0]; 
            console.log(optionHtml);

            row.innerHTML = `
                <td>${question.question}</td>
                ${optionHtml}
                <td><button onclick="deleteQuestion('${indexLevel}', ${index})">Delete</button></td>
            `;
            questionsContainer.appendChild(row);
        });
    }
}

function deleteQuestion(level, index) {
    const questions = JSON.parse(localStorage.getItem('questions')) || {};
    if (questions[level]) {
        questions[level].splice(index, 1); 
        localStorage.setItem('questions', JSON.stringify(questions)); 
        displayQuestionsForLevel(level); 
        Swal.fire('Deleted!', 'The question has been deleted.', 'success');
    }
}


function startExam(level) {
    const startTime = new Date().getTime(); // Record start time in milliseconds
    localStorage.setItem(level + '_startTime', startTime); // Save start time in localStorage

    // Redirect to exam page or show exam interface depending on your setup
    console.log('Exam started for ' + level + ' at ' + new Date(startTime).toLocaleTimeString());
    // Optionally, show the questions for the selected level
}






document.addEventListener('DOMContentLoaded', function() {

    displayQuestionsForLevel('levelOne');
    displayQuestionsForLevel('levelTwo');
});
