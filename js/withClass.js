let $ = document

// Music
const songs = [
    {
        path:
            "/media/1.mp3",
        displayName: "Html Padcast",
        artist: "Ozbi",
        cover:
            "/images/music1.jpg",
    },
    {
        path: "media/2.mp3",
        displayName: "Developing",
        artist: "Flora Cash",
        cover: "/images/music2.jpg",
    },
    {
        path:
            "media/3.mp3",
        displayName: "Earn",
        artist: "Linkin Park",
        cover:
            "/images/music3.jpg",
    },
];


class music {
    constructor() {

        this.image = $.querySelector("#cover")
        this.title = $.getElementById("title")
        this.artist = $.getElementById("artist")
        this.music = $.querySelector("audio")
        this.currentTimeEl = $.getElementById("current-time")
        this.durationEl = $.getElementById("duration")
        this.progress = $.getElementById("progress")
        this.progressContainer = $.getElementById("progress-container")
        this.prevBtn = $.getElementById("prev")
        this.playBtn = $.getElementById("play")
        this.nextBtn = $.getElementById("next")
        this.background = $.getElementById("background")

        // Current Song
        this.songIndex = 0;

        // Check if Playing
        this.isPlaying = false;

        this.render()
    }

    render() {
        window.addEventListener('load', () => {
            this.loadSong(songs[this.songIndex])
        })
        // Event Listeners
        this.prevBtn.addEventListener("click", () => {
            this.prevSong()
        })

        this.nextBtn.addEventListener("click", () => {
            this.nextSong()
        })

        this.music.addEventListener("ended", () => {
            this.nextSong()
        })

        this.music.addEventListener("timeupdate", (event) => {
            this.updateProgressBar(event)
        })
        this.progressContainer.addEventListener("click", (event) => {
            this.setProgressBar(event)
        })

        // Play or Pause Event Listener
        this.playBtn.addEventListener("click", () => {
            if (this.isPlaying) {
                this.pauseSong()
            } else {
                this.playSong()
            }
        })
    }

    // Play
    playSong() {
        this.isPlaying = true;
        this.playBtn.classList.replace("fa-play", "fa-pause");
        this.playBtn.setAttribute("title", "Pause");
        this.music.play();
        // console.log(this.isPlaying);
    }

    // Pause
    pauseSong() {
        this.isPlaying = false;
        this.playBtn.classList.replace("fa-pause", "fa-play");
        this.playBtn.setAttribute("title", "Play");
        this.music.pause();
    }


    // Update DOM
    loadSong(song) {
        // console.log(song);
        this.title.textContent = song.displayName;
        this.artist.textContent = song.artist;
        this.music.src = song.path;
        this.changeCover(song.cover);
    }
    //set animation 
    changeCover(cover) {
        this.image.classList.remove("active");
        setTimeout(() => {
            this.image.src = cover;
            this.image.classList.add("active");
        }, 100);
        this.background.src = cover;
    }



    // Previous Song
    prevSong() {
        this.songIndex--;
        if (this.songIndex < 0) {
            this.songIndex = songs.length - 1;
        }
        this.loadSong(songs[this.songIndex]);
        this.playSong();
    }

    // Next Song
    nextSong() {
        this.songIndex++;
        if (this.songIndex > songs.length - 1) {
            this.songIndex = 0;
        }
        this.loadSong(songs[this.songIndex]);
        this.playSong();
    }


    // Update Progress Bar & Time
    updateProgressBar(e) {
        if (this.isPlaying) {
            const duration = e.srcElement.duration;
            const currentTime = e.srcElement.currentTime;
            // Update progress bar width
            const progressPercent = (currentTime / duration) * 100;
            progress.style.width = progressPercent + "%";
            // Calculate display for duration
            const durationMinutes = Math.floor(duration / 60);
            let durationSeconds = Math.floor(duration % 60);
            if (durationSeconds < 10) {
                durationSeconds = "0" + durationSeconds;
            }
            // Delay switching duration Element to avoid NaN
            if (durationSeconds) {
                this.durationEl.textContent = durationMinutes + ":" + durationSeconds;
            }
            // Calculate display for currentTime  
            const currentMinutes = Math.floor(currentTime / 60);
            let currentSeconds = Math.floor(currentTime % 60);
            if (currentSeconds < 10) {
                currentSeconds = "0" + currentSeconds;
            }
            this.currentTimeEl.textContent = currentMinutes + ":" + currentSeconds;
        }
    }

    // Set Progress Bar
    setProgressBar(e) {
        const width = e.target.clientWidth
        const clickX = e.offsetX
        const duration = this.music.duration
        this.music.currentTime = (clickX / width) * duration
    }

}




new music()


