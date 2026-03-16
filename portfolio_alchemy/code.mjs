const startButton = document.getElementById("startButton");

startButton.addEventListener("click", startSession);

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
            body: JSON.stringify({email, nick, pin})
        });

        const data = await response.json();

        console.log(data); // Shows the full response in the browser console

        // Show the token or error in the page
        document.getElementById("result").textContent =
            data.token ? "Token received: " + data.token
                       : "Error: " + (data.error || "unknown");
    } catch (err) {
        console.error(err);
        document.getElementById("result").textContent = "Fetch error!";
    }
 }
 