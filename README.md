# Vite + Vue3 + TailwindCSS + Strapi Demo

## 📌 專案簡介

本專案是一個使用 **Vite + Vue3 + TailwindCSS** 開發的前端應用，搭配 **Strapi** 作為 Headless CMS，並透過 **Railway** 部署後端、**Netlify** 部署前端。

### 🎯 功能概覽

1. **載入所有餐廳**：從 Strapi API 取得並顯示餐廳列表。
2. **更新/刪除餐廳的關聯**：可修改餐廳的相關資訊，如類別、標籤等。
3. **新增餐廳**：透過表單提交新餐廳資料，並儲存至 Strapi。

### 前端技術

-   **Vite**：提供極速開發體驗的構建工具。
-   **Vue 3**：採用 Composition API 撰寫 Vue 應用。
-   **Pinia**：管理應用狀態。
-   **TailwindCSS**：快速且彈性的 UI 樣式設計。
-   **Axios**：處理 API 請求。

### 後端技術

-   **Strapi**：作為 Headless CMS，提供 RESTful API。
-   **SQLite**：作為資料庫。
-   **Railway**：部署 Strapi 應用程式。

### 部署與開發工具

-   **Netlify**：用於部署前端應用。
-   **Railway**：用於部署後端應用。
-   **ESLint & Prettier**：確保程式碼風格統一。

### 🔗 專案連結

-   **前端應用**：[https://vue3-strapi-restaurant.netlify.app/](https://vue3-strapi-restaurant.netlify.app/)
-   **後端 (Strapi API)**：[https://strapi-demo-vue3-production.up.railway.app/](https://strapi-demo-vue3-production.up.railway.app/)

---

## 📌 API 設計

### `GET /restaurants`

取得所有餐廳資料。

```json
{
    "data": [
        {
            "id": 1,
            "documentId": "dl3g6b10llhj7dndkn344dbt",
            "attributes": {
                "name": "Demo Restaurant",
                "category": "Italian",
                "createdAt": "2024-02-19T10:00:00.000Z"
            }
        }
    ]
}
```

### `POST /restaurants`

新增餐廳。

```json
{
    "name": "New Restaurant",
    "category": "Japanese"
}
```

### `PUT /restaurants/:id`

更新餐廳資訊。

```json
{
    "category": "Chinese"
}
```

### `DELETE /restaurants/:id`

刪除指定餐廳。

---

## 📌 結語

此專案展示了 **Vite + Vue3 + TailwindCSS** 的前端開發能力，並與 **Strapi** 搭配作為後端 API，提供 CRUD 功能。如有任何建議或問題，歡迎交流！🚀
