document.addEventListener("DOMContentLoaded", () => {
 
    document.getElementById("play-quote").addEventListener("click", () => {
        const quoteText = document.getElementById("quote-text").textContent;
        const speech = new SpeechSynthesisUtterance(quoteText);
        speechSynthesis.speak(speech);
    });
     // JavaScript for Info Button
     document.getElementById("info-button").addEventListener("click", () => {
        alert(
            "Access Buddy is a platform designed to enhance accessibility and provide support for individuals with disabilities. Our goal is to create tools and resources that make everyday tasks easier and more inclusive."
        );
    });

    // JavaScript for Get Started Button
    document.getElementById("get-started").addEventListener("click", () => {
        const nameInput = document.getElementById("name-input").value.trim();
        if (nameInput) {
            window.location.href = "index.html";
        } else {
            alert("Please enter your name to get started.");
        }
    });
});