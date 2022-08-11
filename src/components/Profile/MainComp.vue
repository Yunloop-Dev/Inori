<template>
  <Card id="profile">
    <template #title> Профиль пользователя: {{ this.$store.state.user.username }} </template>
    <template #content> <p></p> </template
  ></Card>
</template>

<script>
import axios from "axios";
import Card from "primevue/card";
export default {
  async mounted() {
    let userInfo = await axios.post("http://localhost:53134/api/user/get", { accessToken: window.localStorage.accessToken});
    this.$store.state.user = userInfo.data.message
  },
  components: {
    Card,
  },
};
</script>


<style scoped>
#profile {
  height: 80vh;
  padding: 30px;
}
</style>