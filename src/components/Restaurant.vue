<!-- Restaurant.vue -->
<template>
    <li
        class="restaurant-category p-4 rounded-lg inset-shadow-sm bg-white w-full"
    >
        <h3 class="text-lg font-semibold text-gray-900">
            {{ restaurant.Name }}
        </h3>
        <h4 class="text-sm text-gray-600 mt-2">敘述:</h4>
        <div
            v-for="(block, index) in restaurant.Description"
            :key="index"
            class="text-gray-700 text-sm mt-1"
        >
            <p v-if="block.type === 'paragraph'">
                <span
                    v-for="(child, childIndex) in block.children"
                    :key="childIndex"
                >
                    {{ child.text }}
                </span>
            </p>
        </div>
        <!-- 刪除按鈕 -->
        <div class="flex space-x-2 mt-4">
            <button
                @click="handleDelete"
                :disabled="isDeleting"
                class="py-1 px-3 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 shadow-md cursor-pointer disabled:bg-gray-400 disabled:text-gray-200 disabled:cursor-not-allowed"
            >
                {{ isDeleting ? "刪除中..." : "刪除關聯" }}
            </button>
            <button
                @click="openEditModal"
                class="py-1 px-3 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 shadow-md cursor-pointer"
            >
                編輯
            </button>
        </div>
    </li>
</template>

<script setup lang="ts">
import { useRestaurantStore } from "../store/restaurant";
import { Restaurant } from "../types/restaurant";
import { storeToRefs } from "pinia";
import { ref } from "vue";
const props = defineProps<{
    restaurant: Restaurant;
    restaurantCategorie: string;
}>();
const restaurantStore = useRestaurantStore();
const { editModal } = storeToRefs(restaurantStore);
const openEditModal = async () => {
    const restaurantDetails = await restaurantStore.fetchRestaurantDetails(
        props.restaurant.documentId
    );
    if (restaurantDetails) {
        editModal.value.show = true;
        editModal.value.restaurant = restaurantDetails;
    }
};

const isDeleting = ref(false);
const handleDelete = async () => {
    if (props.restaurant.categories.length > 0) {
        isDeleting.value = true;
        const success = await restaurantStore.deleteRestaurant(
            props.restaurant.documentId,
            props.restaurantCategorie
        );
        if (success) {
            isDeleting.value = false;
        }
    }
};
</script>
