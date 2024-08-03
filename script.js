document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    const voiceButton = document.getElementById('voice-button');

    // Get audio elements
    const taskAddedSound = document.getElementById('task-added-sound');
    const taskRemovedSound = document.getElementById('task-removed-sound');

    // Array to store tasks with their IDs
    const tasks = new Map();

    // Function to add a task
    const addTask = (taskText) => {
        if (taskText.trim() === '') return;

        const taskId = Date.now(); // Unique ID for the task
        const li = document.createElement('li');
        li.dataset.id = taskId; // Set the ID as a data attribute
        li.innerHTML = `
            <span>${taskText}</span>
            <button aria-label="Remove task">Remove</button>
        `;

        li.querySelector('span').addEventListener('click', () => {
            li.classList.toggle('completed');
        });

        li.querySelector('button').addEventListener('click', () => {
            li.remove();
            tasks.delete(taskId); // Remove from tasks map
            playSound(taskRemovedSound); // Play task removed sound
        });

        taskList.appendChild(li);
        taskInput.value = '';
        taskInput.focus();

        tasks.set(taskId, taskText); // Store the task in the map
        playSound(taskAddedSound); // Play task added sound
    };

    // Function to remove a task by name
    const removeTaskByName = (taskText) => {
        for (const [id, text] of tasks) {
            if (text.toLowerCase() === taskText.toLowerCase()) {
                const li = document.querySelector(`li[data-id='${id}']`);
                if (li) {
                    li.remove();
                    tasks.delete(id); // Remove from tasks map
                    playSound(taskRemovedSound); // Play task removed sound
                    return; // Exit after removing the task
                }
            }
        }
    };

    // Function to play sound
    const playSound = (audioElement) => {
        if (audioElement) {
            console.log('Playing sound:', audioElement.src); // Log the audio source
            audioElement.play().catch(error => {
                console.error('Error playing sound:', error);
            });
        }
    };

    // Form submit event listener
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        addTask(taskInput.value);
    });

    // Voice input setup
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.continuous = false; // Ensure recognition stops after getting one result

    recognition.addEventListener('result', (event) => {
        const command = event.results[0][0].transcript.toLowerCase();

        // Check for exit or bye commands
        if (command.includes('exit') || command.includes('bye')) {
            recognition.stop();
            return;
        }

        // Check for remove command
        if (command.startsWith('remove') || command.startsWith('delete')) {
            const taskText = command.replace(/^(remove|delete)\s*/, '').trim();
            removeTaskByName(taskText);
        } else {
            // Add task if not exit, bye, remove, or delete
            addTask(command);
        }
    });

    recognition.addEventListener('end', () => {
        // Optionally, you can restart recognition here if you want continuous listening
        // recognition.start();
    });

    voiceButton.addEventListener('click', () => {
        recognition.start();
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const dropdownHeaders = document.querySelectorAll('.dropdown-header');

    dropdownHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const dropdown = header.parentElement;
            dropdown.classList.toggle('active');
        });
    });
});

// JavaScript for Text-to-Speech
document.getElementById('play-quote').addEventListener('click', () => {
    const quoteText = document.getElementById('quote-text').textContent;
    const speech = new SpeechSynthesisUtterance(quoteText);
    speechSynthesis.speak(speech);
});

// JavaScript for Info Button
document.getElementById('info-button').addEventListener('click', () => {
    alert('Access Buddy is a platform designed to enhance accessibility and provide support for individuals with disabilities. Our goal is to create tools and resources that make everyday tasks easier and more inclusive.');
});

// JavaScript for Get Started Button
document.getElementById('get-started').addEventListener('click', () => {
    const nameInput = document.getElementById('name-input').value.trim();
    if (nameInput) {
        window.location.href = 'index.html';
    } else {
        alert('Please enter your name to get started.');
    }
});


