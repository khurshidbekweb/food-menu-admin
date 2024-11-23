import customAxios from "@/service"

interface postUser {
    username: string,
    password: string,
    role: string
}
interface editUser {
    id: string
    username: string,
    password: string,
    role: string
    image: File
}

export const userUtils = {
    getUser: async () => {
        const {data} = await customAxios.get('/user')
        return data
    },
    getUserId: async (id: string) => {
        const {data} = await customAxios.get(`/user/${id}`)
        return data
    },
    postUser: async ({username, password, role}: postUser) => {
        const {data} = await customAxios.post('/user', {
            username, password, role
        })
        return data
    },
    editUser: async ({username, password, role, id, image}: editUser) => {
        const formData = new FormData();
        formData.append("username", username);
        formData.append("password", password);
        formData.append("role", role);
        formData.append("image", image);
        const {data} = await customAxios.patch(`user/${id}`, formData)
        return data
    },
    deleteUser: async (id: string) => {
        const {data} = await customAxios.delete(`user/${id}`)
        return data
    }
}