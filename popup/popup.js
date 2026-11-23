const youtubeToggle = document.getElementById("youtubeToggle");

async function init() {
  const { youtubeEnabled = true } = await chrome.storage.local.get("youtubeEnabled");
  youtubeToggle.checked = youtubeEnabled;
}

youtubeToggle.addEventListener("change", () => {
  chrome.storage.local.set({ youtubeEnabled: youtubeToggle.checked });
});

init();