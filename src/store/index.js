import { createStore } from "vuex";
import router from "../router";

// const config = {
//   baseURL: "http://localhost:53134",
// };

export default createStore({
  state: {
    accessToken: null,

    user: {},

    loggingIn: false,
    loginError: null,
  },
  mutations: {
    loginStart: (state) => (state.loggingIn = true),
    loginStop: (state, errorMessage) => {
      state.loggingIn = false;
      state.loginError = errorMessage;
    },
    updateAccessToken: (state, accessToken) => {
      state.accessToken = accessToken;
    },
    logout: (state) => {
      state.accessToken = null;
    },
  },
  actions: {
    doLogin({ commit }) {
      commit("loginStart");
    },
    fetchAccessToken({ commit }) {
      commit("updateAccessToken", localStorage.getItem("accessToken"));
    },
    logout({ commit }) {
      localStorage.removeItem("accessToken");
      commit("logout");
      router.push("/");
    },
  },
});
