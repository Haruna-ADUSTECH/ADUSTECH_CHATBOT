// Function to display the welcome message (moving due to CSS)
function displayWelcomeMessage() {
    let welcomeMessage = document.createElement("div");
    welcomeMessage.className = "welcome-message";
    welcomeMessage.textContent = " ";
    document.body.appendChild(welcomeMessage);
    animateMessage(welcomeMessage);
}

// Function to animate the welcome message
function animateMessage(element) {
    let position = 0;
    setInterval(() => {
        if (position > window.innerWidth) {
            position = -element.offsetWidth;
        } else {
            position++;
        }
        element.style.left = position + "px";
    }, 10);
}

// ADUSTECH Knowledge Base
const adustechInfo = {
    history: "The Aliko Dangote University of Science and Technology (formerly Kano University of Science and Technology) a Kano state government-owned university. 'The university is located in Wudil, Kano state. The university commenced academic activities in the year 2001 and is a member of the Association of Commonwealth Universities The University was formerly known as Kano University of Science and Technology (KUST), Wudil. The university is ranked 123rd in the list of Best Universities in Nigeria. The then governor of Kano state, Engr. Rabiu Musa Kwankwaso proposed establishing the university during his first tenure. The university was renamed to Aliko Dangote University of Science and Technology, Wudil, in 2022 by Governor Abdullahi Umar Ganduje. The current Vice-Chancellor is Prof Musa Tukur Yakasai'",
    faculties: [
        "Faculty Of Agriculture And Agricultural Technology",
        "Faculty Of Computing And Mathematical Science",
        "Faculty Of Earth And Environmental Science",
        "Faculty Of Engineering",
        "Faculty Of Science",
        "Faculty Of Science And Technology Education",
        "School Of General Studies",
        "Entrepreneurship Centre"
    ],
    departments: [
        "Department of Agricultural Economics and Extension",
        "Department of Agricultural Engineering",
        "Department of Animal Science",
        "Department of Architecture",
        "Department of Automotive Engineering",
        "Department of Biochemistry",
        "Department of Biology",
        "Department of Building Technology",
        "Department of Chemistry",
        "Department of Civil Engineering",
        "Department of Computer Science",
        "Department of Computing and Mathematics Education",
        "Department of Crop Science",
        "Department of Educational Foundation",
        "Department of Electrical Engineering",
        "Department of Environmental Science Education",
        "Department of Estate Management",
        "Department of Fisheries and Aquaculture",
        "Department of Food Science and Technology",
        "Department of Forestry and Wildlife Management",
        "Department of Geography",
        "Department of Geology",
        "Department of Human Kinetics and Health Education",
        "Department of Library and Information Science",
        "Department of Mathematics",
        "Department of Mechanical Engineering",
        "Department of Mechatronics",
        "Department of Meteorology",
        "Department of Microbiology",
        "Department of Natural Science Education",
        "Department of Phyical Science Education",
        "Department of Physics",
        "Department of Quantity Survey",
        "Department of Science Education",
        "Department of Science Laboratory Technology",
        "Department of Social Science",
        "Department of Statistics",
        "Department of Technology and Vocational Education",
        "Department of Urban and Regional Planning",
        "Department of Water Resources and Environmental establishing",
        "Entrepreneurship Centre",
        "School Of General Studies"],
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

    // Define pattern-response pairs for pattern matching
    const patterns = [
        { pattern: /history|about adustech|adustech history/i, response: adustechInfo.history },
        { pattern: /faculty|faculties/i, response: `ADUSTECH has the following faculties:\n- ${adustechInfo.faculties.join("\n- ")}` },
        { pattern: /departments?/i, response: `ADUSTECH has the following departments:\n- ${adustechInfo.departments.join("\n- ")}` },
        { pattern: /teaching staff|lecturers?/i, response: `ADUSTECH has approximately ${adustechInfo.teachingStaff} teaching staff.` },
        { pattern: /non[-\s]?teaching staff/i, response: `ADUSTECH has approximately ${adustechInfo.nonTeachingStaff} non-teaching staff.` },
        { pattern: /directorates?|directorate/i, response: `ADUSTECH has the following directorates:\n- ${adustechInfo.directorates.join("\n- ")}` },
        { pattern: /courses?|programs?|degrees?/i, response: `ADUSTECH offers the following courses:\n- ${adustechInfo.courses.join("\n- ")}` }
    ];

    // Check against known patterns
    for (let i = 0; i < patterns.length; i++) {
        if (patterns[i].pattern.test(userInput)) {
            return patterns[i].response;
        }
    }

    // Check additional dynamic information
    for (let key in additionalInfo) {
        if (userInput.includes(key)) {
            return additionalInfo[key];
        }
    }

    // If no match is found, search online
    return await searchOnline(userInput);
}

// Function to search online via server-side API
async function searchOnline(query) {
    try {
        const response = await fetch("http://localhost:3000/search", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ query })
        });

        const data = await response.json();
        let reply = data.response;
        if (data.source) {
            reply += `\n\nSource: ${data.source}`;
        }
        return reply;
    } catch (error) {
        console.error("Error:", error);
        return "Sorry, I couldn't connect to the server. Please try again later.";
    }
}

// Function to append messages to the chat window in a single column
function appendMessage(sender, message) {
    let chatlogs = document.getElementById("chatlogs");
    let messageElement = document.createElement("div");
    messageElement.className = "message " + sender;
    messageElement.innerHTML = message.replace(/\n/g, "<br>");  // Preserve line breaks
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
