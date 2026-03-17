const startButton = document.getElementById("startButton");
const loadChallengeButton = document.getElementById("loadChallengeButton");
const clueButton = document.getElementById("clueButton");
const submitAnswerButton = document.getElementById("submitAnswerButton");

let token = ""; 

startButton.addEventListener("click", startSession);
loadChallengeButton.addEventListener("click", loadChallenge);
clueButton.addEventListener("click", getClue);
submitAnswerButton.addEventListener("click", submitAnswer);

async function startSession() {
    const email = document.getElementById("email").value;
    const nick = document.getElementById("nick").value;
    const pin = document.getElementById("pin").value;

    try {
        const response = await fetch("https://alchemy-kd0l.onrender.com/start", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({ email, nick, pin })
        });

        const data = await response.json();
        console.log(data);

        if (data.token) {
            token = data.token;
            document.getElementById("result").textContent = "Token received: " + token;
            loadChallenge();
        } else {
            document.getElementById("result").textContent = "Error: " + (data.error || "unknown");
        }
    } catch (err) {
        console.error(err);
        document.getElementById("result").textContent = "Fetch error!";
    }
}

async function loadChallenge() {
    if (!token) {
        alert("You need to start a session first!");
        return;
    }

    try {
        const response = await fetch("https://alchemy-kd0l.onrender.com/status", {
            headers: {
                "Authorization": token
            }
        });

        const data = await response.json();
        console.log(data);

        document.getElementById("challengePrompt").textContent = data.prompt;
    } catch (err) {
        console.error(err);
        document.getElementById("challengePrompt").textContent = "Failed to load challenge.";
    }
}


async function submitAnswer() {
    const answer = document.getElementById("answerInput").value;

    if (!token) {
        alert("Start a session first!");
        return;
    }

    try {
        const response = await fetch("https://alchemy-kd0l.onrender.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": token
            },
            body: JSON.stringify({ answer })
        });

        const data = await response.json();
        console.log(data);

        if (data.correct) {
            document.getElementById("submitResult").textContent =
                "Correct! Points: " + data.awarded;
            loadChallenge();
        } else {
            document.getElementById("submitResult").textContent =
                "Wrong answer. Try again!";
        }

    } catch (err) {
        console.error(err);
        document.getElementById("submitResult").textContent = "Submit failed.";
    }
}