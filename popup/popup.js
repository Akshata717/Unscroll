const toggles = {
  youtubeToggle: "youtubeEnabled",
  tiktokToggle: "tiktokEnabled"
};

async function init() {
  for (const [elementId, key] of Object.entries(toggles)) {
    const checkbox = document.getElementById(elementId);
    const result = await chrome.storage.local.get({ [key]: true });
    checkbox.checked = result[key];

    checkbox.addEventListener("change", () => {
      chrome.storage.local.set({ [key]: checkbox.checked });
    });
  }
}

init();