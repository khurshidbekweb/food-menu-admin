import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue, } from "@/components/ui/select";
import { IMG_BASE_URL } from "@/constants";
import { useCategoryImg } from "@/querys";
import { QUERY_KEYS } from "@/querys/query-key";
import { useStore } from "@/store";
import { CategoryIMG, Language, Restaurant } from "@/types";
import { categoryUtils } from "@/utils/category";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

const AddCategory = () => {
    const [open, setOpen] = useState(false)
    const [categoryName, setCategoryName] = useState<Record<string, string>>({});
    const restarant:Restaurant = JSON.parse(localStorage.getItem('restaurentId'))
    const categoryImg = useCategoryImg()?.data
    
    const {language} = useStore()
    const languages = restarant?.languages
    

    // const restaurantLang = 
    const queryClient = useQueryClient()
    const addCategory = useMutation({
        mutationFn: categoryUtils.postCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.category] });
            toast.success('Category muvaffaqiyatli qo`shildi');
            setOpen(false)
            setCategoryName({})
        },
        onError: (err) => {
            toast.error('Xatolik mavjud');
            console.log(err);
        }
    })
    const handleAddCategory = (e: React.FormEvent) => {
        e.preventDefault()
        const form = e.target as HTMLFormElement;
        addCategory.mutate({
            image: (form.elements.namedItem("category-img") as HTMLSelectElement).value,
            name: JSON.stringify(categoryName),
            restaurantId: restarant._id
        },{
            onSuccess:() =>{
                form.reset(); 
            }
        })
    }
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>, langCode: string) => {
        setCategoryName(prev => ({ ...prev, [langCode]: e.target.value }));
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="p-2 border rounded-md font-semibold  border-[#2ed573]" onClick={() => setOpen(true)}>Add Category</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <form onSubmit={handleAddCategory}>
                        <DialogTitle className="mb-4">Add category?</DialogTitle>
                        <DialogDescription className="flex flex-col space-y-4">
                            {languages?.length && languages?.map((el: Language) => (
                                <Input key={el._id} type="text" placeholder={el.code} name={el.code} value={categoryName[el.code] || ""}
                                onChange={(e) => handleNameChange(e, el.code)}/>
                            ))}
                            <Select name="category-img">
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Category img" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categoryImg?.length && categoryImg.map((el: CategoryIMG) => (
                                        <SelectItem className="grid grid-cols-2 gap-x-1" key={el._id} value={el._id}>
                                            <img className="w-[30px] rounded-md inline-block" src={`${IMG_BASE_URL}${el.image}`} alt="category img" /> 
                                            <p className="text-black">{JSON.parse(el.description)[language.code]}</p>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </DialogDescription>
                        <Button className="w-full mt-3" type="submit">Add</Button>
                    </form>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    );
};

export default AddCategory;