# Voice Notes App

## Description

Voice Notes is a simple web application that allows users to create notes using speech recognition. Users can start and stop recording their voice, and the app will transcribe the speech into text. The notes can then be saved to a server.

## Features

- Speech-to-text conversion
- Start and stop recording functionality
- Save notes to a server
- Simple and intuitive user interface

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- Web Speech API
- Node.js
- Express.js

## Setup and Installation

1. Clone the repository to your local machine.
2. Ensure you have Node.js installed on your system.
3. Navigate to the project directory in your terminal.
4. Install the required dependencies:
   ```bash
   npm install
   ```
5. Start the server:
   ```bash
   node server.js
   ```
6. Open your web browser and go to `http://localhost:3000`

## Usage

1. Click the "Start Recording" button to begin voice recognition.
2. Speak clearly into your microphone.
3. Click "Stop Recording" when you're finished speaking.
4. Your speech will be transcribed into the text area.
5. Click "Save Notes" to save the transcribed text to the server.

## File Structure

- `public/index.html`: The main HTML file
- `public/script.js`: Client-side JavaScript for handling voice recognition and UI interactions
- `server.js`: Node.js server file for handling API requests and serving static files

## API Endpoints

- POST `/save`: Saves the notes to the server

## Browser Compatibility

This app uses the Web Speech API, which is not supported by all browsers. For the best experience, use Google Chrome or Microsoft Edge.

## Contributing

Contributions, issues, and feature requests are welcome. Feel free to check issues page if you want to contribute.

## License

[MIT](https://choosealicense.com/licenses/mit/)
