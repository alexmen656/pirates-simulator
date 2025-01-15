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
</style>
