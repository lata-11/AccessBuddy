document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("read-text-btn").addEventListener("click", () => {
        const appGuideContent = document.getElementById("app-guide-content").innerText;
        if (appGuideContent.trim() === "") {
            alert("No content to read.");
            return;
        }

        // Use ResponsiveVoice to speak the text
        responsiveVoice.speak(appGuideContent, "UK English Female", {
            rate: 1,
            pitch: 1,
            onstart: function() {
                console.log("Speech started");
            },
            onend: function() {
                console.log("Speech ended");
            }
        });
    });
});
