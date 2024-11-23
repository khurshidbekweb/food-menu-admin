/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "./query-key";
import { languageUtils } from "@/utils/language.utils";
import { userUtils } from "@/utils/user.util";
import { categoryImgUtils } from "@/utils/categoryImg.utils";
import { restaurantUtils } from "@/utils/restaurant";

const uselanguageAll = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.language_all],
        queryFn: () => languageUtils.getLanguage(),
    });
};
const useLanguageId = (id: string) => (
    useQuery({
        queryKey: [QUERY_KEYS.language_one],
        queryFn: () => languageUtils.getLanguageId(id)
    })
);
const useUserAll = () => (
    useQuery({
        queryKey: [QUERY_KEYS.user],
        queryFn: () => userUtils.getUser
    })
);
const useCategoryImg = () => (
    useQuery({
        queryKey: [QUERY_KEYS.categoryImg],
        queryFn: () => categoryImgUtils.getcategoryImg
    })
);
const useRestuarant = () => (
    useQuery({
        queryKey: [QUERY_KEYS.restuarant_all],
        queryFn: () => restaurantUtils.getRestaurant
    })
);
const useRestuarantOne = (id:string) => (
    useQuery({
        queryKey: [QUERY_KEYS.restuarant_one],
        queryFn: () => restaurantUtils.getRestaurantOneId(id)
    })
)

export {uselanguageAll, useLanguageId, useUserAll,useCategoryImg,useRestuarant,useRestuarantOne}