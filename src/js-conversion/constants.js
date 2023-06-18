
class Constants {
    constructor() {
        this.MAX_LOOP = 1000000;
        this.DEBUG = false;
        this.env = typeof window !== 'undefined' ? 'browser' : 'node';
    }
    randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    output(message) {
        function scrollToBottom() {
            var terminal = document.getElementById("terminal");
            terminal.scrollTop = terminal.scrollHeight;
        }    
        if (message !== "undefined") {
            if (this.env === 'node') {
                console.log(message);
            } else if (this.env === 'browser') {
                // Assuming you have an element with id 'output' to display messages
                document.getElementById('output').innerText += message + '\n';
                scrollToBottom();
            }
        }
    }

    input(promptMessage) {
        if (this.env === 'node') {
            const readline = require('readline').createInterface({
                input: process.stdin,
                output: process.stdout
            });

            return new Promise(resolve => readline.question(promptMessage, answer => {
                readline.close();
                resolve(answer);
            }));

        } else if (this.env === 'browser') {
            let inputElement = document.getElementById('input');
            let promptElement = document.getElementById('prompt'); // Get the prompt element
            
            inputElement.value = ''; // Clear the input field
            inputElement.focus(); // Focus on the input field
    
            promptElement.innerHTML = promptMessage; // Display the prompt message
    
            return new Promise(resolve => {
                // Listen for the 'Enter' key press
                inputElement.onkeyup = function (event) {
                    if (event.key === 'Enter') {
                        resolve(inputElement.value);
                        inputElement.value = ''; // Clear the input field
                    }
                };
            });
        }
    }
}

let env = typeof window !== 'undefined' ? 'browser' : 'node';

if (env === 'node') {
    module.exports = Constants;
}
else if (env === 'browser') {
    window.Constants = Constants;
}