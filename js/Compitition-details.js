document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.querySelector('.start-button');
    const examStartTime = localStorage.getItem('Level 1_startTime'); 

    


    startButton.addEventListener('click', function() {
        if (!examStartTime) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Exam start or end time not set.',
                confirmButtonText: 'Ok',
    
            });
            return;
        }


    });
   

    const currentTime = Date.now();
    const startTime = parseInt(examStartTime);

   
    if (currentTime >= startTime ) {
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
