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
import { useStore } from "@/store";
import { Language, Restaurant } from "@/types";
import { restaurantUtils } from "@/utils/restaurant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

const RestaurantUser = () => {
    const restaurant:Restaurant =  JSON.parse(localStorage.getItem('restaurentId') as string)
    const queryClient = useQueryClient()
    const {language} = useStore()
    const [file, setFile] = useState<File | null>(null)
    const foodAll = useFoodAll(restaurant?._id)?.data
    const {t} = useTranslation()
    const categoryAll = useCategoryAll(restaurant?._id)?.data
    const getQrCode = useRestuarantLink(`${DOMEN_URL}${restaurant?._id}`)?.data
    console.log(restaurant);
    const languages: string[] = []
    restaurant?.languages.forEach((el: Language) => {
        languages.push(el._id)
    })
    const editRestaran = useMutation({
        mutationFn: restaurantUtils.editRestaurant,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['restaurants']})
            toast.success('Edit Cover image')
        },
        onError: (err) => {
            console.log(err);
            toast.error('Something went wrong !')
        }
    })
    const handleEditRestaurant = () => {
        editRestaran.mutate({
            coverImage: file ? file : null,
            id: restaurant._id,
            name: restaurant.name,
            image: null,
            languages: languages
        })
    }
    return (
        <>
            <Navbar/>
            <div className="px-3 md:px-5 mt-2">
                <div className="border p-2 rounded-[20px] relative">
                    <img className="w-[150px] h-[150px] object-cover rounded-full mx-auto" src={`${IMG_BASE_URL}${restaurant?.image}`} alt="" />
                    <EditCoverImage file={file} setFile={setFile} handelCoverImage={handleEditRestaurant}/>
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
                                <TableCell>{t("qr_code")}: </TableCell>
                                <TableCell className="font-medium"> <ViewQRCode id={restaurant?._id} data={getQrCode}/></TableCell>
                            </TableRow>
                    </TableBody>
                </Table>
            </div>
        </>
    );
};

export default RestaurantUser;