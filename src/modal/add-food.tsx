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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useCategoryAll } from "@/querys";
import { QUERY_KEYS } from "@/querys/query-key";
import { useStore } from "@/store";
import { category, Language, Restaurant } from "@/types";
import { foodUtils } from "@/utils/food.utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";

const AddFood = () => {
    const [file, setFile] = useState<File | null>(null);
    const [open, setOpen] = useState(false)
    const restaurant: Restaurant = JSON.parse(localStorage.getItem('restaurentId'))
    const category = useCategoryAll(restaurant?._id)?.data
    const languages = restaurant?.languages
    console.log(languages);
    
    const { language } = useStore()
    const [foodName, setFoodName] = useState<Record<string, string>>({});
    const [foodDescription, setFoodDescription] = useState<Record<string, string>>({});
    const queryClient = useQueryClient()


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };
    const addFood = useMutation({
        mutationFn: foodUtils.postFood,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.food] });
            toast.success('Restoran muvaffaqiyatli qo`shildi');
            setOpen(false)
        },
        onError: (err) => {
            toast.error('Xatolik mavjud');
            console.log(err);
        }
    })

    const handleAddFood = (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        if (!file) {
            return toast.error("Iltimos, rasm yuklang!");
        }
        addFood.mutate({
            categoryId: (form.elements.namedItem("categoryId") as HTMLSelectElement).value,
            name: foodName,
            description: foodDescription,
            price: 0,
            image: file,
            restaurantId: restaurant?._id
        })
    }
    const handleNameFood = (e: React.ChangeEvent<HTMLInputElement>, langCode: string) => {
        setFoodName(prev => ({ ...prev, [langCode]: e.target.value }));
    };
    const handleNameFoodDescription = (e: React.ChangeEvent<HTMLInputElement>, langCode: string) => {
        setFoodDescription(prev => ({ ...prev, [langCode]: e.target.value }));
    };
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="p-2 border rounded-md font-semibold border-[#2ed573] flex items-center gap-1" onClick={() => setOpen(true)}><Plus/> New Food</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="mb-4">New Food</DialogTitle>
                    <h3 className="text-start">Restaurant nomi kiriting</h3>
                    <form className="w-full p-0" onSubmit={handleAddFood}>
                        <DialogDescription className="flex flex-col space-y-4 my-2">
                            {languages?.length && languages.map((el: Language) => (
                                <Input
                                    key={el._id}
                                    type="text"
                                    name={el.code}
                                    placeholder={el.code}
                                    value={foodName[el.code] || ""}
                                    onChange={(e) => handleNameFood(e, el.code)}
                                />
                            ))}
                            {languages?.length && languages.map((el: Language) => (
                                <Input
                                    key={el._id}
                                    type="text"
                                    name={el.code}
                                    placeholder={el.code}
                                    value={foodDescription[el.code] || ""}
                                    onChange={(e) => handleNameFoodDescription(e, el.code)}
                                />
                            ))}

                            <Select name="categoryId">
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Category chooes" />
                                </SelectTrigger>
                                <SelectContent>
                                    {category?.length && category.map((el: category) => (
                                        <SelectItem key={el._id} value={el._id}>{JSON.parse(el.name)[language.code]}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </DialogDescription>

                        <FileUpload file={file} handleFileChange={handleFileChange} />
                        <Button className="w-full mt-2" type="submit">Add</Button>
                    </form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default AddFood;