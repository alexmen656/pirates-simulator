<template>
  <div class="docu-view">
    <div class="overlay"></div>
    <div class="content">
      <h1>Song: A Robust Crew</h1>
      <p>
        Composer: Darren Curtis Website:
        https://www.youtube.com/user/DesperateMeasurez License: Free To Use
        YouTube license youtube-free Music powered by BreakingCopyright:
        https://breakingcopyright.com
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
  min-height: 100vh; /* Ensure the container takes at least the full viewport height */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 1.5rem;
  overflow-y: auto; /* Ensure the content is scrollable */
}

.overlay {
  position: fixed; /* Use fixed positioning to cover the entire viewport */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7); /* Dark overlay with 70% opacity */
  z-index: 1;
}

.content {
  position: relative;
  z-index: 2;
  color: white; /* Ensure text is readable on dark overlay */
  padding: 20px;
  max-width: 800px; /* Optional: limit the width of the content for better readability */
}
</style>
