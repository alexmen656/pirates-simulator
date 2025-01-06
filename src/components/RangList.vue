<template>
  <div class="rang-list">
    <h2>Top 5 Pirates</h2>
    <ul>
      <li v-for="user in topUsers" :key="user.username">
        {{ user.username }} - {{ user.total_coins }}
        <!--coins (too long :) )-->
      </li>
    </ul>
    <button @click="showMore = true">Show more</button>

    <div v-if="showMore" class="modal-overlay" @click.self="showMore = false">
      <div class="modal-content">
        <h2>Top 5 Pirates</h2>
        <ul>
          <li v-for="user in topUsers" :key="user.username">
            {{ user.username }} - {{ user.total_coins }} coins
          </li>
        </ul>
        <button @click="showMore = false">Close</button>
      </div>
    </div>
    <h4>
      Language:
      <span @click="changeLanguage('en')" :class="isActiveLanguage('en')"
        >EN</span
      >
      |
      <span @click="changeLanguage('de')" :class="isActiveLanguage('de')"
        >DE</span
      >
      |
      <span @click="changeLanguage('es')" :class="isActiveLanguage('es')"
        >ES</span
      >
    </h4>
  </div>
</template>

<script>
export default {
  name: "RangList",
  data() {
    return {
      topUsers: [],
      currentLanguage: localStorage.getItem("language") || "en",
      showMore: false
    };
  },
  created() {
    this.fetchTopUsers();
  },
  methods: {
    isActiveLanguage(lang) {
      return this.currentLanguage === lang ? "active-language" : "";
    },
    changeLanguage(lang) {
      this.$i18n.locale = lang;
      localStorage.setItem("language", lang);
      this.currentLanguage = lang;
    },
    async fetchTopUsers() {
      try {
        const response = await this.$axios.get("coins.php", {
          params: { top_users: true },
        });
        if (response.data) {
          this.topUsers = response.data;
        } else {
          console.error("Failed to fetch top users:", response.data.error);
        }
      } catch (error) {
        console.error("Error fetching top users:", error);
      }
    },
  },
};
</script>

<style scoped>
.rang-list {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  background-color: rgba(18, 18, 18, 0.6);
  padding: 10px;
  border: none;
  border-radius: 16px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1002;
}

.rang-list h2 {
  position: relative;
  margin: 0 0 10px;
  font-size: 1.2em;
  color: #fff;
  text-align: center;
}

.rang-list ul {
  position: relative;
  list-style: none;
  padding: 0;
  margin: 0;
}

.rang-list li {
  position: relative;
  margin: 10px 0;
  padding: 5px;
  background-color: rgba(70, 70, 70, 0.9);
  border-radius: 8px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  color: #fff;
  display: flex;
  justify-content: space-between;
}

.rang-list h4 {
  position: relative;
  margin: 5px 0 0 0;
  padding: 0;
  color: #fff;
  text-align: center;
  cursor: pointer;
}

.rang-list h5 {
  position: relative;
  margin: 0 0 5px 0;
  padding: 0;
  color: #fff;
  text-align: center;
  cursor: pointer;
}

.active-language {
  color: red;
}

.rang-list button {
  display: block;
  margin: 10px auto;
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 500px;
  width: 100%;
  text-align: center;
}

.modal-content h2 {
  margin-bottom: 20px;
}

.modal-content ul {
  list-style-type: none;
  padding: 0;
}

.modal-content li {
  margin: 10px 0;
  font-size: 1.2rem;
}

.modal-content button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
