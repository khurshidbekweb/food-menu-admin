import Navbar from "@/components/navbar/navbar";
import { IMG_BASE_URL } from "@/constants";
import AddCategoryImg from "@/modal/add-category-img";
import DeleteModal from "@/modal/delete-modal";
import { useCategoryImg } from "@/querys";
import { QUERY_KEYS } from "@/querys/query-key";
import { useStore } from "@/store";
import { CategoryIMG } from "@/types";
import { categoryImgUtils } from "@/utils/categoryImg.utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const CategoryImg = () => {
    const categoryImgAll = useCategoryImg()?.data
    const {language} = useStore()
    const queryClient = useQueryClient()
    const deleleteCategoryImg = useMutation({
        mutationFn: categoryImgUtils.deleteCategoryImg,
        onSuccess: () => {
            toast.success('Muvaffaqiyatli o`chirildi')
            queryClient.invalidateQueries({queryKey: [QUERY_KEYS.categoryImg]})
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
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold">Category Image</h2>
                    <AddCategoryImg />
                </div>
                <div className="grid grid-cols-2 gap-3 mt-4">
                    {categoryImgAll?.length && categoryImgAll.map((el: CategoryIMG) => (
                        <div className="relative">
                            <img className="rounded-md w-full h-[170px]" src={`${IMG_BASE_URL}${el.image}`} alt={el.description.en} />
                            <p className="absolute bg-red-600 z-30 top-2">{JSON.parse(el.description)[language.code]}</p>
                            <DeleteModal style="absolute right-1 text-white  bg-red-500 p-2 rounded-md bottom-7" fn={deleleteCategoryImg.mutate} id={el._id}/>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default CategoryImg;