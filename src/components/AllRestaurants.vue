<template>
    <h2 class="text-3xl font-extrabold text-gray-900 mb-6 pb-3 tracking-wide"
        >🍽️ 全部餐廳</h2
    >
    <div class="flex flex-wrap gap-[2rem]" v-if="!isLoading">
        <RestaurantCategorie
            v-for="(
                restaurants, category
            ) in restaurantStore.categoryRestaurants"
            :key="category"
            :restaurants="restaurants"
            :restaurantCategorie="category"
        />
    </div>
    <p v-else class="text-gray-500 mt-2">載入全部餐廳資料中...</p>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRestaurantStore } from "../store/restaurant";
import RestaurantCategorie from "./RestaurantCategorie.vue";
import { storeToRefs } from "pinia";
const restaurantStore = useRestaurantStore();
const { categoryRestaurants } = storeToRefs(restaurantStore);
const isLoading = ref(false);

onMounted(async () => {
    isLoading.value = true;

    await restaurantStore.fetchRestaurantsByCategory();

    isLoading.value = false;
});
</script>
