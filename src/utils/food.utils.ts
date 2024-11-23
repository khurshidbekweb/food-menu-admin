import customAxios from "@/service"

export const foodUtils = {
    getFood: async (restuaranId: string) => {
        const {data} = await customAxios.get(`food/${restuaranId}`)
        return data
    },
    getFoodId: async (id: string) => {
        const {data} = await customAxios.get(`food/${id}`)
        return data
    }
}