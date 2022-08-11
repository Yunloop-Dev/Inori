<template>
  <div class="layout-topbar">
    <router-link to="/" class="layout-topbar-logo">
      <img alt="Logo" :src="require('@/assets/logo.png')" />
      <span>Yunloop</span>
    </router-link>

    <ul class="layout-topbar-menu hidden lg:flex origin-top">
      <div v-if="this.$store.state.accessToken" class="nav-toolbar">
        <li>
          <button class="p-link layout-topbar-button">
            <i class="pi pi-calendar"></i>
            <span>Events</span>
          </button>
        </li>

        <li>
          <router-link to="/profile">
            <button class="p-link layout-topbar-button">
              <i class="pi pi-user"></i>
              <span>Profile</span>
            </button>
          </router-link>
        </li>
        <li>
          <button class="p-link layout-topbar-button" @click="logout">
            <i class="pi pi-cog"></i>
            <span>Settings</span>
          </button>
        </li>
      </div>
      <div v-else>
        <li>
          <button
            class="p-link layout-topbar-button"
            @click="login"
          >
            <i class="pi pi-discord"></i>
            <span>Авторизация с помощью дискорда</span>
          </button>
        </li>
      </div>
    </ul>
    <Toast />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Toast from "primevue/toast";
export default {
  data() {
    return {};
  },
  methods: {
    ...mapActions(["logout"]),
    login() {
      window.location.href = 'https://discord.com/api/oauth2/authorize?client_id=985274993652944896&redirect_uri=http%3A%2F%2Flocalhost%3A53134%2Fuser%2Fauth&response_type=code&scope=identify%20email%20guilds'
    }
  },

  components: {
    Toast,
  },
};
</script>