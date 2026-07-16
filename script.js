// Initialize and inject the Lucide Vector Icon system onto HTML tags using [data-lucide]
document.addEventListener("DOMContentLoaded", () => {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    } else {
        console.error("Lucide icon package was unable to load via CDN.");
    }
});
