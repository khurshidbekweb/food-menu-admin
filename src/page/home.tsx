import Navbar from "@/components/navbar/navbar";
import { useCategoryImg, uselanguageAll, useRestuarant, useUserAll } from "@/querys";
import { Languages, User } from "lucide-react";
import { IoRestaurantSharp } from "react-icons/io5";
import { BiCategory } from "react-icons/bi";
import { Link } from "react-router-dom";
import { Statistika1 } from "@/components/charts/statistika";
import { Statistiks2 } from "@/components/charts/statistiks2";
interface statistika {
    name: string,
    number: string | number,
    color: string,
    icon: JSX.Element,
    link: string
}

const Home = () => {
    const role = localStorage.getItem('role')
    const languageAll = uselanguageAll()?.data
    const userAlll = useUserAll()?.data
    const categoryImg = useCategoryImg()?.data
    const restuarantAll = useRestuarant()?.data
    console.log(restuarantAll);


    const superAdmin = [
        {
            name: 'User',
            number: userAlll?.length == 0 ? '0' : userAlll?.length,
            color: '#f9ca24',
            icon: <User size={25}/>,
            link: '/dashboard/user'
        },
        {
            name: 'Restuarant',
            number: restuarantAll?.length == 0 ? '0' : restuarantAll?.length,
            color: '#6ab04c',
            icon: <IoRestaurantSharp size={25} />,
            link: '/dashboard/restaran'
        },
        {
            name: 'Category img',
            number: categoryImg?.length == 0 ? '0' : categoryImg?.length,
            color: '#e056fd',
            icon: <BiCategory size={25}/>,
            link: '/dashboard/category'
        },
        {
            name: 'Tillar',
            number: languageAll?.length == 0 ? '0' : languageAll?.length,
            color: '#4834d4',
            icon: <Languages size={25}/>,
            link: '/dashboard/language'
        },

    ]


    return (
        <>
            <Navbar />
            <div className="home-page px-2 md:px-5">
                {role === 'SUPER_ADMIN' ? <>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-5">
                        {superAdmin.map((el: statistika) => (
                            <Link to={el.link} className={`p-5 py-8 shadow-md mx-auto border flex items-start gap-4 rounded-md w-full bg-white`} key={el.name}>
                                <div className="flex flex-col space-y-4">
                                    <span className="border p-2 rounded-full shadow">{el.icon}</span>
                                    <p className="text-2xl font-bold">{el.number}</p>
                                </div>
                                <p className="text-2xl font-bold">{el.name}</p>
                            </Link>
                        ))}
                    </div>
                    <Statistika1/>
                    <Statistiks2/>
                </> : <>Admin</>}
            </div>
        </>
    );
};

export default Home;