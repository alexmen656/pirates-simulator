<template>
  <div id="app" @click="startMusicOnInteraction">
    <router-view> </router-view>
    <audio
      ref="backgroundMusic"
      src="https://alex.polan.sk/pirates-simulator/pirate-music.mp3"
      loop
      autoplay
    ></audio>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      musicStarted: false,
      fadeDuration: 5000, // Duration for fade-in and fade-out in milliseconds
    };
  },
  mounted() {
    if (localStorage.getItem("language") === null) {
      localStorage.setItem("language", "en");
    }
    this.$i18n.locale = localStorage.getItem("language");
    //
    // this.playBackgroundMusic();
  },
  methods: {
    startMusicOnInteraction() {
      if (!this.musicStarted) {
        this.playBackgroundMusic();
        this.musicStarted = true;
        // Remove the event listener after the music has started
        this.$el.removeEventListener("mousemove", this.startMusicOnInteraction);
      }
    },
    playBackgroundMusic() {
      const audio = this.$refs.backgroundMusic;
      audio.volume = 0.1; // Start at 10% volume
      audio
        .play()
        .then(() => {
          this.fadeIn(audio);
        })
        .catch((error) => {
          console.error("Error playing background music:", error);
        });

      // Set up fade-out effect
      audio.addEventListener("timeupdate", () => {
        const timeLeft = audio.duration - audio.currentTime;
        if (timeLeft < this.fadeDuration / 1000) {
          // this.fadeOut(audio, timeLeft * 1000);
        }
      });
    },
    fadeIn(audio) {
      const step = 0.1 / (this.fadeDuration / 100); // Calculate the step size for each interval
      const interval = setInterval(() => {
        if (audio.volume < 1.0) {
          audio.volume = Math.min(audio.volume + step, 1.0);
        } else {
          clearInterval(interval);
        }
      }, 100);
    },
    fadeOut(audio, duration) {
      const step = audio.volume / (duration / 100); // Calculate the step size for each interval
      const interval = setInterval(() => {
        if (audio.volume > 0.0) {
          audio.volume = Math.max(audio.volume - step, 0.0);
        } else {
          clearInterval(interval);
        }
      }, 100);
    },
  },
};
</script>

<style>
@font-face {
  font-family: "Blackpearl";
  src: url("@/Blackpearl.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
}

#map {
  width: 100%;
  height: 100%;
}

body,
html {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  font-family: "Blackpearl", sans-serif !important;
  cursor: pointer;
}

.container .map-legend {
  position: absolute;
  z-index: 1005;
  top: 15px;
  left: 15px;
}

.map-legend div {
  margin-bottom: 5px;
  width: 40px;
  font-size: 12px;
  color: #fff;
  padding: 4px 7px;
  border-radius: 5px;
}

.container {
  position: relative;
}

.app-header {
  text-align: center;
  margin: 0;
  z-index: 1001; /* Ensure the header is above other elements */
  position: absolute;
  background-color: transparent; /* Completely transparent background */
  text-align: center;
  justify-content: center;
  width: 100%;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.6),
    rgba(0, 0, 0, 0)
  ); /* Gradient shadow from top */
  margin-bottom: 10px;
}

.app-header h1 {
  font-size: 2em;
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  margin-bottom: 5px;
}

.app-description {
  font-size: 1.2em;
  color: #fff;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.5;
  padding: 0 20px;
  margin-top: 5px;
}

/*class="mk-top-right-controls-container mk-top-right-controls-container-children-two mk-controls-container-controls-larger"*/

.mk-top-right-controls-container {
  z-index: 1010;
}
</style>
