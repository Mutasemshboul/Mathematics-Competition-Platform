function displayResults() {
    const allAnswers = JSON.parse(localStorage.getItem('allAnswers')) || {};
    const tableBody = document.querySelector('.table tbody');
    tableBody.innerHTML = ''; 

    Object.keys(allAnswers).forEach(userId => {
        const userAnswers = allAnswers[userId];
        const correctAnswers = userAnswers.filter(answer => answer.correct).length;
        const participantName = allAnswers[userId][0].userName; 

        const resultPercentage = ((correctAnswers / userAnswers.length) * 100).toFixed(2) + '%';
        const row = `
            <tr>
                <td>${userId}</td>
                <td>${participantName}</td>
                <td>${correctAnswers} out of ${userAnswers.length}</td>
                <td>${resultPercentage}</td>
                <td><button onclick="deleteResults('${userId}')">Delete</button></td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

function deleteResults(userId) {
    const allAnswers = JSON.parse(localStorage.getItem('allAnswers')) || {};
    if (allAnswers[userId]) {
        delete allAnswers[userId];  
        localStorage.setItem('allAnswers', JSON.stringify(allAnswers));  
        displayResults();  
    }
}

displayResults();