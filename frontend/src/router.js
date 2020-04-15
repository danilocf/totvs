import Vue from "vue";
import VueRouter from "vue-router";
import Clients from "@/views/Clients.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    redirect: "/clients"
  },
  {
    path: "/clients",
    name: "Clients",
    component: Clients
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
