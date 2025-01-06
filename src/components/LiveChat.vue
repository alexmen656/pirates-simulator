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
          <span class="text">{{ message.message }}</span>
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
      messages: [],
      newMessage: ''
    };
  },
  created() {
    this.fetchMessages();
    //setInterval(() => {
      this.fetchMessages();
   // }, 1000);
  },
  methods: {
    fetchMessages() {
      this.$axios.get('livechat.php')
        .then(response => {
          this.messages = response.data;
        })
        .catch(error => {
          console.error('Error fetching messages:', error);
        });
    },
    sendMessage() {
      if (this.newMessage.trim() !== '') {
        const message = {
          author: localStorage.getItem("username") ?? 'User',
          message: this.newMessage,
          type: 'user'
        };
        this.$axios.post('livechat.php', message)
          .then(response => {
            if (response.data.status === 'success') {
              this.fetchMessages();
              this.newMessage = '';
            }
          })
          .catch(error => {
            console.error('Error sending message:', error);
          });
      }
    }
  }
};
</script>

<style scoped>
.live-chat {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  border: 1px solid #ccc;
  background-color: rgba(18, 18, 18, 0.6);
  border: none;
  border-radius: 5px;
  overflow: hidden;
  border-radius: 5px;
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
