<!-- RestaurantCategorie.vue -->
<template>
    <div
        class="restaurant-category p:1rem w:30% r:30 box-shadow:0|0|10|0|rgba(0,0,0,0.1)"
    >
        <h3>{{ restaurantCategorie }} 餐廳</h3>

        <p v-if="isLoading">載入中...</p>

        <ul v-if="restaurants.length && !isLoading">
            <RestaurantItem
                v-for="restaurant in restaurants"
                :key="restaurant.id"
                :restaurant="restaurant"
                :restaurantCategorie="restaurantCategorie"
            />
        </ul>

        <p v-if="!restaurants.length && !isLoading">沒有餐廳資料</p>
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
