document.addEventListener("DOMContentLoaded", () => {
    // Task Management Section
    const taskForm = document.getElementById("task-form");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");
    const voiceButtonTask = document.getElementById("voice-button");
    const readAllTasksBtn = document.getElementById("read-all-tasks-btn");
    const taskAddedSound = document.getElementById("task-added-sound");
    const taskRemovedSound = document.getElementById("task-removed-sound");

    const tasks = new Map();

    const addTask = (taskText) => {
        if (taskText.trim() === "") return;

        const taskId = Date.now();
        const li = document.createElement("li");
        li.dataset.id = taskId;
        li.innerHTML = `
            <span>${taskText}</span>
            <button aria-label="Remove task">Remove</button>
        `;

        li.querySelector("span").addEventListener("click", () => {
            li.classList.toggle("completed");
        });

        li.querySelector("button").addEventListener("click", () => {
            li.remove();
            tasks.delete(taskId);
            playSound(taskRemovedSound);
        });

        taskList.appendChild(li);
        taskInput.value = "";
        taskInput.focus();
        tasks.set(taskId, taskText);
        playSound(taskAddedSound);
    };

    const removeTaskByName = (taskText) => {
        for (const [id, text] of tasks) {
            if (text.toLowerCase() === taskText.toLowerCase()) {
                const li = document.querySelector(`li[data-id='${id}']`);
                if (li) {
                    li.remove();
                    tasks.delete(id);
                    playSound(taskRemovedSound);
                    return;
                }
            }
        }
    };

    const playSound = (audioElement) => {
        if (audioElement) {
            console.log("Playing sound:", audioElement.src);
            audioElement.play().catch((error) => {
                console.error("Error playing sound:", error);
            });
        }
    };

    const readAllTasks = () => {
        const tasks = taskList.querySelectorAll('li');
        const utterance = new SpeechSynthesisUtterance();
        tasks.forEach((task, index) => {
            utterance.text += `${index + 1}. ${task.querySelector('span').textContent}. `;
        });
        speechSynthesis.speak(utterance);
    };

    if (taskForm) {
        taskForm.addEventListener("submit", (e) => {
            e.preventDefault();
            addTask(taskInput.value);
        });
    }

    const recognitionTask = new (window.SpeechRecognition ||
        window.webkitSpeechRecognition)();
    recognitionTask.lang = "en-US";
    recognitionTask.interimResults = false;
    recognitionTask.continuous = false;

    recognitionTask.addEventListener("result", (event) => {
        const command = event.results[0][0].transcript.toLowerCase();
        if (command.includes("exit") || command.includes("bye")) {
            recognitionTask.stop();
            return;
        }

        if (command.startsWith("remove") || command.startsWith("delete")) {
            const taskText = command.replace(/^(remove|delete)\s*/, "").trim();
            removeTaskByName(taskText);
        } else {
            addTask(command);
        }
    });

    if (voiceButtonTask) {
        voiceButtonTask.addEventListener("click", () => {
            recognitionTask.start();
        });
    }

    if (readAllTasksBtn) {
        readAllTasksBtn.addEventListener('click', () => {
            readAllTasks();
        });
    }

    // Reminder Management Section
    const reminderForm = document.getElementById("reminder-form");
    const reminderMessage = document.getElementById("reminder-message");
    const reminderDate = document.getElementById("reminder-date");
    const reminderTime = document.getElementById("reminder-time");
    const phoneNumber = document.getElementById("phone-number");
    const voiceButtonReminder = document.getElementById("voice-button-reminder");
    const reminderList = document.getElementById("reminder-list");

    const addReminder = (message, date, time, phone) => {
        if (message.trim() === "") return;

        const reminderId = Date.now();
        const li = document.createElement("li");
        li.dataset.id = reminderId;
        li.innerHTML = `
            <span>${message} on ${date} at ${time}</span>
            <button aria-label="Remove reminder">Remove</button>
        `;

        li.querySelector("button").addEventListener("click", () => {
            li.remove();
        });

        reminderList.appendChild(li);
        reminderMessage.value = "";
        reminderDate.value = "";
        reminderTime.value = "";
        phoneNumber.value = "";
    };

    if (reminderForm) {
        reminderForm.addEventListener("submit", (e) => {
            e.preventDefault();
            addReminder(reminderMessage.value, reminderDate.value, reminderTime.value, phoneNumber.value);
        });
    }

    const recognitionReminder = new (window.SpeechRecognition ||
        window.webkitSpeechRecognition)();
    recognitionReminder.lang = "en-US";
    recognitionReminder.interimResults = false;
    recognitionReminder.continuous = false;

    recognitionReminder.addEventListener("result", (event) => {
        const command = event.results[0][0].transcript.toLowerCase();
        if (command.includes("exit") || command.includes("bye")) {
            recognitionReminder.stop();
            return;
        }

        // Handle reminder commands here
    });

    if (voiceButtonReminder) {
        voiceButtonReminder.addEventListener("click", () => {
            recognitionReminder.start();
        });
    }

    // Dropdown functionality
    const dropdownHeaders = document.querySelectorAll(".dropdown-header");
    dropdownHeaders.forEach((header) => {
        header.addEventListener("click", () => {
            const dropdown = header.parentElement;
            dropdown.classList.toggle("active");
        });
    });
       // JavaScript for Text-to-Speech
    // document.getElementById("play-quote").addEventListener("click", () => {
    //     const quoteText = document.getElementById("quote-text").textContent;
    //     const speech = new SpeechSynthesisUtterance(quoteText);
    //     speechSynthesis.speak(speech);
    // });
    //  // JavaScript for Info Button
    //  document.getElementById("info-button").addEventListener("click", () => {
    //     alert(
    //         "Access Buddy is a platform designed to enhance accessibility and provide support for individuals with disabilities. Our goal is to create tools and resources that make everyday tasks easier and more inclusive."
    //     );
    // });

    // // JavaScript for Get Started Button
    // document.getElementById("get-started").addEventListener("click", () => {
    //     const nameInput = document.getElementById("name-input").value.trim();
    //     if (nameInput) {
    //         window.location.href = "index.html";
    //     } else {
    //         alert("Please enter your name to get started.");
    //     }
    // });
    // JavaScript for Text-to-Speech
    document.getElementById("read-text-btn").addEventListener("click", () => {
        const textToRead = document.getElementById("text-to-read").value;
        if (textToRead.trim() === "") {
            alert("Please type some text to read.");
            return;
        }

        // Use ResponsiveVoice to speak the text
        responsiveVoice.speak(textToRead, "UK English Female", { rate: 1, pitch: 1 }, {
            onstart: function() {
                console.log("Speech started");
            },
            onend: function() {
                console.log("Speech ended");
            }
        });
    });
    

    // JavaScript for Info Button
    document.getElementById("info-button").addEventListener("click", () => {
        alert(
            "Access Buddy is a platform designed to enhance accessibility and provide support for individuals with disabilities. Our goal is to create tools and resources that make everyday tasks easier and more inclusive."
        );
    });
});
