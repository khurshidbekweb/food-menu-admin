/* eslint-disable react-hooks/rules-of-hooks */
import Navbar from "@/components/navbar/navbar";
import { useCategoryAll, useFoodAll, uselanguageAll, useRestuarant, useUserAll, useUserMe } from "@/querys";
import { Languages, Soup, User } from "lucide-react";
import { IoRestaurantSharp } from "react-icons/io5";
import { BiSolidCategory } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
interface statistika {
    name: string,
    number: string | number,
    color: string,
    icon: JSX.Element,
    link: string
}

const Home = () => {    
    const role = localStorage.getItem('role')
    // ================== SUPER ADMIN
    const userAlll = role=='ADMIN' ? undefined : useUserAll()?.data
    const restuarantAll = role==='ADMIN' ? undefined : useRestuarant()?.data
    const languageAll = role==='ADMIN' ? undefined : uselanguageAll()?.data
    const { t } = useTranslation()

    // ================== ADMIN
    const me = useUserMe()?.data
    const foodAll = role==='ADMIN' ? useFoodAll(me?.restaurant?._id)?.data : undefined 
    const categoryAll = role==='ADMIN' ? useCategoryAll(me?.restaurant?._id)?.data : undefined

    const superAdmin = [
        {
            name: t("sub_admin_user"),
            number: userAlll?.length == 0 ? '0' : userAlll?.length,
            color: '#f9ca24',
            icon: <User size={25} />,
            link: '/dashboard/user'
        },
        {
            name: t("sub_admin_restaurand"),
            number: restuarantAll?.length == 0 ? '0' : restuarantAll?.length,
            color: '#6ab04c',
            icon: <IoRestaurantSharp size={25} />,
            link: '/dashboard/restaran'
        },
        {
            name: t("sub_admin_language"),
            number: languageAll?.length == 0 ? '0' : languageAll?.length,
            color: '#4834d4',
            icon: <Languages size={25} />,
            link: '/dashboard/language'
        },

    ]
    const Admin = [
        {
            name: t("admin_food"),
            number: foodAll?.length == 0 ? '0' : foodAll?.length,
            color: '#f9ca24',
            icon: <Soup size={25} />,
            link: '/dashboard/food'
        },
        {
            name: t("admin_category"),
            number: categoryAll?.length == 0 ? '0' : categoryAll?.length,
            color: '#f9ca24',
            icon: <BiSolidCategory size={25} />,
            link: '/dashboard/food'
        },
    ]


    return (
        <>
            <Navbar />
            <div className="home-page px-2 md:px-5">
                {role === 'SUPER_ADMIN' ? 
                <>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-5">
                        {superAdmin?.map((el: statistika) => (
                            <Link to={el.link} className={`p-5 py-8 shadow-md mx-auto border flex items-start gap-4 rounded-md w-full bg-white`} key={el.name}>
                                <div className="flex flex-col space-y-4">
                                    <span className="border p-2 rounded-full shadow">{el.icon}</span>
                                    <p className="text-2xl font-bold">{el?.number}</p>
                                </div>
                                <p className="text-2xl font-bold">{el.name}</p>
                            </Link>
                        ))}
                    </div>
                </>
                :
                <>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-5">
                        {Admin?.map((el: statistika) => (
                            <Link to={el.link} className={`p-5 py-8 shadow-md mx-auto border flex items-start gap-4 rounded-md w-full bg-white`} key={el.name}>
                                <div className="flex flex-col space-y-4">
                                    <span className="border p-2 rounded-full shadow">{el.icon}</span>
                                    <p className="text-2xl font-bold">{el?.number}</p>
                                </div>
                                <p className="text-2xl font-bold">{el.name}</p>
                            </Link>
                        ))}
                    </div>
                </>
                }
            </div>
        </>
    );
};

export default Home;