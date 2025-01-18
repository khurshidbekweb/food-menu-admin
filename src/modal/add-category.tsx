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
import { Language, Restaurant } from "@/types";
import { categoryUtils } from "@/utils/category";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

const AddCategory = () => {
    const [file, setFile] = useState<File | null>(null);
    const [open, setOpen] = useState(false)
    const [categoryName, setCategoryName] = useState<Record<string, string>>({});
    const restarant:Restaurant = JSON.parse(localStorage.getItem('restaurentId') as string)
    const {t} = useTranslation()   
    const languages = restarant?.languages
    

    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
          setFile(e.target.files[0]);
        }
      };
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
            image: file,
            name: categoryName,
            restaurantId: restarant._id
        },{
            onSuccess:() =>{
                form.reset(); 
                setFile(null)
            }
        })
    }
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>, langCode: string) => {
        setCategoryName(prev => ({ ...prev, [langCode]: e.target.value }));
    };


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="p-2 border rounded-md font-semibold  border-[#2ed573]" onClick={() => setOpen(true)}>{t("add_modal")}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <form onSubmit={handleAddCategory}>
                        <DialogTitle className="mb-4">{t("add_modal_category")}</DialogTitle>
                        <DialogDescription className="flex flex-col space-y-4">
                            {languages?.length && languages?.map((el: Language) => (
                                <Input key={el._id} type="text" placeholder={el.code} name={el.code} value={categoryName[el.code] || ""}
                                onChange={(e) => handleNameChange(e, el.code)}/>
                            ))}
                            <FileUpload file={file} handleFileChange={handleFileChange} />
                        </DialogDescription>
                        <Button className="w-full mt-3" type="submit">{t("add_modal_botton")}</Button>
                    </form>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    );
};

export default AddCategory;