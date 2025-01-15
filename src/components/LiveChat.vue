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
        <button
          v-if="newMessages"
          @click="scrollToBottom('button')"
          class="new-messages-button"
        >
          New ↓
        </button>
      </div>
      <div class="input-container">
        <input
          type="text"
          v-model="newMessage"
          :placeholder="$t('lc_input')"
          @keyup.enter="sendMessage"
        />
        <button class="send-btn" @click="sendMessage">{{ $t("send") }}</button>
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
      newMessages: false,
    };
  },
  async created() {
    await this.fetchMessages();
    setInterval(() => {
      this.fetchMessages();
    }, 1000);
  },
  updated() {
    this.scrollToBottom("updated");
  },
  methods: {
    async fetchMessages() {
      await this.$axios
        .get("livechat.php")
        .then((response) => {
          if (response.data.length > this.messages.length) {
            this.newMessages = true;
          }
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
          .then(async (response) => {
            if (response.data.status === "success") {
              await this.fetchMessages().then(() => {
                this.scrollToBottom("button");
                this.newMessage = "";
              });
            }
          })
          .catch((error) => {
            console.error("Error sending message:", error);
          });
      }
    },
    scrollToBottom(caller) {
      // Scroll to the bottom of the messages container
      if (this.ticker == 1 || caller == "button") {
        const messagesContainer = this.$el.querySelector(".messages");
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        this.ticker++;
        this.newMessages = false;
      }
      /* const container = this.$refs.messagesContainer;
      if (this.ticker == 1) {
        container.scrollTop = container.scrollHeight;
        this.ticker++;
      }
      setTimeout(() => {
        container.removeAttribute("scrollTop");
      }, 500);*/
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

.new-messages-button {
  position: absolute;
  bottom: 55px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 40%;
  color: red;
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
  background-color: black;
  color: #7f7f7f;
}

.send-btn {
  border-bottom-right-radius: 16px;
}

.author,
.text {
  font-size: 1.25rem;
}
</style>
