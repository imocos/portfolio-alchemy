const startButton = document.getElementById("startButton");
const loadChallengeButton = document.getElementById("loadChallengeButton");

let token = ""; // store the session token

startButton.addEventListener("click", startSession);
loadChallengeButton.addEventListener("click", loadChallenge);

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