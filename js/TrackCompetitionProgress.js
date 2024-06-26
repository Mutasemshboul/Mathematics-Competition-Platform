function displayResults() {
    const allAnswers = JSON.parse(localStorage.getItem('allAnswers')) || {};
    const level1Body = document.getElementById('level1Body');
    const level2Body = document.getElementById('level2Body');

    level1Body.innerHTML = '';
    level2Body.innerHTML = '';

    Object.keys(allAnswers).forEach(userId => {
        const userAnswers = allAnswers[userId];
        const correctAnswers = userAnswers.filter(answer => answer.correct).length;
        const participantName = userAnswers[0].userName; 
        const participantLevel = userAnswers[0].level; 

        const resultPercentage = ((correctAnswers / userAnswers.length) * 100).toFixed(2) + '%';
        const row = `
            <tr>
                <td>${userId}</td>
                <td>${participantName}</td>
                <td>${correctAnswers} out of ${userAnswers.length}</td>
                <td>${resultPercentage}</td>
                <td id="action">
                    <button class="btn btn-danger" onclick="deleteResults('${userId}')">Delete</button>
                    <button class="btn btn-primary" onclick="showUserDetails('${userId}')">Details</button>
                </td>
            </tr>
        `;

        
        if (participantLevel === "Level 1") {
            level1Body.innerHTML += row;
        } else if (participantLevel === "Level 2") {
            level2Body.innerHTML += row;
        }
    });
}


function showUserDetails(userId) {
    const allAnswers = JSON.parse(localStorage.getItem('allAnswers')) || {};
    const userAnswers = allAnswers[userId];

    if (!userAnswers) {
        alert("No answers found for this user.");
        return;
    }

    const userDetailsBody = document.getElementById('userDetailsBody');
    userDetailsBody.innerHTML = ''; 
    userAnswers.forEach((answer) => {
        const row = `
            <tr>
                <td>${answer.question}</td>
                <td>${answer.selectedOption}</td>
                <td>${answer.correct ? 'Yes' : 'No'}</td>
                <td>${answer.timeTaken}</td>
            </tr>
        `;
        userDetailsBody.innerHTML += row; 
    });

    $('#userDetailsModal').modal('show'); 
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