import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import PricesView from "../views/PricesView.vue";
import ProfileView from "../views/ProfileView.vue";
import DocumentationView from "../views/DocumentationView.vue";
import store from "@/store";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/profile",
    name: "profile",
    component: ProfileView,
  },
  {
    path: "/docs",
    name: "docs",
    component: DocumentationView,
  },
  {
    path: "/prices",
    name: "prices",
    component: PricesView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  store.dispatch("fetchAccessToken");

  if (to.fullPath === "/docs") {
    if (store.state.accessToken == null) {
      next("/");
    }
  }
  if (to.fullPath === "/profile") {
    if (store.state.accessToken == null) {
      next("/");
    }
  }
  next();
});

export default router;
