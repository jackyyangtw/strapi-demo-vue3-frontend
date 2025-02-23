<!-- App.vue -->
<template>
    <Banner />
    <div class="container py-6 px-4 mx-auto">
        <AllRestaurants></AllRestaurants>
        <AddRestaurantForm></AddRestaurantForm>
        <EditModal v-if="editModal.show"></EditModal>
    </div>
    <Footer />
</template>

<script setup lang="ts">
import EditModal from "./components/EditModal.vue";
import AllRestaurants from "./components/AllRestaurants.vue";
import AddRestaurantForm from "./components/AddRestaurantForm.vue";
import Banner from "./components/Banner.vue";
import Footer from "./components/Footer.vue";
import { useRestaurantStore } from "./store/restaurant";
import { storeToRefs } from "pinia";
const restaurantStore = useRestaurantStore();
const { editModal } = storeToRefs(restaurantStore);
</script>
