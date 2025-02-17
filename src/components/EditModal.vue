<!-- EditModal.vue -->
<template>
    <div
        class="edit-modal fixed z:10 inset:0 bg:white flex justify:center items:center"
    >
        <div class="w:50% mx:auto">
            <h2>編輯{{ restaurantName }}</h2>
            <RestaurantForm
                :restaurant="editModal.restaurant"
                @submit="cancel"
            />
            <button @click="cancel">關閉</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRestaurantStore } from "../store/restaurant";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import RestaurantForm from "./RestaurantForm.vue";

const restaurantStore = useRestaurantStore();
const { editModal } = storeToRefs(restaurantStore);

const restaurantName = computed({
    get: () => editModal.value.restaurant?.Name || "",
    set: (val) => (editModal.value.restaurant.Name = val),
});

const cancel = () => {
    editModal.value.show = false;
};
</script>
