import customAxios from "@/service";


interface AuthLogin {
    username: string,
    password: string
}

export const authUtils = {
    auth: async ({username, password}: AuthLogin) => {
        const {data} = await customAxios.post('auth/login/admin',{
            username: username,
            password: password,
        })
        localStorage.setItem("token", data?.token);
        return data
    }
}