import axios from "axios";

const api = axios.create({
    baseURL: "https://strapi-demo-vue3-production.up.railway.app/api", // Strapi 伺服器地址
    headers: {
        "Content-Type": "application/json",
        Authorization:
            "Bearer f2304d60cf604a13b8dd6b335eeff151fef22d4425f269c0891da9975eb78ce18575cec8a1d90b963010a4ae61ee51694cd2370cba688183fba7598fe47f77646400564e8dbea134747d9c3778411b2033beccc9b3228d7b64d0257e4102a598f66dd949811a623ddbc82c6f75882bfc86f6bc0144dd1f6531c2ed8abe1795bd", // 替換為您的 API 金鑰
    },
});

export default api;
