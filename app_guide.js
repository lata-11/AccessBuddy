document.addEventListener("DOMContentLoaded", () => {
    const readMessageBtn = document.getElementById("read-text-btn");

    if (!readMessageBtn) {
        console.error("Button with id 'read-text-btn' not found.");
        return;
    }

    let utterance;

    const readMessage = () => {
        const message = `
            Welcome to Access Buddy, a platform designed to enhance accessibility and provide support for individuals with disabilities.
            Our goal is to create tools and resources that make everyday tasks easier and more inclusive. This guide will walk you through the main features of the application and how to use them.
        `;
        if (utterance) {
            speechSynthesis.cancel(); // Stop any ongoing speech
        }
        utterance = new SpeechSynthesisUtterance(message);
        speechSynthesis.speak(utterance);
    };

    readMessageBtn.addEventListener("click", readMessage);

    document.addEventListener("click", (event) => {
        if (event.target !== readMessageBtn) {
            speechSynthesis.cancel(); // Stop speech if clicking outside the button
        }
    });
});
