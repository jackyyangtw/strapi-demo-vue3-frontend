<!-- RestaurantForm.vue -->
<template>
    <form
        @submit.prevent="handleSubmit"
        class="max-w-lg p-6 rounded-lg shadow-lg space-y-4 bg-white"
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
                class="mt-1 block w-full p-2 border border-gray-300 rounded-md inset-shadow-xs focus:ring-blue-500 focus:border-blue-500"
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
                class="mt-2 block w-full p-2 border border-gray-300 rounded-md inset-shadow-xs focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
        </div>

        <div v-if="loadingCategories" class="text-gray-500 text-sm">
            正在載入{{ formData.Name }}的分類...
        </div>
        <div v-else>
            <label class="block text-sm font-medium text-gray-700"
                >分類：</label
            >
            <div class="flex flex-wrap gap-4 mt-2">
                <div
                    v-for="category in allCategories"
                    :key="category.documentId"
                    class="flex items-center space-x-2"
                >
                    <input
                        type="checkbox"
                        :id="'category-' + category.documentId"
                        :value="category.documentId"
                        v-model="formData.categories"
                        class="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label
                        :for="'category-' + category.documentId"
                        class="text-sm text-gray-700"
                        >{{ category.Name }}</label
                    >
                </div>
            </div>
            <p v-if="categoryError" class="text-red-500 text-sm mt-2">
                請至少選擇一個分類。
            </p>
        </div>

        <div class="grid gap-4" :class="{ 'grid-cols-2': isEditMode }">
            <Submit type="submit" color="green" :isLoading="isSubmitting">{{
                btnText
            }}</Submit>
            <Submit
                v-if="isEditMode"
                :isLoading="isDeleting"
                type="button"
                @click="handleDeleting"
                color="red"
                >{{ isDeleting ? "刪除中..." : "刪除此餐廳" }}</Submit
            >
        </div>

        <p v-if="message" class="text-sm text-green-600 mt-2">{{ message }}</p>
    </form>
</template>

<script setup lang="ts">
import Submit from "./Button/Submit.vue";
import { ref, watch, computed, onMounted } from "vue";
import { useRestaurantStore } from "../store/restaurant.js";
import { storeToRefs } from "pinia";
import api from "../api.js";
const props = defineProps<{
    restaurant: any | null; // 若為 null，表示是新增
}>();
const emit = defineEmits(["submit", "delete"]); // 事件傳遞

const restaurantStore = useRestaurantStore();
const {
    addRestaurant,
    updateRestaurant,
    fetchCategories,
    fetchRestaurantsByCategory,
} = restaurantStore;
const { allCategories } = storeToRefs(restaurantStore);

const formData = ref({
    Name: "",
    Description: "",
    categories: [] as string[],
});
const message = ref("");

// 是否為編輯模式
const isEditMode = computed(() => props.restaurant !== null);

const loadingCategories = ref(false);
const loadCategories = async () => {
    try {
        loadingCategories.value = true;
        await fetchCategories();
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
                categories: newRestaurant.categories.map(
                    (c: any) => c.documentId
                ),
            };
        } else {
            formData.value = { Name: "", Description: "", categories: [] };
        }
    },
    { immediate: true }
);

const isSubmitting = ref(false);
const categoryError = ref(false);
const handleSubmit = async () => {
    categoryError.value = false;

    if (formData.value.categories.length === 0) {
        categoryError.value = true;
        return;
    }
    isSubmitting.value = true;
    if (isEditMode.value) {
        // 編輯模式
        const success = await updateRestaurant(props.restaurant.documentId, {
            Name: formData.value.Name,
            Description: formData.value.Description,
            categories: formData.value.categories,
        });
        if (!success) {
            message.value = "餐廳更新失敗！";
        } else {
            message.value = "餐廳更新成功！";
            formData.value = { Name: "", Description: "", categories: [] };
        }
    } else {
        // 新增模式
        const success = await addRestaurant({
            Name: formData.value.Name,
            Description: formData.value.Description,
            categories: formData.value.categories,
        });

        if (success) {
            formData.value = { Name: "", Description: "", categories: [] };
            message.value = "餐廳已新增！";
        }
    }
    isSubmitting.value = false;
    setTimeout(() => {
        message.value = "";
    }, 2000);
    emit("submit");
};

const isDeleting = ref(false);
const handleDeleting = async () => {
    isDeleting.value = true;
    await api.delete(`/restaurants/${props.restaurant.documentId}`);
    await fetchRestaurantsByCategory();
    isDeleting.value = false;
    emit("delete");
};

const btnText = computed(() => {
    if (isSubmitting.value) {
        return "處理中...";
    }
    if (isEditMode.value) {
        return "更新";
    }
    return "新增";
});
onMounted(() => {
    loadCategories();
});
</script>
