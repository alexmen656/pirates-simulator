import { createApp } from "vue";
import App from "./App.vue";
import i18n from "./i18n";
import axios from "./axios";
import qs from "qs";
import router from "./router";

const app = createApp(App);
app.config.globalProperties.$axios = axios;
app.config.globalProperties.$qs = qs;
app.use(router);
app.use(i18n);
app.mount("#app");
