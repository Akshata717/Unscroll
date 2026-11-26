let enabled = true;

function update() {
    const existing = document.getElementById("unscroll-block");
    if (enabled && location.pathname.startsWith("/reels/")) {
        if (existing){
            return;
        }

        const screen = document.createElement("div");
        screen.id = "unscroll-block"
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
        const but = document.createElement("button");
        but.innerText = "go back to instagram";
        but.id = "myButton";
        but.style.cssText = `
             margin-top: 16px;
            padding: 10px 20px;
            font-size: 16px;
            color: #fff;
            background: #244b3c;
            border: none;
            border-radius: 8px;
            cursor: pointer;      
        `;
        but.addEventListener("click", () => {
        location.href = "https://www.instagram.com/";
        });  
        screen.appendChild(but);          
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
    if (area === "local" && changes.instagramEnabled) {
        enabled = changes.instagramEnabled.newValue;
        update();
    }
});

window.addEventListener("insta-navigate-finish", update);