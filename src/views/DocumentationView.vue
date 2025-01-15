<template>
  <div class="docu-view">
    <div class="overlay"></div>
    <div class="content">
      <h1>Welcome to Pirates Simulator</h1>
      <p>
        Set sail and become the most legendary pirate on the high seas! Collect
        treasures, expand your fleet, and dominate the waters.
      </p>

      <h2>Goal</h2>
      <p>
        Your ultimate goal is to collect as many coins as possible and become
        the <strong>richest pirate</strong> on the seas!
      </p>
      <hr />
      <h2>How to Collect Coins?</h2>
      <p>
        Your ships and base automatically collect resources. Each resource
        corresponds to a certain amount of coins, as outlined in the "Resources"
        section, within their operating radius. Ships have a 1000 km radius,
        meaning any resource that spawns within this area will be collected.
        Similarly, your base has a larger radius of 2000 km, gathering all
        resources within its reach. You can view this on the map, where the
        ships' radius is marked in green and the base's radius in blue.
      </p>

      <h2>Resources</h2>
      <ul>
        <li><strong>Ruby:</strong> 1000 Coins, spawn rate: 1% (1 in 100)</li>
        <li><strong>Emerald:</strong> 700 Coins, spawn rate: 3% (3 in 100)</li>
        <li>
          <strong>Diamond:</strong> 300 Coins, spawn rate: 16% (16 in 100)
        </li>
        <li><strong>Gold:</strong> 100 Coins, spawn rate: 50% (50 in 100)</li>
        <li><strong>Stone:</strong> 20 Coins, spawn rate: 30% (30 in 100)</li>
      </ul>
      <hr />
      <h2>Ships</h2>
      <ul>
        <li>
          <strong>Appearance:</strong> Pin with a black background, ☠️ icon, and
          green radius.
        </li>
        <li>
          <strong>Costs:</strong> The first 3 ships cost 750 coins each.
          Subsequent ships double in cost (e.g., 1500, 3000, 6000).
        </li>
        <li><strong>Command:</strong> ALT/OPTION + CLICK to deploy a ship.</li>
        <li><strong>Radius:</strong> 1000 km operating range.</li>
      </ul>
      <hr />
      <h2>Base</h2>
      <ul>
        <li>
          <strong>Appearance:</strong> Pin with a black background, ☠️ icon, and
          blue radius.
        </li>
        <li><strong>Costs:</strong> Free to set up.</li>
        <li><strong>Command:</strong> SHIFT + CLICK to place your base.</li>
        <li><strong>Radius:</strong> 2000 km operating range.</li>
        <li><strong>Limit:</strong> Only one base allowed.</li>
      </ul>

      <h2>Other Players' Bases</h2>
      <ul>
        <li>
          <strong>Appearance:</strong> Pin with a grey background and ☠️ icon.
        </li>
      </ul>
      <hr />
      <h2>Interface</h2>
      <h3>Top-Left Corner</h3>
      <ul>
        <li>
          <strong>Next Ship Cost:</strong> Displays the cost of your next ship.
        </li>
      </ul>
      <h3>Top-Right Corner</h3>
      <ul>
        <li><strong>Coin Counter:</strong> Shows your current coin balance.</li>
        <li>
          <strong>Leaderboard:</strong> Scrollable list of the richest pirates
          (view all, not just the top 5).
        </li>
        <li>
          <strong>Language Setting:</strong> Switch between EN, DE, and ES.
        </li>
        <li><strong>Statistics:</strong> Displays various game metrics.</li>
      </ul>
      <h3>Bottom-Left Corner</h3>
      <ul>
        <li>
          <strong>Live Chat:</strong> Shows real-time actions of other players
          and allows you to send messages.
        </li>
      </ul>
      <hr />
      <h2>Get Ready to Rule the Seas!</h2>
      <p>
        Gather your fleet, plunder resources, and rise to the top of the pirate
        ranks. Adventure awaits! 🏴‍☠️
      </p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.docu-view {
  position: relative;
  background-image: url("@/bg.png");
  background-size: cover;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 1.5rem;
  overflow-y: auto;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1;
}

.content {
  position: relative;
  z-index: 2;
  color: white;
  padding: 20px;
  max-width: 800px;
}

h2,
h3 {
  margin-bottom: 0;
}

p,
ul {
  margin-top: 5px;
  margin: 0 0 50px 0;
  padding: 0;
}

ul {
  list-style-type: none;
}
</style>
