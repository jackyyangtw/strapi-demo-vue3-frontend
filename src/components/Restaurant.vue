<!-- Restaurant.vue -->
<template>
    <li>
        <h3>{{ restaurant.Name }}</h3>
        <h4>敘述:</h4>
        <div v-for="(block, index) in restaurant.Description" :key="index">
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
        <button @click="handleDelete">刪除</button>
        <button @click="openEditModal" class="bg:beryl!">編輯</button>
        <EditModal v-if="editModal.show"></EditModal>
    </li>
</template>

<script setup lang="ts">
import { useRestaurantStore } from "../store/restaurant";
import { Restaurant } from "../types/restaurant";
import EditModal from "./EditModal.vue";
import { storeToRefs } from "pinia";
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
const handleDelete = () => {
    if (props.restaurant.categories.length > 0) {
        restaurantStore.deleteRestaurant(
            props.restaurant.documentId,
            props.restaurantCategorie
        );
    }
};
</script>

<style scoped>
button {
    margin-top: 10px;
    padding: 5px 10px;
    background-color: red;
    color: white;
    border: none;
    cursor: pointer;
}
button:hover {
    background-color: darkred;
}
</style>
