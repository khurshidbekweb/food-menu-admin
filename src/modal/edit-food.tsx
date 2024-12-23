import FileUpload from "@/components/file-upload";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { QUERY_KEYS } from "@/querys/query-key";
import { useStore } from "@/store";
import { Food, Language, Restaurant } from "@/types";
import { foodUtils } from "@/utils/food.utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Pen } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
interface PropsFood{
    food: Food
}

const EditFood = ({food}:PropsFood) => {
    const [file, setFile] = useState<File | null>(null);
    const [open, setOpen] = useState(false)
    const {language} = useStore()
    const restaurant: Restaurant = JSON.parse(localStorage.getItem('restaurentId') as string)
    const languages = restaurant?.languages    
    const [foodName, setFoodName] = useState<Record<string, string>>(food.name);
    const [foodDescription, setFoodDescription] = useState<Record<string, string>>(food.description);
    const queryClient = useQueryClient()
    const editFood = useMutation({
        mutationFn:foodUtils.editFood,
        onSuccess: () => {
            toast.success("Muvaffaqiyatli tahrirlandi")
            queryClient.invalidateQueries({queryKey: [QUERY_KEYS.food]})
            setOpen(false)
            setFoodDescription({})
            setFoodName({})
        },
        onError: (err) => {
            console.log(err);
            toast.error('Xatolik mavjud')            
        }
    })
    const handeEditFood = (e: React.FormEvent) => {
        e.preventDefault()
        const form = e.target as HTMLFormElement;
        if (!file) {
            return toast.error("Iltimos, rasm yuklang!");
        }
        editFood.mutate({
            id: food._id,
            description: foodDescription,
            image: file,
            name: foodName,
            price: Number((form.elements.namedItem("price") as HTMLSelectElement).value)
        })
    }
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };
    const handleNameFood = (e: React.ChangeEvent<HTMLInputElement>, langCode: string) => {
        setFoodName(prev => ({ ...prev, [langCode]: e.target.value }));
    };
    const handleNameFoodDescription = (e: React.ChangeEvent<HTMLInputElement>, langCode: string) => {
        setFoodDescription(prev => ({ ...prev, [langCode]: e.target.value }));
    };
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="text-blue-600 "><Pen size={15} /></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{food.name[language.code]}</DialogTitle>
                    <form onSubmit={handeEditFood}>
                    <DialogDescription className="flex flex-col space-y-1 my-2">
                    <p className="text-start">Name</p>
                            {languages?.length && languages.map((el: Language) => (
                                <Input
                                    defaultValue={food.name[el.code]}
                                    key={el._id}
                                    type="text"
                                    name={el.code}
                                    onChange={(e) => handleNameFood(e, el.code)}
                                />
                            ))}
                            <p className="text-start">Description</p>
                            {languages?.length && languages.map((el: Language) => (
                                <Input
                                    key={el._id}
                                    type="text"
                                    defaultValue={food.description[el.code]}
                                    name={el.code}
                                    onChange={(e) => handleNameFoodDescription(e, el.code)}
                                />
                            ))}
                            <Input
                                    type="number"
                                    name='price'
                                    defaultValue={food.price}
                            />
                            <FileUpload file={file} handleFileChange={handleFileChange} />
                    </DialogDescription>
                    <Button className="w-full mt-2" type="submit">Edit</Button>
                    </form>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    );
};

export default EditFood;