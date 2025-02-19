// src/api.js
import axios from "axios";
const token = import.meta.env.VITE_APP_API_TOKEN;
const api = axios.create({
    baseURL:
        import.meta.env.VITE_APP_API_URL ||
        "https://strapi-demo-vue3-production.up.railway.app/api", // Strapi 伺服器地址
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // 替換為您的 API 金鑰
    },
});

export default api;
