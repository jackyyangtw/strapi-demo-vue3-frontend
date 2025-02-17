import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import "./index.css"; // 引入 Tailwind CSS
const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.mount("#app");
