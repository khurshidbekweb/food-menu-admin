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
import { useRestuarantLink } from "@/querys";
import { useStore } from "@/store";
import { Restaurant } from "@/types";
import { useTranslation } from "react-i18next";

const RestaurantUser = () => {
    const restaurant:Restaurant =  JSON.parse(localStorage.getItem('restaurentId') as string)
    const {language} = useStore()
    const {t} = useTranslation()
    const getQrCode = useRestuarantLink(`${DOMEN_URL}${restaurant?._id}`)?.data
    return (
        <>
            <Navbar/>
            <div className="px-3 md:px-5 mt-2">
                <img className="w-[250px] h-[250px] object-cover rounded-full mx-auto" src={`${IMG_BASE_URL}${restaurant?.image}`} alt="" />
                <Table>
                    <TableCaption>Restaurant user</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>{t("table_name")}:</TableHead>
                            <TableHead>{restaurant?.name[language.code]}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                            <TableRow>
                                <TableCell>{t("table_desc")}: </TableCell>
                                {/* <TableCell className="font-medium">{JSON.parse(restaurant?.description)[language?.code]}</TableCell> */}
                            </TableRow>
                            <TableRow>
                                <TableCell>{t("food")}: </TableCell>
                                <TableCell className="font-medium">{restaurant?.name[language?.code]}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>{t("categories")}: </TableCell>
                                <TableCell className="font-medium">{}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>{t("qr_code")}: </TableCell>
                                <TableCell className="font-medium"> <ViewQRCode data={getQrCode}/></TableCell>
                            </TableRow>
                    </TableBody>
                </Table>
            </div>
        </>
    );
};

export default RestaurantUser;