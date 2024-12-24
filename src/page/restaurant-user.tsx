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
import { Restaurant } from "@/types";
import { useTranslation } from "react-i18next";

const RestaurantUser = () => {
    const restaurant:Restaurant =  JSON.parse(localStorage.getItem('restaurentId') as string)
    const {language} = useStore()
    const foodAll = useFoodAll(restaurant?._id)?.data
    const {t} = useTranslation()
    const categoryAll = useCategoryAll(restaurant?._id)?.data
    const getQrCode = useRestuarantLink(`${DOMEN_URL}${restaurant?._id}`)?.data
    console.log(restaurant);
    
    return (
        <>
            <Navbar/>
            <div className="px-3 md:px-5 mt-2">
                <img className="w-[250px] h-[250px] object-cover rounded-full mx-auto" src={`${IMG_BASE_URL}${restaurant?.image}`} alt="" />
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