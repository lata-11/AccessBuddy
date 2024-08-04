document.addEventListener("DOMContentLoaded", () => {
    const readMessageBtn = document.getElementById("read-message-btn");

    if (!readMessageBtn) {
        console.error("Button with id 'read-message-btn' not found.");
        return;
    }

    let utterance;

    const readMessage = () => {
        const message = "Welcome Lata! Access Buddy is your all-in-one personal assistant designed to help you manage tasks, set reminders, and keep track of emergency contacts effortlessly. With voice recognition and an intuitive interface, you can easily stay organized and focused on what matters most.";
        
        // Cancel any ongoing speech
        if (utterance) {
            speechSynthesis.cancel();
        }

        utterance = new SpeechSynthesisUtterance(message);
        speechSynthesis.speak(utterance);
    };

    readMessageBtn.addEventListener("click", (event) => {
        // Prevents the event from bubbling up to the document level
        event.stopPropagation();
        readMessage();
    });

    document.addEventListener("click", (event) => {
        if (event.target !== readMessageBtn) {
            speechSynthesis.cancel();
        }
    });
});
