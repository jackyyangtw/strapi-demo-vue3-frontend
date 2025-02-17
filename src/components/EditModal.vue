<!-- EditModal.vue -->
<template>
    <div
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/[0.9]"
    >
        <div
            class="bg-white w-full sm:w-3/4 md:w-1/2 lg:w-1/3 p-6 rounded-lg shadow-xl relative"
        >
            <h2 class="text-xl font-semibold text-gray-900 mb-4">
                編輯 {{ restaurantName }}
            </h2>
            <RestaurantForm
                :restaurant="editModal.restaurant"
                @submit="cancel"
            />
            <div class="absolute top-4 right-4">
                <button
                    @click="cancel"
                    class="py-2 px-4 bg-gray-500 text-white text-sm rounded-md hover:bg-gray-600 shadow-md cursor-pointer"
                >
                    關閉
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
