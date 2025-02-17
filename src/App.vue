<template>
    <div class="container p:2rem">
        <h2>全部餐廳</h2>
        <div class="flex flex:wrap gap:30">
            <RestaurantCategorie
                v-for="(
                    restaurants, category
                ) in restaurantStore.categoryRestaurants"
                :key="category"
                :restaurants="restaurants"
                :restaurantCategorie="category"
            />
        </div>
        <AddRestaurantForm></AddRestaurantForm>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRestaurantStore } from "./store/restaurant";
import RestaurantCategorie from "./components/RestaurantCategorie.vue";
import AddRestaurantForm from "./components/AddRestaurantForm.vue";

const restaurantStore = useRestaurantStore();

onMounted(() => {
    restaurantStore.fetchRestaurantsByCategory();
});
</script>
