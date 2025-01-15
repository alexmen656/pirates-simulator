<template>
  <div class="new-ship-container">
    <div class="music-container">
      <button class="place-boat-button" @click="toggleMusic">
        <span style="display: block; height: 28px">
          {{ isMusicPlaying ? "🔊" : "🔇" }}</span
        >
      </button>
    </div>
    <div class="tooltip-container">
      <button class="place-boat-button">
        <span> +{{ $t("ship") }} (${{ formattedShipPrice }})</span>
        <!-- <img src="@/assets/boat-icon.png" alt="Place Boat" class="boat-icon" />-->
      </button>
      <span class="tooltip-text"
        ><h2>ALT/OPTION + CLICK</h2>
        <br />{{
          $t("ship_info", { formattedShipPrice: formattedShipPrice })
        }}</span
      >
    </div>
  </div>
</template>
<script>
import { eventBus } from "@/eventBus";
import { updateShipPrice } from "@/shipLogic";

export default {
  data() {
    return {
      coinCount: 0,
      isMusicPlaying: true,
      shipPrice: 750,
    };
  },
  computed: {
    formattedShipPrice() {
      return this.shipPrice.toLocaleString();
    },
  },
  mounted() {
    this.coinCount = localStorage.getItem("goldCoins") ?? 0;
    eventBus.on("updateGoldCoins", this.updateCoinCount);
    eventBus.on("shipPriceUpdated", this.updateShipPrice);
    updateShipPrice();
    this.checkMusicStatus();
    document.addEventListener("mousemove", this.checkMusicStatus);
  },
  beforeUnmount() {
    eventBus.off("updateGoldCoins", this.updateCoinCount);
    eventBus.off("shipPriceUpdated", this.updateShipPrice);
  },
  methods: {
    updateCoinCount() {
      this.coinCount = localStorage.getItem("goldCoins") ?? 0;
    },
    updateShipPrice(price) {
      this.shipPrice = price;
    },
    toggleMusic() {
      const audio = document.querySelector("audio");
      if (audio) {
        if (this.isMusicPlaying) {
          audio.pause();
        } else {
          audio.play();
        }
        this.isMusicPlaying = !this.isMusicPlaying;
      }
    },
    checkMusicStatus() {
      const audio = document.querySelector("audio");
      if (audio) {
        this.isMusicPlaying = !audio.paused;
      }
    },
  },
};
</script>

<style scoped>
.tooltip-container {
  position: relative;
  display: inline-block;
  /*margin-right: 30px;*/
  height: 100%;
  margin-left: 6px;
}

.music-container {
  position: relative;
  display: inline-block;
  /*margin-right: 30px;*/
  height: 100%;
}

/*.place-boat*/
button {
  background-color: #3498db;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 1.5rem;
  /* margin: 4px 2px;*/
  cursor: pointer;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  height: 100%;
}

.boat-icon {
  width: 20px;
  height: 20px;
}

.tooltip-text {
  visibility: hidden;
  width: 350px;
  background-color: #555;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  top: 125%;
  left: 100%;
  margin-left: -210px;
  opacity: 0;
  transition: opacity 0.3s;
}

.tooltip-container:hover .tooltip-text {
  visibility: visible;
  opacity: 1;
}

h2 {
  margin: 0;
  padding-top: 10px;
}
</style>
