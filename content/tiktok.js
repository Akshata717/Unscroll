let enabled = true;
let pauseTimer = null;

function update() {
    const existing = document.getElementById("unscroll-block");

    if (enabled) {
        if (existing) return;

        const screen = document.createElement("div");
        screen.id = "unscroll-block";
        screen.innerHTML = `
            <h1>Unscroll.</h1>
            <h2>Not this time.</h2>
            <p>You've chosen to keep short-form videos out of your feed.</p>
        `;
        screen.style.cssText = `
            position: fixed;
            inset: 0;
            background: #f5f7f5;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-family: Arial, sans-serif;
            color: #244b3c;
            z-index: 2147483647;
            text-align: center;
        `;
        document.body.appendChild(screen);

        // TikTok autoplays, so keep videos paused behind the overlay
        pauseTimer = setInterval(() => {
            document.querySelectorAll("video").forEach((v) => v.pause());
        }, 500);
    } else {
        existing?.remove();
        clearInterval(pauseTimer);
        pauseTimer = null;
    }
}

chrome.storage.local.get({ tiktokEnabled: true }, (result) => {
    enabled = result.tiktokEnabled;
    update();
});

chrome.storage.onChanged.addListener((changes, area) => {
    if (area === "local" && changes.tiktokEnabled) {
        enabled = changes.tiktokEnabled.newValue;
        update();
    }
});