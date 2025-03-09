import { Menu } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "../ui/sheet";
import logo from '@/assets/image/menu.jpg'
import { Link, useLocation } from "react-router-dom";
import { navLinkType } from "@/types";
import { useTranslation } from "react-i18next";
import { Home, Languages, Soup, User, Utensils } from "lucide-react";
import { BiCategory } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import {GrRestaurant} from 'react-icons/gr'

const MobileMenu = () => {
    const location = useLocation()    
    const role = localStorage.getItem('role')
    const {t} = useTranslation()


const navLinkSuperAdmin:navLinkType[] = [
    {
        icon: <Home size={20}/>,
        path: '/dashboard',
        element: t("page_home")
    },
    {
        icon: <Utensils size={20}/>,
        path: '/dashboard/restaran',
        element:t("page_restaurant")
    },
    {
        icon: <Languages size={20}/>,
        path: '/dashboard/language',
        element: t("page_language")
    },
    {
        path: '/dashboard/user',
        icon: <User size={20}/>,
        element: t("page_user")
    },
]

const navLinkAdmin:navLinkType[] = [
    {
        icon: <Home size={20}/>,
        path: '/dashboard',
        element: t("page_home")
    },
    {
        icon: <BiCategory size={20}/>,
        path: '/dashboard/category',
        element: t("page_category")
    },
    {
        icon: <GrRestaurant size={20}/>,
        path: '/dashboard/restaurant-uers',
        element: t("page_restaurant")
    },
    {
        icon: <Soup size={20}/>,
        path: '/dashboard/food',
        element: t("page_food")
    },
    {
        icon: <CgProfile size={20}/>,
        path: '/dashboard/profile',
        element: t("page_profile")
    },

]
    return (
        <Sheet>
            <SheetTrigger><Menu /></SheetTrigger>
            <SheetContent side={'left'}>
                <SheetHeader>
                    <SheetTitle className="flex items-center gap-x-5">
                        <img width={60} src={logo} className="rounded-full border shadow-2xl" alt="logo" />
                        <p className="text-[18px] font-semibold">Sharq menu</p>
                    </SheetTitle>
                    <SheetDescription className="text-start text-xl">
                    {role==='SUPER_ADMIN'?'Super Admin':'Admin'}
                    </SheetDescription>
                    <div className="flex flex-col space-y-3">
                        {role=='SUPER_ADMIN'?navLinkSuperAdmin.map((nav: navLinkType) => (
                            <Link key={nav.path} className={`flex items-center gap-3 p-1 ${nav.path===location.pathname ? 'border rounded-md border-blue-500' : ''}`} to={nav.path}>
                                {nav.icon}
                                {nav.element}
                            </Link>
                        )):navLinkAdmin.map((nav: navLinkType) => (
                            <Link key={nav.path} className={`flex items-center gap-3 p-1 ${nav.path===location.pathname ? 'border rounded-md border-blue-500' : ''}`} to={nav.path}>
                                {nav.icon}
                                {nav.element}
                            </Link>
                        ))}
                    </div>
                </SheetHeader>
            </SheetContent>
        </Sheet>

    );
};

export default MobileMenu;