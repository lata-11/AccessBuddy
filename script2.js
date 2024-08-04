document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const nameInput = document.getElementById("name-input");
  const relationshipInput = document.getElementById("relationship-input");
  const phoneInput = document.getElementById("phone-input");
  const contactList = document.getElementById("contact-list");
  const voiceButton = document.getElementById("voice-button");
  const removeContactSound = document.getElementById("remove-contact-sound");
  const addContactSound = document.getElementById("add-contact-sound");

  // Adding audio element for help sound
  const helpSound = new Audio('path_to_help_sound.mp3');

  const contacts = new Map();

  const addContact = (name, relationship, phone) => {
      if (name.trim() === "" || relationship.trim() === "" || phone.trim() === "") return;

      const contactId = Date.now();
      const li = document.createElement("li");
      li.dataset.id = contactId;
      li.innerHTML = `
          <span>Name: ${name}</span> <br>
          <span>Relationship: ${relationship}</span> <br>
          <span>Phone: ${phone}</span>
          <button aria-label="Ask help" class="help-button">Ask help</button>
          <button aria-label="Remove contact" class="remove-button">Remove</button>
      `;

      // Event listener for the Remove button
      li.querySelector(".remove-button").addEventListener("click", () => {
          li.remove();
          contacts.delete(contactId);
          playSound(removeContactSound);
      });

      // Event listener for the Ask Help button
      li.querySelector(".help-button").addEventListener("click", () => {
          helpSound.play();
          alert(`Help requested for ${name}`);
      });

      contactList.appendChild(li);
      nameInput.value = "";
      relationshipInput.value = "";
      phoneInput.value = "";

      contacts.set(contactId, { name, relationship, phone });
      playSound(addContactSound);
  };
  const playSound = (audioElement) => {
    if (audioElement) {
        console.log("Playing sound:", audioElement.src);
        audioElement.play().catch((error) => {
            console.error("Error playing sound:", error);
        });
    }
};
  const parseVoiceInput = (command) => {
      const regex = /name\s(?<name>.+?)\srelationship\s(?<relationship>.+?)\sphone\s(?<phone>\d+)/i;
      const match = command.match(regex);
      if (match && match.groups) {
          const { name, relationship, phone } = match.groups;
          addContact(name, relationship, phone);
      } else {
          console.error("Invalid voice input format");
      }
  };

  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.continuous = false;

  recognition.addEventListener("result", (event) => {
      const command = event.results[0][0].transcript.toLowerCase();
      if (command.includes("exit") || command.includes("bye")) {
          recognition.stop();
          return;
      }
      parseVoiceInput(command);
  });

  recognition.addEventListener("end", () => {});

  voiceButton.addEventListener("click", () => {
      recognition.start();
  });

  form.addEventListener("submit", (e) => {
      e.preventDefault();
      addContact(nameInput.value, relationshipInput.value, phoneInput.value);
  });
});
