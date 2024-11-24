import customAxios from "@/service"
interface poastFood{
    name: string,
    description: string,
    price: number,
    image: File,
    categoryId: string,
    restaurantId : string
}

export const foodUtils = {
    getFood: async (restuaranId: string) => {
        const {data} = await customAxios.get(`food/${restuaranId}`)
        return data
    },
    getFoodId: async (id: string) => {
        const {data} = await customAxios.get(`food/${id}`)
        return data
    },
    postFood: async ({categoryId,description,image,name,price,restaurantId}: poastFood) => {
        const formData = new FormData()
        formData.append('categoryId',categoryId)
        formData.append('description',description)
        formData.append('image',image)
        formData.append('name',name)
        formData.append('price', price.toString())
        formData.append('restaurantId',restaurantId)
        const {data} = await customAxios.post('food/', formData)
        return data
    }
}