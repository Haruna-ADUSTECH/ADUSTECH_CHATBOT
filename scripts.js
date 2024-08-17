// ADUSTECH Knowledge Base
const adustechInfo = {
    history: "ADUSTECH, founded in [Year], is a renowned institution committed to excellence in science and technology education. It has grown significantly since its inception, fostering innovation and research.",
    faculties: 7,
    departments: 35,
    teachingStaff: 300,
    nonTeachingStaff: 150,
    directorates: [
        "Directorate of Academic Planning",
        "Directorate of ICT",
        "Directorate of Research, Innovation, and Development",
        "Directorate of Sports"
    ],
    courses: [
        "Computer Science",
        "Electrical Engineering",
        "Mechanical Engineering",
        "Civil Engineering",
        "Business Administration",
        "Biochemistry",
        "Physics",
        "Mathematics"
    ]
};

// Additional information (can be dynamically added)
const additionalInfo = {};

// Function to dynamically add more information
function addInfo(key, info) {
    additionalInfo[key.toLowerCase()] = info;
}

// Bot Response Logic
async function getBotResponse(userInput) {
    userInput = userInput.toLowerCase().trim();  // Normalize input
    
    if (userInput.includes("history")) {
        return adustechInfo.history;
    } else if (userInput.includes("faculties") || userInput.includes("faculty")) {
        return `ADUSTECH has ${adustechInfo.faculties} faculties.`;
    } else if (userInput.includes("departments")) {
        return `ADUSTECH has ${adustechInfo.departments} departments.`;
    } else if (userInput.includes("teaching staff")) {
        return `ADUSTECH has approximately ${adustechInfo.teachingStaff} teaching staff.`;
    } else if (userInput.includes("non-teaching staff")) {
        return `ADUSTECH has approximately ${adustechInfo.nonTeachingStaff} non-teaching staff.`;
    } else if (userInput.includes("directorates") || userInput.includes("directorate")) {
        return `ADUSTECH has the following directorates:\n- ${adustechInfo.directorates.join("\n- ")}`;
    } else if (userInput.includes("courses")) {
        return `ADUSTECH offers the following courses:\n- ${adustechInfo.courses.join("\n- ")}`;
    } else if (userInput in additionalInfo) {
        return additionalInfo[userInput];
    } else {
        return "I'm sorry, I don't have information on that topic. Please provide more details or ask about something else.";
    }
}

// Function to append messages to the chat window
function appendMessage(sender, message) {
    let chatlogs = document.getElementById("chatlogs");
    let messageElement = document.createElement("div");
    messageElement.className = "message " + sender;
    messageElement.textContent = message;
    chatlogs.appendChild(messageElement);
    chatlogs.scrollTop = chatlogs.scrollHeight;
}

// Function to handle user input and bot response
async function sendMessage() {
    let userInput = document.getElementById("userInput").value;
    if (userInput.trim() === "") return;

    appendMessage("user", userInput);
    document.getElementById("userInput").value = "";

    let botResponse = await getBotResponse(userInput);
    appendMessage("bot", botResponse);
}

// Example of adding more information dynamically
// addInfo("admission process", "The admission process at ADUSTECH involves...");
// addInfo("campus facilities", "ADUSTECH offers state-of-the-art facilities including...");
