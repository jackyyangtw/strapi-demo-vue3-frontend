<!-- RestaurantCategorie.vue -->
<template>
    <div class="restaurant-category p-10 w-full rounded-lg shadow-xl bg-white">
        <h3 class="text-lg font-semibold text-gray-900"
            >有
            <span class="text-sky-500">{{ restaurantCategorie }}</span>
            的餐廳</h3
        >

        <p v-if="isLoading" class="text-gray-600 mt-2">載入中...</p>

        <ul class="mt-6 space-y-4" v-if="restaurants.length && !isLoading">
            <RestaurantItem
                v-for="restaurant in restaurants"
                :key="restaurant.id"
                :restaurant="restaurant"
                :restaurantCategorie="restaurantCategorie"
            />
        </ul>

        <p v-if="!restaurants.length && !isLoading" class="text-gray-500 mt-2"
            >沒有餐廳資料</p
        >
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import RestaurantItem from "./Restaurant.vue";
import { Restaurant } from "../types/restaurant";

defineProps<{ restaurantCategorie: string; restaurants: Restaurant[] }>();

const isLoading = ref(true);

const fetchData = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500)); // 模擬 API 加載
    isLoading.value = false;
};

onMounted(() => {
    fetchData();
});
</script>
