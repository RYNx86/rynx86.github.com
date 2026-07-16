document.addEventListener("DOMContentLoaded", () => {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    } else {
        console.error("Lucide icon package was unable to load via CDN.");
    }

    // Audio Player Feature Engine
    const playerCard = document.getElementById("cassettePlayer");
    const audioTrack = document.getElementById("cassetteAudio");
    const statusText = document.getElementById("cassetteStatus");

    if (playerCard && audioTrack) {
        playerCard.addEventListener("click", () => {
            if (audioTrack.paused) {
                // Play track and update states
                audioTrack.play()
                    .then(() => {
                        playerCard.classList.add("playing");
                        statusText.textContent = "[ PLAYING ]";
                    })
                    .catch(err => {
                        console.warn("Audio playback delayed: Interactions required before direct autoplay streaming.", err);
                        statusText.textContent = "[ CLICK TO PLAY ]";
                    });
            } else {
                // Pause track and clear execution states
                audioTrack.pause();
                playerCard.classList.remove("playing");
                statusText.textContent = "[ PAUSED ]";
            }
        });
    }
});
