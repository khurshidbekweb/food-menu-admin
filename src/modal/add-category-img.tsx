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
import { uselanguageAll } from "@/querys";
import { QUERY_KEYS } from "@/querys/query-key";
import { lanuage } from "@/types";
import { categoryImgUtils } from "@/utils/categoryImg.utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

const AddCategoryImg = () => {
    const [file, setFile] = useState<File | null>(null);
    const [description, setDescription] = useState<Record<string, string>>({});
    const [open, setOpen] = useState(false)
    const queryClient = useQueryClient()
    const language = uselanguageAll()?.data;


    const addCategotyImg = useMutation({
        mutationFn: categoryImgUtils.postCategoryImg,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.categoryImg] });
            toast.success('Image muvaffaqiyatli qo`shildi');
            setOpen(false)
            setFile(null)
            setDescription({})
        },
        onError: (err) => {
            toast.error('Xatolik mavjud');
            console.log(err);
        }
    })

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        setFile(e.target.files[0]);
      }
    };

    const handleAddCategoryImg = (e: React.FormEvent) => {
        e.preventDefault()
        addCategotyImg.mutate({
            image: file,
            description
        })
    }
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>, langCode: string) => {
        setDescription(prev => ({ ...prev, [langCode]: e.target.value }));
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="p-2 border rounded-md font-semibold  border-[#2ed573]" onClick={() => setOpen(true)}>Add Category</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                   <form onSubmit={handleAddCategoryImg}>
                   <DialogTitle className="mb-4">Add category?</DialogTitle>
                    <DialogDescription className="flex flex-col space-y-4">
                        {language?.length && language.map((el: lanuage) => (
                                <Input
                                    key={el._id}
                                    type="text"
                                    name={el.code}
                                    placeholder={el.code}
                                    value={description[el.code] || ""}
                                    onChange={(e) => handleNameChange(e, el.code)}
                                />
                            ))}
                    </DialogDescription>
                    <FileUpload file={file} handleFileChange={handleFileChange} />
                    <Button>Add</Button>
                   </form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default AddCategoryImg;