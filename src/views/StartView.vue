<template>
  <div class="start-view">
    <h1>Pirates Simulator</h1>
    <div class="start-container">
      <div class="input-container">
        <input
          type="text"
          maxlength="14"
          v-model="username"
          placeholder="Username (max 15 characters)"
        />
      </div>
      <div class="buttons">
        <button @click="startGame">Start</button
        ><!--<router-link to="/game"></router-link>-->
        <button @click="openDocumentation">
          Documentation
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
      this.$router.push("/documentation");
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

.start-container {
  width: 35%;
}

h1 {
  color: white;
  margin-bottom: 100px;
  text-shadow: 4px 4px 8px rgba(0, 0, 0, 0.7);
}

.input-container {
  margin-bottom: 16px;
  display: flex;
}

input[type="text"] {
  /*padding: 10px;*/
  font-size: 24px;
  border: none;
  border-radius: 0px;
  background-color: transparent; /* rgba(255, 255, 255, 0.05);*/
  width: 100%;
  /*width: 100%;
  display: block;*/
  border-bottom: 1px solid gray;
  margin: 0 10px;
  background-color: rgb(255, 255, 255, 0.1);

}

.buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

button {
  padding: 18px 20px;
  font-size: 2.5rem;
  cursor: pointer;
  border-radius: 12px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3);
  background: linear-gradient(to bottom, #D4AF37, #A67B5B);
  border: 2px solid #A67B5B;
  color: #000;

}
</style>
