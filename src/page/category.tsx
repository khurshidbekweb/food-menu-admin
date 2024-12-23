import Navbar from "@/components/navbar/navbar";
import { Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow } from "@/components/ui/table";
import { IMG_BASE_URL } from "@/constants";
import AddCategory from "@/modal/add-category";
import DeleteModal from "@/modal/delete-modal";
import EditCategory from "@/modal/edit-category";
import { useCategoryAll } from "@/querys";
import { QUERY_KEYS } from "@/querys/query-key";
import { useStore } from "@/store";
import { category, Restaurant } from "@/types";
import { categoryUtils } from "@/utils/category";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

const Category = () => {
    const restaurant:Restaurant = JSON.parse(localStorage.getItem('restaurentId') as string)
    const categoryes = useCategoryAll(restaurant?._id)?.data    
    const  {language} = useStore()
    const queryClient = useQueryClient()
    const {t} = useTranslation()
    const deleteCategory = useMutation({
    mutationFn: categoryUtils.deleteCategory,
    onSuccess: () => {
        toast.success('Muvaffaqiyatli o`chirildi')
        queryClient.invalidateQueries({queryKey: [QUERY_KEYS.category]})
     },
     onError: (err) => {
        console.log(err);
        toast.error('Xatolik mavjud')
     }
    })
    return (
        <>
            <Navbar />
            <div className="p-2 md:px-5">
                <div className="flex justify-between items-center ">
                    <h2 className="text-2xl font-semibold">{t("categories")}</h2>
                    <AddCategory />
                </div>
                <Table>
                    <TableCaption>{t("category_table_all")}</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>{t("table_img")}</TableHead>
                            <TableHead className="w-[100px]">{t("table_name")}</TableHead>
                            <TableHead></TableHead>
                            <TableHead className="text-right"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {categoryes?.length && categoryes?.map((res: category) => (
                            <TableRow key={res._id}>
                                <TableCell><img className="w-[40px] h-[40px] rounded-full" src={`${IMG_BASE_URL}${res?.image}`} alt="" /></TableCell>
                                <TableCell className="font-medium">{res?.name[language?.code]}</TableCell>
                                {/* <TableCell><img src={`${IMG_BASE_URL}${res.image}`} alt="category img" /></TableCell> */}
                                <TableCell className="flex gap-x-4 items-center">
                                    <DeleteModal style="" fn={deleteCategory.mutate} id={res?._id}/>
                                    <EditCategory category={res} id={res?._id}/>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    );
};

export default Category;