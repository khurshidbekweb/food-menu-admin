import { Languages } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { uselanguageAll } from "@/querys";
import { lanuage } from "@/types";
import { IMG_BASE_URL } from "@/constants";
import { useStore } from "@/store";
import { useEffect } from "react";

const Language = () => {
    const languages = uselanguageAll()?.data
    const {language, changeLanguage} = useStore()
    console.log(language);
    useEffect(()=>{
        if(!language){
            localStorage.setItem('language', 'uz')
        }else{localStorage.setItem('language', language)}
    },[language])
    
    return (
        <DropdownMenu>
            <DropdownMenuTrigger><Languages /></DropdownMenuTrigger>
            <DropdownMenuContent className="!w-[20px]">
                {
                    languages?.length && languages.map((el:lanuage) => (
                        <DropdownMenuItem key={el._id} onClick={() => changeLanguage(el.code)}><img src={`${IMG_BASE_URL}${el.image}`} alt="language image" /> {el.code}</DropdownMenuItem>
                    ))
                }
            </DropdownMenuContent>
        </DropdownMenu>

    );
};

export default Language;