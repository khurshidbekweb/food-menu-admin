import customAxios from "@/service"

export const categoryUtils = {
    getCategory: async (restaurantId: string) => {
        const {data} = await customAxios.get(`category/all/${restaurantId}`)
        return data
    },
    getCategoryOne: async (id: string) => {
        const {data} = await customAxios.get(`category/one/${id}`)
        return data
    },
}