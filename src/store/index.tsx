/* eslint-disable react-refresh/only-export-components */
import React, { createContext, ReactNode, useContext, useState } from "react"

type language = string

interface LanguageStoreTye{
    language: language,
    changeLanguage: (lang: language) => void
}

const LanguageStore = createContext<LanguageStoreTye | undefined>(undefined)

interface StoreProviderProps {
    children: ReactNode; // Bolalar elementlari
}

export const LanguageProvider:React.FC<StoreProviderProps> = ({children}) => {
    // const activeLanguageLocalStorge = localStorage.getItem('language')
    const [activeLanguage, setActiveLanguage] = useState<language>('uz')

    const changeLanguage = (lang: language) => {
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