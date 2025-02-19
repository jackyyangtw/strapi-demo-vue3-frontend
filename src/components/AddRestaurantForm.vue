<!-- AddRestaurantForm.vue -->
<template>
    <h2 class="text-3xl font-extrabold text-gray-900 mt-10 pb-3 tracking-wide"
        >🆕 新增餐廳</h2
    >
    <RestaurantForm :restaurant="null" />
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import api from "../api.js";
import type { Category } from "../types/category";
import RestaurantForm from "./RestaurantForm.vue";

const categories = ref<Category[]>([]);

const fetchCategories = async () => {
    try {
        const response = await api.get("/categories");
        categories.value = response.data.data;
    } catch (error) {
        console.error("無法取得分類資料：", error);
    }
};
onMounted(() => {
    fetchCategories();
});
</script>
