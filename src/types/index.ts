

export interface navLinkType{
    icon: React.ReactNode,
    path: string,
    element: string
} 

export interface User{
    _id: string; 
    username: string; 
    password: string; 
    role: "SUPER_ADMIN" | "ADMIN" | "USER"; 
    createdAt: string;
    updatedAt: string;
    __v: number;
}
export interface Restaurant {
    restaurant: string | null; 
    user: User; 
}
export interface lanuage{
    _id: string;
    code: string;
    createdAt: string;
    updatedAt: string;
    image: string;
    name: string;
    __v: number;
}