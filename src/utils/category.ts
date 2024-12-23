import customAxios from "@/service"

interface postCategory{
    name: Record<string, string> | string,
    image: File | null,
    restaurantId: string
}
interface editCategory{
    id: string
    name: Record<string, string> | string,
    image: File | null,
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
        const formData = new FormData();
        formData.append('name', JSON.stringify(name));
        formData.append('restaurantId', restaurantId);
        if(image) {
            formData.append('image', image)
        }
        const {data} = await customAxios.post('category', formData)
        return data
    },
    editCategory: async ({image, name, restaurantId, id}: editCategory) => {
        const formData = new FormData();
        formData.append('name', JSON.stringify(name));
        formData.append('restaurantId', restaurantId);
        if(image) {
            formData.append('image', image)
        }
        const {data} = await customAxios.patch(`category/${id}`, formData)
        return data
    },
    deleteCategory: async (id: string) => {
        const {data} = await customAxios.delete(`category/${id}`)
        return data
    }
}