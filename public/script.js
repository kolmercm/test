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