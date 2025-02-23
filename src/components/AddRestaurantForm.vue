<!-- AddRestaurantForm.vue -->
<template>
    <h2 class="text-3xl font-extrabold text-gray-900 mt-10 pb-3 tracking-wide">
        🆕 新增餐廳
    </h2>
    <RestaurantForm :restaurant="null" />
</template>

<script setup lang="ts">
import RestaurantForm from "./RestaurantForm.vue";
</script>
