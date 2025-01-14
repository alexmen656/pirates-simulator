<template>
  <div>
    <div class="live-chat">
      <div class="messages" ref="messagesContainer">
        <div
          v-for="message in messages"
          :key="message.id"
          :class="message.type + ' message'"
        >
          <span class="author">{{ message.author }}: </span>
          <span class="text">{{ message.message }}</span>
        </div>
      </div>
      <div class="input-container">
        <input
          type="text"
          v-model="newMessage"
          :placeholder="$t('lc_input')"
          @keyup.enter="sendMessage"
        />
        <button @click="sendMessage">{{$t('send')}}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messages: [],
      newMessage: "",
      ticker: 1,
    };
  },
  created() {
    this.fetchMessages();
    setInterval(() => {
      this.fetchMessages();
    }, 1000);
  },
  updated() {
    this.scrollToBottom();
  },
  methods: {
    fetchMessages() {
      this.$axios
        .get("livechat.php")
        .then((response) => {
          this.messages = response.data;
        })
        .catch((error) => {
          console.error("Error fetching messages:", error);
        });
    },
    sendMessage() {
      if (this.newMessage.trim() !== "") {
        const message = {
          author: localStorage.getItem("username") ?? "User",
          message: this.newMessage,
          type: "user",
        };
        this.$axios
          .post("livechat.php", message)
          .then((response) => {
            if (response.data.status === "success") {
              this.fetchMessages();
              this.newMessage = "";
            }
          })
          .catch((error) => {
            console.error("Error sending message:", error);
          });
      }
    },
    scrollToBottom() {
      // Scroll to the bottom of the messages container
      const container = this.$refs.messagesContainer;
      if (this.ticker == 1) {
        container.scrollTop = container.scrollHeight;
        this.ticker++;
      }
      setTimeout(() => {
        container.removeAttribute("scrollTop");
      }, 500);
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
  /*border: 1px solid #ccc;*/
  background-color: rgba(18, 18, 18, 0.95); /*0.6*/
  border: none;
  border-radius: 18px; /*5*/
  overflow: hidden;
}

.messages {
  flex: 1;
  padding: 5px; /*10*/
  overflow-y: auto;
}

.message {
  margin-bottom: 3px;
}

.user {
  color: blue;
}

.system {
  color: green;
}

.input-container {
  display: flex;
  padding: 5px; /*10*/
  border-top: 2px solid black; /*#ccc*/
  background-color: rgba(18, 18, 18, 0.4);
}

input[type="text"] {
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border: none; /*1px solid #ccc*/
  border-radius: 8px; /*5*/
  border-bottom-left-radius: 16px;
  background-color: black;
  color: white;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  margin-left: 8px;
  border: none; /*1px solid #ccc*/
  border-radius: 8px; /*5*/
  border-bottom-right-radius: 16px;
  background-color: black;
  color: #7f7f7f;
}

.author,
.text {
  font-size: 1.25rem;
}
</style>
