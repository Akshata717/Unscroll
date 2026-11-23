let enabled = true;

function update() {
    const existing = document.getElementById("unscroll-block");

    if (enabled && location.pathname.startsWith("/shorts/")) {
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
            z-index: 999999;
            text-align: center;
        `;
        document.body.appendChild(screen);
        document.querySelectorAll("video").forEach((v) => v.pause());
    } else if (existing) {
        existing.remove();
    }
}

chrome.storage.local.get({ youtubeEnabled: true }, (result) => {
    enabled = result.youtubeEnabled;
    update();
});

chrome.storage.onChanged.addListener((changes, area) => {
    if (area === "local" && changes.youtubeEnabled) {
        enabled = changes.youtubeEnabled.newValue;
        update();
    }
});

window.addEventListener("yt-navigate-finish", update);