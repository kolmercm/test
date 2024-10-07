const startButton = document.getElementById('start-recording');
const stopButton = document.getElementById('stop-recording');
const notesArea = document.getElementById('notes');
let recognition;

if ('webkitSpeechRecognition' in window) {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
            .map(result => result[0].transcript)
            .join('');
        notesArea.value = transcript;
    };

    recognition.onerror = (event) => {
        console.error('Speech recognition error', event);
    };
} else {
    alert('Your browser does not support speech recognition.');
}

startButton.addEventListener('click', () => {
    recognition.start();
    startButton.disabled = true;
    stopButton.disabled = false;
});

stopButton.addEventListener('click', () => {
    recognition.stop();
    startButton.disabled = false;
    stopButton.disabled = true;
});

document.getElementById('save-notes').addEventListener('click', () => {
    const notes = notesArea.value;
    fetch('/save', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ notes })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Notes saved successfully!');
        } else {
            alert('Failed to save notes.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while saving notes.');
    });
});

// Remove the duplicate code for creating and adding the view notes button
const viewNotesButton = document.createElement('button');
viewNotesButton.textContent = 'View Saved Notes';
viewNotesButton.id = 'view-notes';
document.body.insertBefore(viewNotesButton, document.getElementById('save-notes').nextSibling);

// Add a new div to display the notes
const savedNotesDiv = document.createElement('div');
savedNotesDiv.id = 'saved-notes';
document.body.appendChild(savedNotesDiv);

// Function to fetch and display saved notes
function viewSavedNotes() {
    fetch('/notes')  // Remove 'http://localhost:3000' to use relative path
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                savedNotesDiv.innerHTML = '<h2>Saved Notes:</h2>';
                data.notes.forEach((note, index) => {
                    savedNotesDiv.innerHTML += `<p><strong>Note ${index + 1}:</strong> ${note}</p>`;
                });
            } else {
                alert('Failed to retrieve notes.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while retrieving notes.');
        });
}

// Add event listener to the view notes button
viewNotesButton.addEventListener('click', viewSavedNotes);

