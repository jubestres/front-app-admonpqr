import { createRouter, createWebHistory } from "vue-router";
import LayoutMain from "../components/LayoutMain.vue";
import Login from "../components/Login.vue";
import Arearespuesta from "../views/Arearespuesta/arearespuesta.vue";

import Barrios from "../views/Barrios/barrios.vue";
import Cliente from "../views/Cliente/cliente.vue";
import PQR from "../views/PQR/pqr.vue";
import Proyectos from "../views/Proyectos/proyectos.vue";
import RadicadoPQR from "../views/RadicadoPQR/radicadopqr.vue";
import RespuestaPQR from "../views/RespuestaPQR/respuestapqr.vue";
import TipoSolicitud from "../views/TipoSolicitud/tiposolicitud.vue";




const routes = [
  {
    path: "/login",
    name: "login",
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
    path: "/barrios",
    name: "barrios",
    component:Barrios,
  },
  {
    path: "/cliente",
    name: "cliente",
    component:Cliente,
  },
  {
    path: "/pqr",
    name: "pqr",
    component:PQR,
  },
  {
    path: "/proyectos",
    name: "proyectos",
    component:Proyectos,
  },
  {
    path: "/radicadopqr",
    name: "radicadopqr",
    component:RadicadoPQR,
  },
  {
    path: "/respuestapqr",
    name: "respuestapqr",
    component:RespuestaPQR,
  },
  {
    path: "/tiposolicitud",
    name: "tiposolicitud",
    component:TipoSolicitud,
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

