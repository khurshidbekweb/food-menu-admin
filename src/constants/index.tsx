import { navLinkType } from "@/types";
import { CassetteTape, Home, Languages, User, Utensils } from "lucide-react";


export const BASE_URL_SERVER = import.meta.env.VITE_SERVER_BASE_URL; 
export const IMG_BASE_URL = import.meta.env.VITE_SERVER_IMG_BASE_URL; 


export const navLinkSuperAdmin:navLinkType[] = [
    {
        icon: <Home size={20}/>,
        path: '/dashboard',
        element: 'Home'
    },
    {
        icon: <Utensils size={20}/>,
        path: '/dashboard/restaran',
        element: 'Restaran'
    },
    {
        icon: <Languages size={20}/>,
        path: '/dashboard/language',
        element: 'Language'
    },
    {
        path: '/dashboard/user',
        icon: <User size={20}/>,
        element: 'User'
    },
    {
        path: '/dashboard/category-img',
        icon: <CassetteTape size={20}/>,
        element: 'Category Image'
    },
]