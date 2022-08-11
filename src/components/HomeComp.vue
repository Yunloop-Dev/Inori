<template>
  <div class="bot-card">
    <Image
      :src="require('@/assets/inori.jpeg')"
      alt="Image Text"
      imageStyle="max-width: 100%; border-radius: 30px; display: flex; margin: 0 auto; height: auto;"
      preview
    >
      <template #indicator></template>
    </Image>

    <h1 class="card_text">{{ msg }}</h1>
    <div class="button">
      <Button
        label="Добавить бота!"
        icon="pi pi-external-link"
        class="p-button-success"
        @click="addBot()"
      />
      <router-link to="/docs">
        <Button
          label="Документация!"
          icon="pi pi-external-link"
          class="p-button-secondary"
        />
      </router-link>
    </div>

    <Toast />
  </div>
</template>

<script>
import Button from "primevue/button";
import Toast from "primevue/toast";
import Image from "primevue/image";

export default {
  name: "HelloWorld",
  beforeMount() {
    const urlParams = new URLSearchParams(window.location.search);
      console.log(urlParams.toString())

    const token = urlParams.get("access_token")

    if(token !== null) {
      console.log(true);
      window.localStorage.setItem("accessToken", token);
      window.location.href = 'http://95.165.160.138:8080/#/'
    }
  },
  data() {
    return {
      href: "https://discord.com/api/oauth2/authorize?client_id=985274993652944896&permissions=8&scope=bot%20applications.commands",
    };
  },
  props: {
    msg: String,
  },
  components: {
    Button,
    Image,
    Toast,
  },

  methods: {
    addBot() {
      window.location.href = this.href;
    },
  },
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.bot-card {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 100%;
  max-width: 55vh;
  overflow: hidden;
}
.button {
  display: flex;
  justify-content: space-between;
}
.image {
  max-width: 100%;
  border-radius: 30px;
  display: flex;
  margin: 0 auto;
  height: auto;
}
</style>
