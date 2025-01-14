<template>
  <div class="start-view">
    <h1>Pirates Simulator</h1>
    <div class="start-container">
      <div class="input-container">
        <input
          type="text"
          maxlength="14"
          v-model="username"
          placeholder="Enter your Username (max 15 characters)"
        />
      </div>
      <div class="buttons">
        <button @click="startGame">Start</button
        ><!--<router-link to="/game"></router-link>-->
        <button>
          <router-link to="/documentation">Documentation</router-link>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StartView",
  data() {
    return {
      username: "",
    };
  },
  mounted() {
    const verificationId = localStorage.getItem("verification_id");
    if (verificationId) {
        this.$router.push("/game");
    }
  },
  methods: {
    async startGame() {
      if (!this.username) {
        alert("Please enter a username");
        return;
      }

      try {
        const response = await this.$axios.post(
          "register.php",
          this.$qs.stringify({
            username: this.username,
          })
        );

        if (response.data.verification_id) {
          // Save username and verification ID to local storage
          localStorage.setItem("username", this.username);
          localStorage.setItem(
            "verification_id",
            response.data.verification_id
          );
          // Navigate to the game
          this.$router.push("/game");
        } else {
          alert("Failed to register user: " + response.data.error);
        }
      } catch (error) {
        console.error("Error registering user:", error);
        alert("An error occurred while registering. Please try again.");
      }
    },
    openDocumentation() {
      // Add logic to open the documentation
    },
  },
};
</script>

<style scoped>
.start-view {
  background-image: url("@/bg.png");
  background-size: cover;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 3rem;
}

h1 {
  color: white;
  margin-bottom: 20px;
}

.input-container {
  margin-bottom: 20px;
  width: 100%;
}

input[type="text"] {
  /*padding: 10px;*/
  font-size: 16px;
  border: none;
  border-radius: 0px;
  background-color: transparent;
  /*width: 100%;*/
  width: 100%;
  border-bottom: 1px solid gray;
}

.buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

button {
  padding: 10px 20px;
  font-size: 2rem;
  cursor: pointer;
}
</style>
