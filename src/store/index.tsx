/* eslint-disable react-refresh/only-export-components */
import { Language } from "@/types";
import React, { createContext, ReactNode, useContext, useState } from "react"


interface LanguageStoreTye{
    language: Language,
    changeLanguage: (lang: Language) => void
}

const LanguageStore = createContext<LanguageStoreTye | undefined>(undefined)

interface StoreProviderProps {
    children: ReactNode; // Bolalar elementlari
}

export const LanguageProvider:React.FC<StoreProviderProps> = ({children}) => {
    const [activeLanguage, setActiveLanguage] = useState<Language>(JSON.parse(localStorage.getItem('language')!))

    const changeLanguage = (lang: Language) => {
        setActiveLanguage(lang);
      };

    return(
        <LanguageStore.Provider value={{changeLanguage, language:activeLanguage}}>
            {children}
        </LanguageStore.Provider>
    )
}
export const useStore = () => {
    const context = useContext(LanguageStore);
    if (!context) {
      throw new Error("useStore must be used within a StoreProvider");
    }
    return context;
  };