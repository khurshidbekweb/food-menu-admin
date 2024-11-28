import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { uselanguageAll } from "@/querys";
import { IMG_BASE_URL } from "@/constants";
import { useStore } from "@/store";
import { Language, Restaurant } from "@/types";
import { useTranslation } from "react-i18next";

const LanguageChange = () => {
    const languages = uselanguageAll()?.data
    const { language, changeLanguage } = useStore()
    const role = localStorage.getItem('role')
    const restaurant:Restaurant = JSON.parse(localStorage.getItem('restaurentId') as string)
    const resLang:Language[] = restaurant?.languages
    const {i18n} = useTranslation()
    
    const handleChangeLanguage = (lang:Language) => {
        changeLanguage(lang)
        i18n.changeLanguage(lang.code)
    }    

    if (!language) {
        localStorage.setItem('language', JSON.stringify({
            code: "uz",
            createdAt: "2024-11-23T12:44:29.922Z",
            image:
                "public/static/uzbekistan.png",
            name: "O'zbek",
            updatedAt: "2024-11-23T12:44:29.922Z",
            __v: 0,
            _id: "6741ce2da360c5d6323af416"
        }))
    } else { localStorage.setItem('language', JSON.stringify(language)) }

    return (
        role === 'SUPER_ADMIN' ? <DropdownMenu>
            <DropdownMenuTrigger><img className="w-[28px] h-[28px] rounded-full" src={`${IMG_BASE_URL}${language.image}`} alt="imgC" /></DropdownMenuTrigger>
            <DropdownMenuContent className="!w-[20px]">
                {
                    languages?.length && languages.map((el: Language) => (
                        <DropdownMenuItem className="cursor-pointer" key={el._id} onClick={() => handleChangeLanguage(el)}><img className="w-[30px] h-[30px] rounded-full" src={`${IMG_BASE_URL}${el.image}`} alt="language image" /> {el.name}</DropdownMenuItem>
                    ))
                }
            </DropdownMenuContent>
        </DropdownMenu>
            :
            <DropdownMenu>
                <DropdownMenuTrigger><img className="w-[28px] h-[28px] rounded-full" src={`${IMG_BASE_URL}${language.image}`} alt="" /></DropdownMenuTrigger>
                <DropdownMenuContent className="!w-[20px]">
                    {
                        resLang?.length && resLang.map((el: Language) => (
                            <DropdownMenuItem className="cursor-pointer" key={el._id} onClick={() => handleChangeLanguage(el)}><img className="w-[30px] h-[30px] rounded-full" src={`${IMG_BASE_URL}${el.image}`} alt="language image" /> {el.name}</DropdownMenuItem>
                        ))
                    }
                </DropdownMenuContent>
            </DropdownMenu>

    );
};

export default LanguageChange;