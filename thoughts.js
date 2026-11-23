const ntfy_topic = "Something-long-and-random";

document.getElementById("contactForm").addEventListener("submit", async (e) => {
    e.preventDefault(); // stop the browser from doing a normal form submit

    const name = document.getElementById("name").value;
    const message = document.getElementById("message").value;
    const status = document.getElementById("status");

    try {
        const res = await fetch("https://ntfy.sh/" + ntfy_topic, {
            method: "POST",
            headers: { "Title": `Message from ${name}` },
            body: message
        });
        if (!res.ok) throw new Error(res.status);
        status.textContent = "Sent!";
        e.target.reset();
    } catch (err) {
        status.textContent = "Something went wrong: " + err.message;
    }
});