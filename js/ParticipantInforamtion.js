function displayParticipants() {
    const participants = JSON.parse(localStorage.getItem('participants')) || {};
    
    const levelOneTableBody = document.getElementById('table-level-1');
    const levelTwoTableBody = document.getElementById('table-level-2');

    const createTableRow = (id, name, level) => {
        return `<tr>
                    <td>${id}</td>
                    <td>${name}</td>
                    <td><button class="btn btn-danger" onclick="deleteParticipant('${id}', '${level}')">Delete</button></td>
                </tr>`;
    };
    

    if (participants['Level 1']) {
        participants['Level 1'].forEach(participant => {
            levelOneTableBody.innerHTML += createTableRow(participant.id, participant.name, 'Level 1');
        });
    }
    
    if (participants['Level 2']) {
        participants['Level 2'].forEach(participant => {
            levelTwoTableBody.innerHTML += createTableRow(participant.id, participant.name, 'Level 2');
        });
    }
    
}

document.addEventListener('DOMContentLoaded', displayParticipants);

function deleteParticipant(id, level) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            const participants = JSON.parse(localStorage.getItem('participants')) || {};

            if (participants[level]) {
                participants[level] = participants[level].filter(participant => participant.id !== id);
                localStorage.setItem('participants', JSON.stringify(participants)); 
                displayParticipants(); 
            }

            Swal.fire(
                'Deleted!',
                'The participant has been deleted.',
                'success'
            );
        }
    });
}


