import FileUpload from "@/components/file-upload";
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
import { QUERY_KEYS } from "@/querys/query-key";
import { category, Language, Restaurant } from "@/types";
import { categoryUtils } from "@/utils/category";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Pen } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

interface propsCategory{
    id: string, 
    category: category
}

const EditCategory = ({category,id}:propsCategory) => {
    console.log(category);
    
    const [file, setFile] = useState<File | null>(null);
    const [name, setName] = useState<Record<string, string>>({});
    const [open, setOpen] = useState(false)
    const restarant: Restaurant = JSON.parse(localStorage.getItem('restaurentId') as string)
    const { t } = useTranslation()
    const languages = restarant?.languages

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    const queryClient = useQueryClient()
    const addCategory = useMutation({
        mutationFn: categoryUtils.editCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.category] });
            toast.success('Category muvaffaqiyatli qo`shildi');
            setOpen(false)
            setName({})
        },
        onError: (err) => {
            toast.error('Xatolik mavjud');
            console.log(err);
        }
    })
    const handleEditCategoryImg = (e: React.FormEvent) => {
        e.preventDefault()
        const form = e.target as HTMLFormElement;
        addCategory.mutate({
            id: id,
            image: file,
            name: name,
            restaurantId: restarant._id
        },{
            onSuccess:() =>{
                form.reset(); 
            }
        })
    }
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>, langCode: string) => {
        setName(prev => ({ ...prev, [langCode]: e.target.value }));
    };
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="p-2 border rounded-md font-semibold  border-[#2ed573] absolute right-1" onClick={() => setOpen(true)}><Pen /></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <form onSubmit={handleEditCategoryImg}>
                        <DialogTitle className="mb-4">{t("add_modal_category_img")}</DialogTitle>
                        <DialogDescription className="flex flex-col space-y-4">
                            {languages?.length && languages.map((el: Language) => (
                                <Input
                                    key={el?._id}
                                    type="text"
                                    name={el?.code}
                                    defaultValue={category?.name[el?.code]}
                                    value={category?.name[el?.code]}
                                    onChange={(e) => handleNameChange(e, el?.code)}
                                />
                            ))}
                        </DialogDescription>
                        <FileUpload file={file} handleFileChange={handleFileChange} />
                        <Button className="w-full">{t("add_modal_botton")}</Button>
                    </form>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    );
};

export default EditCategory;