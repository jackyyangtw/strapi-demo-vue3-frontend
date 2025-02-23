// store/restaurantStore.ts
import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import api from "../api.js";
import qs from "qs";

import { Restaurant } from "../types/restaurant";
import type { Category } from "../types/category.js";

export const useRestaurantStore = defineStore("restaurant", () => {
    // 編輯彈窗狀態
    const editModal = reactive({
        show: false,
        title: "",
        restaurant: {
            id: null as number | null,
            Name: "",
            Description: [],
            categories: [],
            documentId: "",
        } as Restaurant,
    });

    const categoryRestaurants = ref<Record<string, Restaurant[]>>({});
    const allCategories = ref<Category[]>([]);

    // 取得單間餐廳詳細資料
    const fetchRestaurantDetails = async (restaurantId: string) => {
        try {
            const { data } = await api.get(
                `/restaurants/${restaurantId}?populate=categories`
            );
            return data.data;
        } catch (error) {
            console.error("取得餐廳詳細資料失敗:", error);
            return null;
        }
    };

    // 取得所有分類
    const fetchCategories = async () => {
        try {
            const { data } = await api.get("/categories");
            allCategories.value = data.data;
            return allCategories.value;
        } catch (error) {
            console.error("取得分類失敗:", error);
            return [];
        }
    };

    // 根據分類取得餐廳
    const fetchRestaurantsByCategory = async () => {
        try {
            const categories = await fetchCategories();
            const restaurantData: Record<string, Restaurant[]> = {};

            await Promise.all(
                categories.map(async (category) => {
                    const query = qs.stringify(
                        {
                            filters: {
                                categories: { Name: { $eq: category.Name } },
                            },
                            populate: { categories: { sort: ["Name:asc"] } },
                        },
                        { encodeValuesOnly: true }
                    );

                    const response = await api.get(`/restaurants?${query}`);
                    restaurantData[category.Name] = response.data.data;
                })
            );

            categoryRestaurants.value = restaurantData;
        } catch (error) {
            console.error("取得餐廳資料失敗:", error);
        }
    };

    // 刪除餐廳或解除分類關聯
    const deleteRestaurant = async (
        restaurantId: string,
        categoryName: string
    ): Promise<boolean> => {
        try {
            // 取得餐廳完整資訊
            const { data } = await api.get(
                `/restaurants/${restaurantId}?populate=categories`
            );
            const restaurant = data.data;
            const cateId = restaurant.categories.find(
                (cate: Category) => cate.Name === categoryName
            )?.documentId;

            if (!cateId) {
                console.warn("未找到對應分類，無法刪除");
                return false;
            }

            if (restaurant.categories.length > 1) {
                // 解除該分類關聯
                await api.put(`/restaurants/${restaurantId}`, {
                    data: {
                        categories: { disconnect: [{ documentId: cateId }] },
                    },
                });
            } else {
                // 只有一個分類，刪除整筆資料
                await api.delete(`/restaurants/${restaurantId}`);
            }

            await fetchRestaurantsByCategory(); // 更新前端狀態
            return true;
        } catch (error) {
            console.error("刪除餐廳失敗:", error);
            return false;
        }
    };

    // 新增餐廳
    const addRestaurant = async (restaurantData: {
        Name: string;
        Description: string;
        categories: string[];
    }): Promise<Boolean> => {
        try {
            const response = await api.post("/restaurants", {
                data: {
                    Name: restaurantData.Name,
                    Description: [
                        {
                            type: "paragraph",
                            children: [
                                {
                                    type: "text",
                                    text: restaurantData.Description,
                                },
                            ],
                        },
                    ],
                    categories: { connect: restaurantData.categories },
                },
            });

            if (response.status === 200 || response.status === 201) {
                console.log("餐廳新增成功:", response.data);
                await fetchRestaurantsByCategory();
                return true;
            } else {
                console.error("餐廳新增失敗:", response);
                return false;
            }
        } catch (error) {
            console.error("提交失敗：", error.response?.data || error.message);
            return false;
        }
    };
    // 更新餐廳資訊
    const updateRestaurant = async (
        restaurantId: string,
        updatedData: {
            Name?: string;
            Description?: string;
            categories: string[];
        }
    ): Promise<Boolean> => {
        try {
            const response = await api.put(`/restaurants/${restaurantId}`, {
                data: {
                    Name: updatedData.Name,
                    Description: updatedData.Description
                        ? [
                              {
                                  type: "paragraph",
                                  children: [
                                      {
                                          type: "text",
                                          text: updatedData.Description,
                                      },
                                  ],
                              },
                          ]
                        : undefined,
                    categories: {
                        set: updatedData.categories,
                    },
                },
            });

            if (response.status === 200 || response.status === 201) {
                console.log("餐廳更新成功:", response.data);
                await fetchRestaurantsByCategory();
                return true;
            } else {
                console.error("餐廳更新失敗:", response);
                return false;
            }
        } catch (error) {
            console.error("更新失敗：", error.response?.data || error.message);
            return false;
        }
    };

    return {
        categoryRestaurants,
        allCategories,
        editModal,
        fetchCategories,
        updateRestaurant,
        fetchRestaurantsByCategory,
        deleteRestaurant,
        addRestaurant,
        fetchRestaurantDetails,
    };
});
