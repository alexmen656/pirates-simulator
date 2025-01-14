<template>
  <div class="top-hint-container" @click="restartTyping">
    <div class="top-hint">
      <p>{{ displayedText }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "TopHint",
  props: {
    hint: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      displayedText: '',
      typingTimeout: null,
      isTyping: false
    };
  },
  watch: {
    hint(newHint) {
      this.typeText(newHint);
    }
  },
  mounted() {
    this.typeText(this.hint);
  },
  methods: {
    typeText(text) {
      if (this.isTyping && this.typingTimeout) {
        clearTimeout(this.typingTimeout);
      }
      this.displayedText = '';
      let index = 0;
      const speed = 40; // Adjust typing speed here
      this.isTyping = true;

      const type = () => {
        if (index < text.length) {
          this.displayedText += text.charAt(index);
          index++;
          this.typingTimeout = setTimeout(type, speed);
        } else {
          this.isTyping = false;
        }
      };

      type();
    },
    restartTyping() {
      this.typeText(this.hint);
    }
  }
};
</script>

<style scoped>
.top-hint-container {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 10px;
  z-index: 1000;
}

.top-hint {
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 16px;/*12px*/
  color: white;
  text-align: center;
  padding: 10px;
  font-size: 22px;
  width: 55%;
}

.top-hint > p {
  margin: 10px;
}
</style>