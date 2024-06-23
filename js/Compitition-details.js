document.addEventListener('DOMContentLoaded', function() {
    const sessionData = JSON.parse(localStorage.getItem('currentSession'));
    if (!sessionData || !sessionData.level) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No participant session or level information found.',
            confirmButtonText: 'Ok',
        });
        return; 
    }

   
    const examStartTimeKey = sessionData.level + '_startTime';
    const examStartTime = localStorage.getItem(examStartTimeKey);
    const startButton = document.querySelector('.start-button');

    if (!examStartTime) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Exam start or end time not set for your level.',
            confirmButtonText: 'Ok',
        });
        return;
    }

    const currentTime = Date.now();
    const startTime = parseInt(examStartTime);
    if (sessionData.status) {
        startButton.style.cursor = "not-allowed";
        startButton.disabled = true;
        Swal.fire({
            icon: 'info',
            title: 'Exam Already Taken',
            text: 'You have already completed this exam.',
            confirmButtonText: 'Ok'
        });
        return false;
    }

    else if (currentTime >= startTime) {
        startButton.disabled = false;
        startButton.style.cursor = "pointer"; 
        startButton.addEventListener('click', function() {
            window.location.href = "Compitition-page.html"; 
        });
    } else {
        startButton.disabled = true;
        startButton.innerText = 'Exam not started yet';
        startButton.style.cursor = "not-allowed";
    }
});


