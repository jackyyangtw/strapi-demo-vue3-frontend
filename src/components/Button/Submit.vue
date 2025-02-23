<!-- Submit.vue -->
<template>
    <button
        :type="props.type"
        :disabled="isLoading"
        class="w-full py-2 px-4 text-white font-semibold rounded-md inset-shadow-xs focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:bg-gray-400 disabled:text-gray-200 disabled:cursor-not-allowed disabled:inset-shadow-none"
        :class="{
            'bg-green-600 hover:bg-green-700 focus:ring-green-500 inset-shadow-green-700':
                props.color === 'green',
            'bg-red-600 hover:bg-red-700 focus:ring-red-500 inset-shadow-red-700':
                props.color === 'red',
        }"
        @click="$emit('click')"
    >
        <slot></slot>
    </button>
</template>

<script setup lang="ts">
// 定義按鈕類型
type ButtonType = "submit" | "button";
type ButtonColor = "green" | "red"; // 可擴充為其他顏色

const props = defineProps<{
    type?: ButtonType;
    color: ButtonColor;
    isLoading?: boolean;
}>();

defineEmits<{
    (event: "click"): void;
}>();
</script>
