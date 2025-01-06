import { createRouter, createWebHistory } from "vue-router";

// Importiere deine Komponenten
import StartView from "@/views/StartView.vue";
import MapView from "@/views/MapView.vue";
import DocuementationView from "@/views/DocumentationView.vue";

const routes = [
  {
    path: "/",
    name: "StartView",
    component: StartView,
  },
  {
    path: "/game",
    name: "GameView",
    component: MapView,
  },
  {
    path: "/documentation",
    name: "DocuementationView",
    component: DocuementationView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
