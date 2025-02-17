<!-- RestaurantForm.vue -->
<template>
    <form
        @submit.prevent="handleSubmit"
        class="max-w-lg bg-white p-6 rounded-lg shadow-md space-y-4"
    >
        <div>
            <label for="name" class="block text-sm font-medium text-gray-700"
                >名稱：</label
            >
            <input
                id="name"
                v-model="formData.Name"
                type="text"
                required
                class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
        </div>

        <div>
            <label
                for="description"
                class="block text-sm font-medium text-gray-700"
                >描述：</label
            >
            <textarea
                id="description"
                v-model="formData.Description"
                required
                class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
        </div>

        <div v-if="loadingCategories" class="text-gray-500 text-sm"
            >正在載入{{ formData.Name }}的分類...</div
        >
        <div v-else>
            <label class="block text-sm font-medium text-gray-700"
                >分類：</label
            >
            <div class="flex flex-wrap gap-4 mt-2">
                <div
                    v-for="category in categories"
                    :key="category.id"
                    class="flex items-center space-x-2"
                >
                    <input
                        type="checkbox"
                        :id="'category-' + category.id"
                        :value="category.id"
                        v-model="formData.categories"
                        class="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label
                        :for="'category-' + category.id"
                        class="text-sm text-gray-700"
                        >{{ category.Name }}</label
                    >
                </div>
            </div>
        </div>

        <button
            type="submit"
            class="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
            {{ isEditMode ? "更新" : "新增" }}
        </button>

        <p v-if="message" class="text-sm text-green-600 mt-2">{{ message }}</p>
    </form>
</template>

<script setup lang="ts">
import { ref, watch, computed, onMounted } from "vue";
import api from "../api.js";
import type { Category } from "../types/category";
import { useRestaurantStore } from "../store/restaurant.js";

const props = defineProps<{
    restaurant: any | null; // 若為 null，表示是新增
}>();
const emit = defineEmits(["submit"]); // 事件傳遞

const restaurantStore = useRestaurantStore();
const { addRestaurant, updateRestaurant } = restaurantStore;

const formData = ref({
    Name: "",
    Description: "",
    categories: [] as number[],
});
const categories = ref<Category[]>([]);
const message = ref("");

// 是否為編輯模式
const isEditMode = computed(() => props.restaurant !== null);

const loadingCategories = ref(false);
const fetchCategories = async () => {
    try {
        loadingCategories.value = true;
        const response = await api.get("/categories");
        categories.value = response.data.data;
        loadingCategories.value = false;
    } catch (error) {
        console.error("無法取得分類資料：", error);
    }
};

// 監聽 `restaurant`，如果是編輯模式，填充資料
watch(
    () => props.restaurant,
    (newRestaurant) => {
        if (newRestaurant) {
            formData.value = {
                Name: newRestaurant.Name,
                Description: newRestaurant.Description.flatMap((block: any) =>
                    block.children.map((child: any) => child.text)
                ).join(" "),
                categories: newRestaurant.categories.map((c: any) => c.id),
            };
        } else {
            formData.value = { Name: "", Description: "", categories: [] };
        }
    },
    { immediate: true }
);

const handleSubmit = async () => {
    if (isEditMode.value) {
        // 編輯模式
        await updateRestaurant(props.restaurant.documentId, {
            Name: formData.value.Name,
            Description: formData.value.Description,
            categories: formData.value.categories,
        });
        message.value = "餐廳更新成功！";
    } else {
        // 新增模式
        await addRestaurant({
            Name: formData.value.Name,
            Description: formData.value.Description,
            categories: formData.value.categories,
        });
        formData.value = { Name: "", Description: "", categories: [] };
        message.value = "餐廳已新增！";
    }
    emit("submit");
};

onMounted(() => {
    fetchCategories();
});
</script>
<!-- <style scoped>
form {
    display: flex;
    flex-direction: column;
    max-width: 400px;
}
div {
    margin-bottom: 1em;
}
label {
    margin-bottom: 0.5em;
    color: #333333;
}
input,
textarea,
select {
    padding: 0.5em;
    font-size: 1em;
    border: 1px solid #cccccc;
    border-radius: 4px;
    width: 100%;
}
button {
    padding: 0.7em;
    color: #fff;
    background-color: #42b983;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}
button:hover {
    background-color: #369870;
}
p {
    margin-top: 1em;
    color: #42b983;
}
</style> -->
