import { createRouter, createWebHistory } from "vue-router";
import ejemplo from "../views/ejemplo.vue";
import paises from "../views/paises.vue"; 

const routes = [
  {
    path: "/Cargos",
    name: "Cargos",
    component: ejemplo,
  },
  {
    path: "/paises",
    name: "Paises",
    component: paises, 
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

