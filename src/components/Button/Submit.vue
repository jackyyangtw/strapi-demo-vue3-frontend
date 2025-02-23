<!-- Submit.vue -->
<template>
    <button
        :type="props.type"
        :disabled="isLoading"
        class="w-full py-2 px-4 text-white font-semibold rounded-md inset-shadow-xs focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:bg-gray-400 disabled:text-gray-200 disabled:cursor-not-allowed disabled:inset-shadow-none"
        :class="[colorClass]"
        @click="$emit('click')"
    >
        <slot></slot>
    </button>
</template>

<script setup lang="ts">
import { computed } from "vue";

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

const colorClass = computed(
    () =>
        `bg-${props.color}-600 inset-shadow-${props.color}-700 hover:bg-${props.color}-700 focus:ring-${props.color}-500`
);
</script>
