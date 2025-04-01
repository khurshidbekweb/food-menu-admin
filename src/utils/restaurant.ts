import customAxios from "@/service"

interface postRestaurant{
    image: File,
    name: Record<string, string>,
    userId: string,
    languages: string[],
    description: string,
    serviceCharge?: string,
    coverImage: File 
}

interface editRestaurant{
    name: Record<string, string>,
    id:string
    languages: string[]
}
interface editCoverImage{
    id:string
    coverImage: File | null,   
}

interface editRestaurantImage{
    id:string
    image: File | null,   
}

export const restaurantUtils = {
    getRestaurant: async () => {
        const  {data} = await customAxios.get('restaurant/')
        return data
    },
    getRestaurantOneId: async (id:string) => {
        const  {data} = await customAxios.get(`restaurant/one/${id}`)
        return data
    },
    getRestaurantQrCode: async (link:string) => {
        const {data} = await customAxios.get(`restaurant/generate/qrcode?link=${encodeURIComponent(link)}`)
        return data
    },
    postRestaurant: async ({image, languages, name,userId, description, coverImage, serviceCharge}:postRestaurant) => {
        const formData = new FormData();
        if(Number(serviceCharge)){
            formData.append("serviceCharge", serviceCharge!);
        }
        formData.append("image", image);
        formData.append("name", JSON.stringify(name));
        formData.append("userId", userId);
        formData.append("description", description);
        formData.append("coverImage", coverImage);
        formData.append("languages", JSON.stringify(languages));
        const  {data} = await customAxios.post('restaurant/', formData)
        return data
    },
    editRestaurant: async ({languages, name,id}:editRestaurant) => {
        const  {data} = await customAxios.patch(`restaurant/${id}`, {
            languages, name
        })
        return data
    },
    editCoverImage: async({id, coverImage}:editCoverImage) => {
        const formData = new FormData();
        if(coverImage){
            formData.append('coverImage', coverImage)
        }
        const  {data} = await customAxios.patch(`restaurant/${id}/cover-image`, formData)
        return data
    },
    editRestaurantImage: async({id, image}:editRestaurantImage) => {
        const formData = new FormData();
        if(image){
            formData.append('coverImage', image)
        }
        const  {data} = await customAxios.patch(`restaurant/${id}/image`, formData)
        return data
    },
    deleteRestuarant: async (id:string) => {
        const  {data} = await customAxios.delete(`restaurant/${id}`)
        return data
    }
}