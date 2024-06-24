
const admineButton = document.getElementById('signUp');
const userButton = document.getElementById('signIn');
const container = document.getElementById('container');

admineButton.addEventListener('click', () => {
    container.classList.add('right-panel-active');
});

userButton.addEventListener('click', () => {
    container.classList.remove('right-panel-active');
});




localStorage.setItem('adminCredentials', JSON.stringify({ name: 'admin', password: '1234' }));
function loginParticipant() {
    const sessionData = JSON.parse(localStorage.getItem('currentSession'));
    const inputName = document.getElementById('participantName').value;
    const inputID = document.getElementById('participantID').value;

    const participants = JSON.parse(localStorage.getItem('participants')) || {};
    let loginSuccessful = false;

    for (let level in participants) {
        const participant = participants[level].find(p => p.id === inputID && p.name === inputName);
        if (participant) {
            if(sessionData){
                localStorage.setItem('currentSession', JSON.stringify({ type: 'participant', name: inputName, id: inputID, level: level, status: true }));
            }
            else{
                localStorage.setItem('currentSession', JSON.stringify({ type: 'participant', name: inputName, id: inputID, level: level, status: false }));
            }
            location.href = 'Compitition-details.html'  
            loginSuccessful = true;
            break;
        }
    }

    if (!loginSuccessful) {
        Swal.fire({
            title: 'Error!',
            text: 'Invalid Participant credentials.',
            icon: 'error'
        });
    }
}


function loginAdmin() {
    const inputName = document.getElementById('adminName').value;
    const inputPassword = document.getElementById('adminPassword').value;

    const storedData = JSON.parse(localStorage.getItem('adminCredentials'));
    if (storedData && storedData.name === inputName && storedData.password === inputPassword) {
         location.href = 'addQandP.html'
        localStorage.setItem('currentSession', JSON.stringify({ type: 'admin', name: inputName }));
    } else {
        Swal.fire({
            title: 'Error!',
            text: 'Invalid Admin credentials.',
            icon: 'error'
        });
    }
}


