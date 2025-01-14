<template>
  <div class="coin-count-container">

    <!--  <div class="tooltip-container">
      <button class="place-boat-button">
        +Ship
        <img src="@/assets/boat-icon.png" alt="Place Boat" class="boat-icon" />
      </button>
      <span class="tooltip-text"
        >You can place a boat with Alt+Click. A ship costs 500 coins. If you
        have enough, it will be placed. If not, it won't be placed.</span
      >
    </div>-->
    <div class="coin-count">
      <!--  <img src="@/assets/gold-coin.png" alt="Gold Coin" class="coin-icon" />-->
      <span class="coin-text">${{ formattedCoinCount }}</span>
    </div>
  </div>
</template>
<script>
import { eventBus } from "@/eventBus";

export default {
  data() {
    return {
      coinCount: 0,
    };
  },
  computed: {
    formattedCoinCount() {
      return Number(this.coinCount).toLocaleString();
    }
  },
  mounted() {
    this.coinCount = localStorage.getItem("goldCoins") ?? 0;
    eventBus.on("updateGoldCoins", ()=>{this.coinCount = localStorage.getItem("goldCoins") ?? 0;});
  },
  beforeUnmount() {
    eventBus.off("updateGoldCoins", ()=>{this.coinCount = localStorage.getItem("goldCoins") ?? 0;});
  },
  methods: {
    updateCoinCount() {
      this.coinCount = localStorage.getItem("goldCoins") ?? 0;
    }
  }
};
</script>

<style scoped>
span {
  margin-top: 3px;
}

.coin-count-container {
  display: flex;
  align-items: center;
}

.coin-count {
  display: flex;
  align-items: center;
  background-color: #f8c471;
  padding: 10px 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  font-size: 1.5rem;
  color: #d35400;
 /* margin-right: 10px;*/
}

.coin-icon {
  width: 40px;
  height: 40px;
  margin-right: 10px;
}

.coin-text {
  font-weight: bold;
}

.tooltip-container {
  position: relative;
  display: inline-block;
  /*margin-right: 30px;*/
  height: 100%;
}

.place-boat-button {
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
  width: 220px;
  background-color: #555;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  top: 125%; /* Position the tooltip below the button */
  left: 50%;
  margin-left: -110px; /* Use half of the width (220/2 = 110), to center the tooltip */
  opacity: 0;
  transition: opacity 0.3s;
}

.tooltip-container:hover .tooltip-text {
  visibility: visible;
  opacity: 1;
}
</style>
