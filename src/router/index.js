import { createRouter, createWebHistory } from "vue-router";
import LayoutMain from "../components/LayoutMain.vue";
import Login from "../components/Login.vue";
import Arearespuesta from "../views/Arearespuesta/arearespuesta.vue";
import component from "element-plus/es/components/tree-select/src/tree-select-option.mjs";
import Paises from "../views/Paises/paises.vue";

const routes = [
  {
    path: "/Login",
    name: "Login",
    component: Login,
  },
  {
    path: "/",
    name: "home",
    component:LayoutMain,
  },
  {
    path: "/arearespuesta",
    name: "arearespuesta",
    component:Arearespuesta,
  },
  {
    path: "/paises",
    name: "Paises",
    component:Paises
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

