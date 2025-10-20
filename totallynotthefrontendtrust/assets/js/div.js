
/* hop off, skids */
window.onload = function() {
    console.log("Window loaded, attempting to load particles.js");
    particlesJS.load('particles-js', '/assets/json/particles.json', function() {
        console.log('callback - particles.js config loaded');
    });
};
const savedTheme = localStorage.getItem('background') || 'catppuccin-mochaa';
document.body.setAttribute('background', savedTheme);

// Define the setTheme function globally
function setBackground(background) {
    document.body.setAttribute('background', background);
    localStorage.setItem('background', background);

    // Show alert when background is changed
    alert("Background has been changed to: " + background);
}
const savedBackground = localStorage.getItem('theme') || 'whatss';
document.body.setAttribute('theme', savedBackground);

// Define the setTheme function globally
function setTheme(theme) {
    document.body.setAttribute('theme', theme);
    localStorage.setItem('theme', theme);
    // Show alert when theme is changed
    alert("Theme has been changed to: " + theme);   
}
class TypeDown {
    constructor(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.period = parseInt(period, 10) || 2000;
        this.txt = "";
        this.isDeleting = false;
        this.currentWordIndex = -1; // Start with no word selected
        this.tick();
    }

    tick() {
        // Select the next word only when the current one is fully displayed or deleted
        if (!this.isDeleting && this.txt === "") {
            this.currentWordIndex = Math.floor(Math.random() * this.toRotate.length);
        }

        const fullTxt = this.toRotate[this.currentWordIndex];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="typewriter">' + this.txt + "</span>";

        let delta = 150 - Math.random() * 250;

        if (this.isDeleting) {
            delta /= 2; // Speed up deletion
        }

        if (!this.isDeleting && this.txt === fullTxt) {
            delta = this.period; // Pause before deleting
            this.isDeleting = true; // Start deleting
        } else if (this.isDeleting && this.txt === "") {
            this.isDeleting = false; // Finished deleting
            delta = 500; // Delay before starting the next word
        }

        setTimeout(() => this.tick(), delta);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const elements = document.getElementsByClassName("random-word-generator");
    for (let i = 0; i < elements.length; i++) {
        const toRotate = elements[i].getAttribute("randomWords");
        const period = elements[i].getAttribute("time");
        if (toRotate) {
            new TypeDown(elements[i], JSON.parse(toRotate), period);
        }
    }
});


// new code
const particles = [];
const statusElement = document.getElementById('status');

// Create the particle container in JavaScript
const particleContainer = document.createElement('div');
particleContainer.className = 'particle-container';
document.body.appendChild(particleContainer);

// Define the words for the random word function
const words = [
    "Games, Apps, Music, Anime, UI",
    "Ragebait Teachers today!",
    "Jump Lil Bro",
    "I hate iPad kids",
    "Athletics is fun!",
    "Copyright DR",
    "Lil Baby",
    "I love rap + Basketball + Roblox + Coding!",
];

// --- Status and Battery Display ---
function updateStatus() {
    const time = new Date();
    const hours = String(time.getHours()).padStart(2, '0');
    const minutes = String(time.getMinutes()).padStart(2, '0');
    const seconds = String(time.getSeconds()).padStart(2, '0');
    const currentTime = `${hours}:${minutes}:${seconds}`;

    navigator.getBattery().then(battery => {
        const batteryLevel = Math.round(battery.level * 100);
        const charging = battery.charging ? '🔌⚡ Charging' : '🔋 Not Charging';
        statusElement.textContent = `${currentTime} | Battery: ${batteryLevel}% (${charging})`;
    });
}

// Update the status every second
setInterval(updateStatus, 1000);

// --- Particle Creation and Management ---
function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    const size = Math.random() * 4 + 2; // Particle size between 2px and 6px
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    // Position the particle randomly within the viewport
    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.top = `${Math.random() * 100}vh`;

    particleContainer.appendChild(particle);
    particles.push(particle);

    // Remove the particle after some time
    setTimeout(() => {
        particle.remove();
        particles.splice(particles.indexOf(particle), 1);
    }, 5000); // Particles last for 5 seconds
}

// Create a particle every 200ms
setInterval(createParticle, 200);

// --- Particle Connections ---
function connectParticles() {
    const distance = 150; // Connect particles within this distance

    // Clear all existing connection lines from the container
    const existingLines = particleContainer.querySelectorAll('.line');
    existingLines.forEach(line => line.remove());

    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const p1 = particles[i];
            const p2 = particles[j];

            // Get particle positions relative to the viewport
            const p1Rect = p1.getBoundingClientRect();
            const p2Rect = p2.getBoundingClientRect();

            const dx = p2Rect.left - p1Rect.left;
            const dy = p2Rect.top - p1Rect.top;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < distance) {
                const connectionLine = document.createElement('div');
                connectionLine.className = 'line';
                const angle = Math.atan2(dy, dx);

                connectionLine.style.width = `${dist}px`;
                connectionLine.style.transform = `translate(${p1Rect.left}px, ${p1Rect.top}px) rotate(${angle}rad)`;
                particleContainer.appendChild(connectionLine);
            }
        }
    }
}

// Use requestAnimationFrame for smoother line animations
function animateConnections() {
    connectParticles();
    requestAnimationFrame(animateConnections);
}
// Start the animation loop
animateConnections();

// --- Random Word Display ---
function generateRandomWord() {
    const wordDisplay = document.getElementById('randomWord');

    // Start shrinking effect
    wordDisplay.style.transform = 'scale(0)';
    wordDisplay.style.opacity = '0';

    // After the shrink animation, change the word
    setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * words.length);
        wordDisplay.innerText = words[randomIndex];

        // Start growing effect
        wordDisplay.style.transform = 'scale(1)';
        wordDisplay.style.opacity = '1';
    }, 500); // Wait for half a second for the shrink animation to complete
}

// Automatically change the word every 2 seconds
setInterval(generateRandomWord, 2000);



      // Music
    document.addEventListener('DOMContentLoaded', () => {
        // --- Music Player Setup ---
        const audioPlayer = document.getElementById('audio-player');
        const playPauseButton = document.getElementById('play-pause-button');
        const prevButton = document.getElementById('prev-button');
        const nextButton = document.getElementById('next-button');
        const currentSongTitle = document.getElementById('current-song-title');
        const musicListDiv = document.getElementById('music-list');
        const musicSearchInput = document.getElementById('music-search');

        if (audioPlayer && playPauseButton && prevButton && nextButton && currentSongTitle && musicListDiv && musicSearchInput) {
            const allSongs = [
                { name: "Young, Black & Rich - Melly Mike", url: "https://github.com/razzlerazing4/music-file-storage/raw/refs/heads/main/ybr.mp3" },
                { name: "From My Window - Juicе WRLD", url: "https://github.com/razzlerazing4/music-file-storage/raw/refs/heads/main/frommywindowCUH.mp3" }, // good
                { name: "Hope - XXXTentacion", url: "https://github.com/razzlerazing4/music-file-storage/raw/refs/heads/main/hope.mp3" },
                { name: "Pray for me - Kendrick Lamar & The Weeknd", url: "https://github.com/razzlerazing4/music-file-storage/raw/refs/heads/main/pfm.mp3" },
                { name: "Prove it - 21 Savage", url: "https://github.com/razzlerazing4/music-file-storage/raw/refs/heads/main/proveit.mp3" }, // good
                { name: "Ransom - Lil Tecca", url: "https://github.com/razzlerazing4/music-file-storage/raw/refs/heads/main/ransomCUH.mp3" }, // good
                { name: "Lifestylе - Rich Gang", url: "https://github.com/razzlerazing4/music-file-storage/raw/refs/heads/main/life.mp3" }, // good
                { name: "Big Dawgs - Hanumankind", url: "https://github.com/razzlerazing4/music-file-storage/raw/refs/heads/main/bigdawgs.mp3" }, // good
                { name: "STD - Glorb", url: "https://github.com/razzlerazing4/music-file-storage/raw/refs/heads/main/std.mp3" }, // good
                { name: "The Bottom - Glorb", url: "https://github.com/razzlerazing4/music-file-storage/raw/refs/heads/main/bottom.mp3" }, // good
                { name: "The Bottom 2 - Glorb", url: "https://github.com/razzlerazing2/Destiny-Rise-6.0/raw/d86f2ebaa83bc5d42ff428708d67fcb6a9fa5fc7/totallynotthefrontendtrust/assets/media/_music/bottom2.mp3" }, // good
                { name: "The Bottom 3 - Glorb", url: "https://github.com/razzlerazing2/Destiny-Rise-6.0/raw/d86f2ebaa83bc5d42ff428708d67fcb6a9fa5fc7/totallynotthefrontendtrust/assets/media/_music/bottom3.mp3" }, // good
                { name: "HAPPY - NF", url: "https://github.com/razzlerazing4/music-file-storage/raw/refs/heads/main/HAPPY.mp3" }, // good
                { name: "Hide - Juicе WRLD", url: "https://github.com/razzlerazing4/music-file-storage/raw/refs/heads/main/hide.mp3" }, // good
                { name: "Feel It - d4vvd", url: "https://github.com/razzlerazing4/music-file-storage/raw/refs/heads/main/feel.mp3" }, // good
                // { name: "FE!N - Travis Scott", url: "/assets/media/_music/fein.mp3" }, // not good
                { name: "Let You Down - NF", url: "https://github.com/razzlerazing4/music-file-storage/raw/refs/heads/main/letyadown.mp3" }, // good
                { name: "Not like us - Kendrick Lamar", url: "https://github.com/razzlerazing4/music-file-storage/raw/refs/heads/main/nlu.mp3" }, // good
                { name: "Fight back - Neffex", url: "https://github.com/razzlerazing4/music-file-storage/raw/refs/heads/main/fbn.mp3" }, // good
                 { name: "Crown Neffex", url: "https://github.com/razzlerazing2/Destiny-Rise-6.0/raw/d86f2ebaa83bc5d42ff428708d67fcb6a9fa5fc7/totallynotthefrontendtrust/assets/media/_music/crown-Lil'Cuzzin.mp3" },
                { name: "Grateful - Neffex", url: "https://github.com/razzlerazing4/music-file-storage/raw/refs/heads/main/thankful.mp3" }, // good
                { name: "Roses - Juice WRLD", url: "https://github.com/razzlerazing4/music-file-storage/raw/refs/heads/main/rosesCUH.mp3" }, // good
                { name: "Burn - Juice WRLD", url: "https://github.com/razzlerazing2/Destiny-Rise-6.0/raw/d86f2ebaa83bc5d42ff428708d67fcb6a9fa5fc7/totallynotthefrontendtrust/assets/media/_music/burnjw.mp3" }, // good
                { name: "Squabble up - Kendrick Lamar", url: "https://github.com/razzlerazing4/music-file-storage/raw/refs/heads/main/squabbleup.mp3" }, // good
            ];

            let filteredPlaylist = [...allSongs];
            let currentSongIndex = 0;

            function loadSong(index) {
                if (filteredPlaylist.length === 0) {
                    audioPlayer.src = '';
                    currentSongTitle.textContent = 'No songs in playlist';
                    playPauseButton.disabled = true;
                    prevButton.disabled = true;
                    nextButton.disabled = true;
                    return;
                }

                currentSongIndex = (index + filteredPlaylist.length) % filteredPlaylist.length;
                const song = filteredPlaylist[currentSongIndex];
                audioPlayer.src = song.url;
                currentSongTitle.textContent = song.name;
                audioPlayer.play().catch(error => {
                    console.error("Autoplay prevented:", error);
                });
                playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
                updateActiveSongInList();
                playPauseButton.disabled = false;
                prevButton.disabled = false;
                nextButton.disabled = false;
            }

            function togglePlayPause() {
                if (audioPlayer.paused) {
                    audioPlayer.play();
                    playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
                } else {
                    audioPlayer.pause();
                    playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
                }
            }

            function playNextSong() {
                loadSong(currentSongIndex + 1);
            }

            function playPrevSong() {
                loadSong(currentSongIndex - 1);
            }

            function renderMusicList() {
                musicListDiv.innerHTML = '';
                if (filteredPlaylist.length === 0) {
                    musicListDiv.innerHTML = '<p class="no-music-message">No matching music found. Try a different search.</p>';
                    return;
                }

                filteredPlaylist.forEach((song, index) => {
                    const musicItem = document.createElement('div');
                    musicItem.classList.add('music-item');
                    musicItem.setAttribute('data-index', index);
                    musicItem.innerHTML = `
                        <div class="music-info">
                            <i class="fas fa-music"></i>
                            <span>${song.name}</span>
                        </div>
                        <div class="item-actions">
                            <button class="play-song-btn" title="Play This song"><i class="fas fa-play"></i></button>
                            <button class="ai-analyze-btn" title="Get AI analysis ✨"><i class="fas fa-magic"></i></button>
                        </div>
                        <div class="ai-analysis-output hidden">
                            <p class="loading-analysis hidden">Analyzing...</p>
                            <p class="analysis-text"></p>
                        </div>
                    `;
                    musicListDiv.appendChild(musicItem);

                    musicItem.querySelector('.play-song-btn').addEventListener('click', () => {
                        loadSong(index);
                    });

                    musicItem.querySelector('.ai-analyze-btn').addEventListener('click', (event) => {
                        getSongAnalysis(song.name, event.currentTarget);
                    });
                });
                updateActiveSongInList();
            }

            function updateActiveSongInList() {
                document.querySelectorAll('.music-item').forEach(item => {
                    item.classList.remove('active');
                });
                const activeItem = document.querySelector(`.music-item[data-index="${currentSongIndex}"]`);
                if (activeItem) {
                    activeItem.classList.add('active');
                }
            }

            function searchMusic() {
                const searchTerm = musicSearchInput.value.toLowerCase();
                filteredPlaylist = allSongs.filter(song =>
                    song.name.toLowerCase().includes(searchTerm)
                );
                renderMusicList();

                const currentSong = filteredPlaylist[currentSongIndex];
                if (!currentSong || !currentSong.name.toLowerCase().includes(searchTerm)) {
                    if (filteredPlaylist.length > 0) {
                        loadSong(0);
                    } else {
                        audioPlayer.pause();
                        audioPlayer.src = '';
                        currentSongTitle.textContent = 'No songs in playlist';
                        playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
                        playPauseButton.disabled = true;
                        prevButton.disabled = true;
                        nextButton.disabled = true;
                    }
                } else {
                    updateActiveSongInList();
                }
            }

            async function getSongAnalysis(songName, buttonElement) {
                const musicItem = buttonElement.closest('.music-item');
                const analysisOutput = musicItem.querySelector('.ai-analysis-output');
                const loadingAnalysis = musicItem.querySelector('.loading-analysis');
                const analysisText = musicItem.querySelector('.analysis-text');

                if (!analysisOutput.classList.contains('hidden') && analysisText.textContent !== '') {
                    analysisOutput.classList.add('hidden');
                    analysisText.textContent = '';
                    return;
                }

                analysisOutput.classList.remove('hidden');
                loadingAnalysis.classList.remove('hidden');
                analysisText.textContent = '';
                buttonElement.disabled = true;

                const prompt = ` Provide a brief creative description and suggest a mood/vibe for the song titled "${songName}". Focus on feelings it evokes`;
                const chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
                const payload = { contents: chatHistory };
                const apiKey = ""; // Leave this as-is; Canvas will provide it at runtime.
                const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

                try {
                    const response = await fetch(apiUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload)
                    });

                    if (!response.ok) {
                        const errorData = await response.json();
                        console.error("Gemini API Error:", response.status, response.statusText, errorData);
                        analysisText.textContent = `Error: could not get analysis. ${errorData.error.message || 'Please try again.'}`;
                        return;
                    }

                    const result = await response.json();

                    if (result.candidates && result.candidates.length > 0 &&
                        result.candidates[0].content && result.candidates[0].content.parts &&
                        result.candidates[0].content.parts.length > 0) {
                        analysisText.textContent = result.candidates[0].content.parts[0].text;
                    } else {
                        analysisText.textContent = "Could not generate analysis for this song..";
                        console.error("Unexpected Gemini API response structure:", result);
                    }
                } catch (error) {
                    console.error("Network or API Call Error:", error);
                    analysisText.textContent = "Failed to connect to AI. Check internet connection.";
                } finally {
                    loadingAnalysis.classList.add('hidden');
                    buttonElement.disabled = false;
                }
            }

            // Event Listeners for player controls
            playPauseButton.addEventListener('click', togglePlayPause);
            prevButton.addEventListener('click', playPrevSong);
            nextButton.addEventListener('click', playNextSong);
            audioPlayer.addEventListener('ended', playNextSong);
            musicSearchInput.addEventListener('keyup', searchMusic);
            renderMusicList();
            loadSong(currentSongIndex);
            audioPlayer.addEventListener('canplaythrough', () => {
                if (audioPlayer.paused && audioPlayer.currentTime === 0) {
                    playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
                }
            }, { once: true });
            audioPlayer.addEventListener('play', () => {
                playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
            });
            audioPlayer.addEventListener('pause', () => {
                playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
            });
        }

  // --- Live Clock ---
            function updateClock() {
                const now = new Date();
                let hours = now.getHours();
                let minutes = now.getMinutes();
                let seconds = now.getSeconds();
                const ampm = hours >= 12 ? 'PM' : 'AM';
                hours = hours % 12;
                hours = hours ? hours : 12;
                minutes = minutes < 10 ? '0' + minutes : minutes;
                seconds = seconds < 10 ? '0' + seconds : seconds;
                const timeString = `${hours}:${minutes}:${seconds} ${ampm}`;
                const clockElem = document.getElementById('live-clock');
                if (clockElem) {
                    clockElem.textContent = timeString;
                }
            }
            setInterval(updateClock, 1000);
            updateClock();

            // --- Intro Animation ---
            const preloader = document.getElementById('preloader');
            const animatedElements = document.querySelectorAll('.animated-content');
            setTimeout(() => {
                if (preloader) preloader.classList.add('hidden');
                animatedElements.forEach(element => {
                    element.classList.add('show');
                });
                // --- Active Navigation Link ---
                const navLinks = document.querySelectorAll('.nav-links li a');
                const currentPath = window.location.pathname;
                navLinks.forEach(link => {
                    const normalizedCurrentPath = currentPath.endsWith('/') && currentPath.length > 1
                        ? currentPath.slice(0, -1)
                        : currentPath;
                    const normalizedLinkPath = link.pathname.endsWith('/') && link.pathname.length > 1
                        ? link.pathname.slice(0, -1)
                        : link.pathname;
                    if (normalizedLinkPath === normalizedCurrentPath ||
                        (normalizedLinkPath === '/home' && normalizedCurrentPath === '/')) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }, 1000);
    });




       //  }, 500); // Delay for preloader to finish
    // });

    /*🎵 BGM Playlist Player */
    /* I am commenting this out, bcuz i don't need these songs playlist. I already got a thing not ayo but yuh 🤨*/
    /*
      <audio id="bgm" autoplay hidden></audio>
      const playlist = [
          "/assets/media/audio/dabottom2.mp3",
          "/assets/media/audio/dabottom.mp3"
      ];
      const audio = document.getElementById("bgm");
      let currentTrack = parseInt(localStorage.getItem("bgmTrack")) || 0;
      let currentTime = parseFloat(localStorage.getItem("bgmTime")) || 0;
      audio.src = playlist[currentTrack];
      audio.currentTime = currentTime;
      audio.play().catch(() => {
          // Some browsers require interaction before playing audio
      });
      setInterval(() => {
          localStorage.setItem("bgmTrack", currentTrack);
          localStorage.setItem("bgmTime", audio.currentTime);
      }, 1000);
      audio.addEventListener("ended", () => {
          currentTrack = (currentTrack + 1) % playlist.length;
          localStorage.setItem("bgmTrack", currentTrack);
          localStorage.setItem("bgmTime", 0);
          audio.src = playlist[currentTrack];
          audio.play();
      });
    */
   const preloader = document.createElement("div");
preloader.id = "preloader";

const spinner = document.createElement("div");
spinner.className = "spinner";

// Add emoji inside an <h1> tag
const emoji = document.createElement("h1");
 emoji.textContent = "";
//emoji.textContent = "🔥";
// Nest elements
spinner.appendChild(emoji);
preloader.appendChild(spinner);

// Append to body
document.body.appendChild(preloader);
function aboutblank() {
            var win = window.open('about:blank');
            var url = 'index.html';
            var iframe = win.document.createElement('iframe');
            iframe.style = "position:fixed;width:100vw;height:100vh;top:0px;left:0px;right:0px;bottom:0px;z-index:2147483647;background-color:white;border:none;";
            iframe.src = url;
            win.document.body.appendChild(iframe);

            window.location.href = 'https://portal.friscoisd.org';
        }
// Function to update the battery percentage
async function updateBattery() {
  const battery = await navigator.getBattery();
  const batteryPercentageElement = document.getElementById("battery-percentage");
  const batteryFillElement = document.getElementById("battery-fill");
  const level = Math.floor(battery.level * 100);

  batteryPercentageElement.textContent = `${level}%`;
  batteryFillElement.style.width = `${level}%`;

  // Update the color of the battery fill based on level
  if (level < 20) {
    batteryFillElement.style.backgroundColor = "red";
  } else if (level < 50) {
    batteryFillElement.style.backgroundColor = "orange";
  } else {
    batteryFillElement.style.backgroundColor = "white";
  }
}
updateBattery();
navigator.getBattery().then((battery) => {
  battery.addEventListener("levelchange", updateBattery);
});
// Favicon
function setFavicon(url) {
    const link = document.createElement('link');
    link.rel = 'icon';
    link.href = url;
    document.head.appendChild(link);
}
setFavicon('/assets/media/favicon/_trick.png');
// Title
function setTitle(title) {
    document.title = title;
}
window.onload = function() {
    setTitle("Math Bros. | Dashboard");
};
/*
window.onbeforeunload = function (event) {
  const confirmationMessage = 'Leave Site?';
  (event || window.event).returnValue = confirmationMessage;
  return confirmationMessage;
};*/