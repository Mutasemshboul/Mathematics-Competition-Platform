
const admineButton = document.getElementById('signUp');
const userButton = document.getElementById('signIn');
const container = document.getElementById('container');

admineButton.addEventListener('click', () => {
    container.classList.add('right-panel-active');
});

userButton.addEventListener('click', () => {
    container.classList.remove('right-panel-active');
});