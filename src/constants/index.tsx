import { navLinkType } from "@/types";
import { CassetteTape, Home, Languages, Soup, User, Utensils } from "lucide-react";


export const BASE_URL_SERVER = import.meta.env.VITE_SERVER_BASE_URL; 
export const IMG_BASE_URL = import.meta.env.VITE_SERVER_IMG_BASE_URL; 


export const navLink:navLinkType[] = [
    {
        icon: <Home size={20}/>,
        path: '/dashboard',
        element: 'Home'
    },
    {
        icon: <Languages size={20}/>,
        path: '/dashboard/language',
        element: 'Language'
    },
    {
        icon: <CassetteTape size={20}/>,
        path: '/dashboard/category',
        element: 'Category'
    },
    {
        icon: <Utensils size={20}/>,
        path: '/dashboard/restaran',
        element: 'Restaran'
    },
    {
        icon: <Soup size={20}/> ,
        path: '/dashboard/food',
        element: 'Food'
    },
    {
        path: '/dashboard/user',
        icon: <User size={20}/>,
        element: 'User'
    },
]