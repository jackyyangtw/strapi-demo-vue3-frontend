<!-- EditModal.vue -->
<template>
    <div
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/[0.9]"
    >
        <div
            class="bg-white w-full sm:w-3/4 mx-6 md:w-1/2 lg:w-1/3 p-6 rounded-lg shadow-xl relative"
        >
            <h2 class="text-xl font-semibold text-gray-900 mb-4">
                編輯
                <span class="text-green-700">{{ restaurantName }}</span> 餐廳
            </h2>
            <RestaurantForm
                :restaurant="editModal.restaurant"
                @submit="cancel"
                @delete="cancel"
            />
            <div class="absolute top-4 right-4">
                <button
                    @click="cancel"
                    class="flex justify-center items-center p-4 w-[10px] h-[10px] bg-gray-500 text-white text-lg rounded-full hover:bg-gray-600 shadow-md cursor-pointer"
                >
                    x
                </button>
            </div>
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
