let enabled = true;


function onPlay(e) {
    if (e.target instanceof HTMLVideoElement){ 
        e.target.pause();
    }
}

function blockPlayback(on) {
    if (on) {
        document.addEventListener("play", onPlay, true);
        document.querySelectorAll("video").forEach((v) => v.pause());
    } else {
        document.removeEventListener("play", onPlay, true);
    }
}


function update() {
    const existing = document.getElementById("unscroll-block");

    if (enabled && location.pathname.startsWith("/shorts/")) {
        blockPlayback(true);
        if (existing) {
            return;
        }

        const screen = document.createElement("div");
        
        screen.id = "unscroll-block";

        screen.style.cssText = `
            position: fixed;
            inset: 0;
            background: #FFF2B4;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-size: 40px;
            font-family: Arial, sans-serif;
            color: #15370D;
            z-index: 999999;
            text-align: center;
        `;

        const card = document.createElement("div");
        card.style.cssText = `
        background: #728E6D;
        padding: 40px 48px;
        border-radius: 16px;
        border: 1px solid #728E6D;
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
        max-width: 420px;
        `;

        card.innerHTML = `
            <h1>Unscroll.</h1>
            <h2>Not this time.</h2>
            <p>You've chosen to keep short-form videos out of your feed.</p>
        `;

        const but = document.createElement("button");
        but.innerText = "go back to youtube";
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
        location.href = "https://www.youtube.com/";
        });


            card.appendChild(but);
            screen.appendChild(card);
            document.body.appendChild(screen);
    } else {
        blockPlayback(false);
        if (existing){
            existing.remove();
        }
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