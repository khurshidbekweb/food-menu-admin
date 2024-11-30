import Navbar from "@/components/navbar/navbar";
import { Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow } from "@/components/ui/table";
import { IMG_BASE_URL } from "@/constants";
import AddFood from "@/modal/add-food";
import DeleteModal from "@/modal/delete-modal";
import EditFood from "@/modal/edit-food";
import { useFoodAll } from "@/querys";
import { QUERY_KEYS } from "@/querys/query-key";
import { useStore } from "@/store";
import { Food,  Restaurant } from "@/types";
import { foodUtils } from "@/utils/food.utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

const FoodPage = () => {
    const restaurant: Restaurant = JSON.parse(localStorage.getItem('restaurentId') as string)
    const {language} = useStore()
    const foods = useFoodAll(restaurant?._id)?.data
    const queryClient = useQueryClient()
    const {t} = useTranslation()
    const foodDelete = useMutation({
        mutationFn: foodUtils.deleteFood,
        onSuccess: () => {
            toast.success('Muvaffaqiyatli o`chirildi')
            queryClient.invalidateQueries({queryKey: [QUERY_KEYS.food]})
         },
         onError: (err) => {
            console.log(err);
            toast.error('Xatolik mavjud')
         }
    })
    return (
        <>
            <Navbar />
            <div className="px-2 md:px-5">
                <div className="flex justify-between items-center mt-2">
                    <h2 className="text-2xl font-semibold">{t('food')}</h2>
                    <AddFood />
                </div>
                <Table>
                    <TableCaption>All foods table</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>{t('table_img')}</TableHead>
                            <TableHead className="w-[100px]">{t("table_name")}</TableHead>
                            <TableHead>{t("table_desc")}</TableHead>
                            <TableHead>{t('table_price')}</TableHead>
                            <TableHead className="text-right"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {foods?.length && foods?.map((res: Food) => (
                            <TableRow key={res._id}>
                                <TableCell><img className="w-[70px] h-[40px] rounded-md" src={`${IMG_BASE_URL}${res.image}`} alt="food-image" /></TableCell>
                                <TableCell className="font-medium">{res.name[language.code]}</TableCell>
                                <TableCell className="font-medium">{res.description[language.code]}</TableCell>
                                <TableCell className="font-medium">{res.price}</TableCell>
                                <TableCell className="flex items-center gap-x-3 mt-3"><EditFood food={res} /> <DeleteModal style="" fn={foodDelete.mutate} id={res._id}/></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    );
};

export default FoodPage;