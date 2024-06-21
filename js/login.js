const admineButton = document.getElementById('signUp');
const userButton = document.getElementById('signIn');
const container = document.getElementById('container');

admineButton.addEventListener('click', () => {
    container.classList.add('right-panel-active');
});

userButton.addEventListener('click', () => {
    container.classList.remove('right-panel-active');
});
// const admins = [
//     { name: 'duaa', password: 123123 },
//     { name: 'sara', password: 55555 }
// ];
// localStorage.setItem('admins', JSON.stringify(admins));

// const participants = [
//     { id: 121212, name: 'Ahmad', level: 1 },
//     { id: 212121, name: 'Omar', level: 2 }
// ];
// localStorage.setItem('participants', JSON.stringify(participants));


const adminLogin = (name, password) => {
    const admins = JSON.parse(localStorage.getItem('admins'));
    let isValid = false;
    for (let i = 0; i < admins.length; i++) {
        if (admins[i].name === name && admins[i].password === password) {
            isValid = true;
            break;
        }
    }
    return isValid;
};

const participantLogin = (id, name) => {
    const participants = JSON.parse(localStorage.getItem('participants'));
    let isValid = false;
    for (let i = 0; i < participants.length; i++) {
        if (participants[i].id === parseInt(id) && participants[i].name === name) {
            isValid = true;
            break;
        }
    }
    return isValid;
};
document.querySelector('.sign-in-container form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
    const adminName = document.querySelector('.sign-in-container input[type="text"]').value;
    const adminPassword = document.querySelector('.sign-in-container input[type="password"]').value;
    
    if (adminLogin(adminName, adminPassword)) {
        alert('Admin login successful');
    } else {
        alert('Invalid admin credentials');
    }
});

document.querySelector('.sign-up-container form').addEventListener('submit', function(event) {
    event.preventDefault(); 
    const participantName = document.querySelector('.sign-up-container input[type="text"]').value;
    const participantID = document.querySelector('.sign-up-container input[type="number"]').value;
    
    if (participantLogin(participantID, participantName)) {
        alert('Participant login successful');
    } else {
        alert('Invalid participant credentials');
    }
});