const addParticipantForm = document.getElementById('addParticipantForm');

addParticipantForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const participantName = document.getElementById('name').value;
    const participantID = document.getElementById('id').value;
    const level = document.querySelector('.levelChoice input[name="level"]:checked').id === 'level1'? 1 : 2;

    const newParticipant = {
        id: parseInt(participantID),
        name: participantName,
        level: parseInt(level)
    };

    let participants = JSON.parse(localStorage.getItem('participants')) || [];
    participants.push(newParticipant);
    localStorage.setItem('participants', JSON.stringify(participants));

    alert(`Participant ${participantName} added successfully!`);
    addParticipantForm.reset();
});

