import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { uselanguageAll } from "@/querys";
import { IMG_BASE_URL } from "@/constants";
import { useStore } from "@/store";
import { useEffect } from "react";
import { Language } from "@/types";

const LanguageChange = () => {
    const languages = uselanguageAll()?.data    
    const {language, changeLanguage} = useStore()
    
    useEffect(()=>{
       
    },[language])
     if(!language){
            localStorage.setItem('language', JSON.stringify({
                code:"uz",
                createdAt:"2024-11-23T12:44:29.922Z",
                image : 
                "public/static/uzbekistan.png",
                name: "O'zbek",
                updatedAt:"2024-11-23T12:44:29.922Z",
                __v: 0,
                _id:"6741ce2da360c5d6323af416"}))
        }else{localStorage.setItem('language', JSON.stringify(language))}
    
    return (
        <DropdownMenu>
            <DropdownMenuTrigger><img className="w-[28px] h-[28px] rounded-full" src={`${IMG_BASE_URL}${language.image}`} alt="" /></DropdownMenuTrigger>
            <DropdownMenuContent className="!w-[20px]">
                {
                    languages?.length && languages.map((el:Language) => (
                        <DropdownMenuItem className="cursor-pointer" key={el._id} onClick={() => changeLanguage(el)}><img className="w-[30px] h-[30px] rounded-full" src={`${IMG_BASE_URL}${el.image}`} alt="language image" /> {el.name}</DropdownMenuItem>
                    ))
                }
            </DropdownMenuContent>
        </DropdownMenu>

    );
};

export default LanguageChange;