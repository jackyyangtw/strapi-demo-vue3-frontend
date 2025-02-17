<!-- AddRestaurantForm.vue -->
<template>
    <h2>新增餐廳</h2>
    <RestaurantForm :restaurant="null" @submit="handleSuccess" />
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import api from "../api.js";
import type { Category } from "../types/category";
import RestaurantForm from "./RestaurantForm.vue";

const name = ref("");
const description = ref("");
const selectedCategories = ref([]);
const categories = ref<Category[]>([]);
const message = ref("");

const fetchCategories = async () => {
    try {
        const response = await api.get("/categories");
        categories.value = response.data.data;
    } catch (error) {
        console.error("無法取得分類資料：", error);
    }
};
const handleSuccess = () => {
    message.value = "餐廳已新增！";
    name.value = "";
    description.value = "";
    selectedCategories.value = [];
};
onMounted(() => {
    fetchCategories();
});
</script>
