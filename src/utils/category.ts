import customAxios from "@/service"

interface postCategory{
    name: string,
    image: File,
    restaurantId: string
}
interface editCategory{
    id: string
    name: string,
    image: File,
    restaurantId: string
}

export const categoryUtils = {
    getCategory: async (restaurantId: string) => {
        const {data} = await customAxios.get(`category/all/${restaurantId}`)
        return data
    },
    getCategoryOne: async (id: string) => {
        const {data} = await customAxios.get(`category/one/${id}`)
        return data
    },
    postCategory: async ({image, name, restaurantId}: postCategory) => {
        const formData = new FormData()
        formData.append('image', image)
        formData.append('name', name)
        formData.append('restaurantId', restaurantId)
        const {data} = await customAxios.post('category', formData)
        return data
    },
    editCategory: async ({image, name, restaurantId, id}: editCategory) => {
        const formData = new FormData()
        formData.append('image', image)
        formData.append('name', name)
        formData.append('restaurantId', restaurantId)
        const {data} = await customAxios.patch(`category/${id}`, formData)
        return data
    },
    deleteCategory: async (id: string) => {
        const {data} = await customAxios.delete(`category/${id}`)
        return data
    }
}