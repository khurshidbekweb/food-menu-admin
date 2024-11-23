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
import { languageUtils } from "@/utils/language.utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
const AddLanguage = () => {
    const [file, setFile] = useState<File | null>(null);
    const queryClinet = useQueryClient()
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        setFile(e.target.files[0]);
      }
    };
    const addLanguage = useMutation({
        mutationFn: languageUtils.postLanguage,
        onSuccess: () => {
            queryClinet.invalidateQueries({ queryKey: [QUERY_KEYS.language_all] });
            toast.success('Restoran muvaffaqiyatli qo`shildi');
        },
        onError: (err) => {
            toast.error('Xatolik mavjud');
            console.log(err);
        }
    })
    const handelAddLanguage = (e: React.FormEvent) => {
        e.preventDefault()
        const form = e.target as HTMLFormElement;

        addLanguage.mutate({
            image: file,
            code: (form.elements.namedItem("code") as HTMLInputElement).value,
            name:(form.elements.namedItem("name") as HTMLInputElement).value
        })
    }
    return (
        <Dialog>
            <DialogTrigger className="p-2 border rounded-md font-semibold  border-[#2ed573]">Add Language</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="mb-4">Add language 🌐</DialogTitle>
                    <form onSubmit={handelAddLanguage}>
                        <DialogDescription className="flex flex-col space-y-4">
                            <Input name="name" type="text" placeholder="Language name" />
                            <Input name="code" type="text" placeholder="Language code" />
                        </DialogDescription>
                        <FileUpload file={file} handleFileChange={handleFileChange} />
                        <Button type="submit" className="w-full">Add</Button>
                    </form>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    );
};

export default AddLanguage;