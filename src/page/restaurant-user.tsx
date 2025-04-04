import EditCoverImage from "@/components/editCoverImage";
import Navbar from "@/components/navbar/navbar";
import { Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow } from "@/components/ui/table";
import { DOMEN_URL, IMG_BASE_URL } from "@/constants";
import ViewQRCode from "@/modal/view-img";
import { useCategoryAll, useFoodAll, useRestuarantLink } from "@/querys";
import { QUERY_KEYS } from "@/querys/query-key";
import { useStore } from "@/store";
import { Language, Restaurant } from "@/types";
import { restaurantUtils } from "@/utils/restaurant";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { RefreshCcw } from "lucide-react";
import toast from "react-hot-toast";

import { useTranslation } from "react-i18next";

const RestaurantUser = () => {
    const restaurantID:Restaurant =  JSON.parse(localStorage.getItem('restaurentId') as string)
    const {data: restaurant, isLoading} = useQuery<Restaurant>({
        queryKey: [QUERY_KEYS.restuarant_one],
        queryFn: () => restaurantUtils.getRestaurantOneId(restaurantID?._id),
        enabled: !!restaurantID?._id
    })
    const queryClient = useQueryClient()
    const {language} = useStore()
    const foodAll = useFoodAll(restaurantID?._id)?.data
    const {t} = useTranslation()
    const categoryAll = useCategoryAll(restaurantID?._id)?.data
    const getQrCode = useRestuarantLink(`${DOMEN_URL}${restaurantID?._id}`)?.data
    const languages: string[] = []
    restaurant?.languages?.forEach((el: Language) => {
        languages.push(el._id)
    })

    const editImageRestaurant = useMutation({
        mutationFn: restaurantUtils.editRestaurantImage,
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: [QUERY_KEYS.restuarant_one]})
            toast.success(data.message)
        },
        onError: (err) => {
            console.log(err);
            toast.error(err.message)
        }
    })

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]; 
        if (!file) return; 
    
        editImageRestaurant.mutate({
            id: restaurantID?._id,
            image: file
        });
    };

    if(isLoading) return 'Loading...'
    return (
        <>
            <Navbar/>
            <div className="px-3 md:px-5 mt-2">
                <div className="relative overflow-hidden !w-full h-[170px] md:h-[220px] xl:h-[250px]  rounded-[20px]  flex items-center justify-center">
                    <div className="w-full h-full flex items-center justify-center relative">
                        <img className="w-[120px] h-[120px] object-cover rounded-full mx-auto z-10 shadow-lg border" src={`${IMG_BASE_URL}${restaurant?.image}`} alt="" />
                        <label className="absolute w-[120px] h-[120px] flex justify-end items-end">
                            <span className="bg-white !w-[30px] p-1 rounded-md shadow-md cursor-pointer block absolute !z-20 text-end"><RefreshCcw/> </span>
                            <input
                                required
                                type="file"
                                className="opacity-0 w-1 absolute"
                                onChange={handleFileChange}
                            />
                        </label>
                    </div>
                    <img className="absolute top-0 w-full h-full object-cover -z-10" src={`${IMG_BASE_URL}${restaurant?.coverImage}`} alt="cover image" />
                    <EditCoverImage id={restaurantID._id}/>
                </div>
                <Table>
                    <TableCaption>Restaurant</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>{t("table_name")}:</TableHead>
                            <TableHead>{restaurant?.name[language.code]}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                            <TableRow>
                                <TableCell>{t("food")}: </TableCell>
                                <TableCell className="font-medium">{foodAll?.length}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>{t("categories")}: </TableCell>
                                <TableCell className="font-medium">{categoryAll?.length}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>{t("Languages")}: </TableCell>
                                <TableCell className="flex gap-x-2">
                                {restaurant?.languages?.length
                                    ? (restaurant.languages as Language[]).map((lang) => (
                                        <img className="w-8" key={lang._id} src={`${IMG_BASE_URL}${lang.image}`} alt="restaurant image" />
                                        ))
                                    : null}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>{t("qr_code")}: </TableCell>
                                <TableCell className="font-medium"> <ViewQRCode id={restaurantID?._id} data={getQrCode}/></TableCell>
                            </TableRow>
                    </TableBody>
                </Table>
            </div>
        </>
    );
};

export default RestaurantUser;