function addParticipant() {
    const name = document.getElementById('userName').value;
    const id = document.getElementById('userId').value;
    const level = document.querySelector('input[name="userLevel"]:checked').value;

    let participants = JSON.parse(localStorage.getItem('participants')) || {};
    let participantExists = false;

    for (let key in participants) {
        if (participants[key].some(participant => participant.id === id)) {
            participantExists = true;
            break;
        }
    }

    if (participantExists) {
        Swal.fire({
            title: 'Error!',
            text: 'A participant with this ID already exists in the system.',
            icon: 'error'
        });
    } else {
        if (!participants[level]) {
            participants[level] = [];
        }
        participants[level].push({ name, id });
        localStorage.setItem('participants', JSON.stringify(participants));

        Swal.fire({
            title: 'Success!',
            text: 'Participant added successfully!',
            icon: 'success'
        });
    }
}



function addQuestion() {
    const question = document.getElementById('newQuestion').value;
    const answers = [
        document.getElementById('answerOne').value,
        document.getElementById('answerTwo').value,
        document.getElementById('answerThree').value,
        document.getElementById('answerFour').value
    ];
    const level = document.querySelector('input[name="questionLevel"]:checked').value;

    let questions = JSON.parse(localStorage.getItem('questions')) || {};
    if (!questions[level]) {
        questions[level] = [];
    }
    questions[level].push({ question, answers });
    localStorage.setItem('questions', JSON.stringify(questions));

    Swal.fire({
        title: 'Success!',
        text: 'Question added successfully!',
        icon: 'success'
    });
}

