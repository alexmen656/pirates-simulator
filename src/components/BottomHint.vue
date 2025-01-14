<template>
  <div class="bottom-hint">
    <p>{{ hint }}</p>
  </div>
</template>

<script>
export default {
  props: ["hint"],
  /* data() {
    return {
      hintMessage:
        "Place your ship by holding Shift and then clicking anywhere on the land.",
    };
  },*/
};
</script>

<style scoped>
.bottom-hint {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  text-align: center;
  padding: 10px;
  font-size: 16px;
  z-index: 1000;
}
</style>
