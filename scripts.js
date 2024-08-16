const apiKey = "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";  // Replace with your actual API key

async function sendMessage() {
    let userInput = document.getElementById("userInput").value;
    if (userInput.trim() === "") return;

    appendMessage("user", userInput);
    document.getElementById("userInput").value = "";

    // Fetch bot response using the API
    let botResponse = await getBotResponse(userInput);
    appendMessage("bot", botResponse);
}

function appendMessage(sender, message) {
    let chatlogs = document.getElementById("chatlogs");
    let messageElement = document.createElement("div");
    messageElement.className = "message " + sender;
    messageElement.textContent = message;
    chatlogs.appendChild(messageElement);
    chatlogs.scrollTop = chatlogs.scrollHeight;
}

async function getBotResponse(userInput) {
    try {
        const response = await fetch("https://api.openai.com/v1/engines/davinci-codex/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                prompt: userInput,
                max_tokens: 150
            })
        });

        const data = await response.json();
        return data.choices[0].text.trim();
    } catch (error) {
        console.error("Error:", error);
        return "Sorry, I couldn't connect to the server. Please try again later.";
    }
}
