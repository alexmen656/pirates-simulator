<template>
  <div>
    <div class="live-chat">
      <div class="messages">
        <div
          v-for="message in messages"
          :key="message.id"
          :class="message.type"
        >
          <span class="author">{{ message.author }}: </span>
          <span class="text">{{ message.text }}</span>
        </div>
      </div>
      <div class="input-container">
        <input
          type="text"
          v-model="newMessage"
          placeholder="Type your message"
          @keyup.enter="sendMessage"
        />
        <button @click="sendMessage">Send</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messages: [
        { id: 1, author: "User", text: "Hello!", type: "user" },
        {
          id: 2,
          author: "System",
          text: 'The city "Port Amigo" was established.',
          type: "system",
        },
        { id: 3, author: "User", text: "That's great!", type: "user" },
      ],
      newMessage: "",
    };
  },
  methods: {
    sendMessage() {
      if (this.newMessage.trim() !== "") {
        this.messages.push({
          id: Date.now(),
          author: "User",
          text: this.newMessage,
          type: "user",
        });
        this.newMessage = "";
      }
    },
  },
};
</script>

<style scoped>
.live-chat {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
}

.messages {
  flex: 1;
  padding: 10px;
  overflow-y: auto;
}

.message {
  margin-bottom: 10px;
}

.user {
  color: blue;
}

.system {
  color: green;
}

.input-container {
  display: flex;
  padding: 10px;
  border-top: 1px solid #ccc;
}

input[type="text"] {
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  margin-left: 10px;
}
</style>
