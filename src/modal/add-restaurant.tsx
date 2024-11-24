import FileUpload from "@/components/file-upload";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { uselanguageAll, useUserAll } from "@/querys";
import { QUERY_KEYS } from "@/querys/query-key";
import { lanuage, Restaurant } from "@/types";
import { restaurantUtils } from "@/utils/restaurant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

const AddRestaurant = () => {
    const [file, setFile] = useState<File | null>(null);
    const [open, setOpen] = useState(false)
    const [languages, setLanguages] = useState<string[]>([]);
    const [restaurantName, setRestaurantName] = useState<Record<string, string>>({});
    const queryClient = useQueryClient();
    const language = uselanguageAll()?.data;
    const users = useUserAll()?.data?.filter((el: Restaurant) => el.restaurant == null);

    console.log(language);
    

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    const addRestaurant = useMutation({
        mutationFn: restaurantUtils.postRestaurant,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.restuarant_all] });
            toast.success('Restoran muvaffaqiyatli qo`shildi');
            setOpen(false)
        },
        onError: (err) => {
            toast.error('Xatolik mavjud');
            console.log(err);
        }
    });

    const handleAddRestaurant = (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        if (!file) {
            return toast.error("Iltimos, rasm yuklang!");
        }
        const restaurantData = {
            image: file,
            name: restaurantName,
            userId: (form.elements.namedItem("userId") as HTMLInputElement).value,
            description: '',
            languages
        };

        addRestaurant.mutate(restaurantData);
        console.log(addRestaurant.variables);
        
    };

   const handleLanguageChange = (languageId: string, checked: boolean) => {
        setLanguages((prevLanguages) => {
            if (checked) {
                // Agar checkbox tanlangan bo'lsa, uni arrayga qo'shish
                return [...prevLanguages, languageId];
            } else {
                // Agar checkbox tanlanmagan bo'lsa, uni arraydan olib tashlash
                return prevLanguages.filter(id => id !== languageId);
            }
        });
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>, langCode: string) => {
        setRestaurantName(prev => ({ ...prev, [langCode]: e.target.value }));
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="p-2 border rounded-md font-semibold border-[#2ed573]" onClick={() => setOpen(true)}>Add Restaurant</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="mb-4">Add restaurant</DialogTitle>
                    <h3 className="text-start">Restaurant nomi kiriting</h3>
                    <form className="w-full p-0" onSubmit={handleAddRestaurant}>
                        <DialogDescription className="flex flex-col space-y-4 my-2">
                            {language?.length && language.map((el: lanuage) => (
                                <Input
                                    key={el._id}
                                    type="text"
                                    name={el.code}
                                    placeholder={el.code}
                                    value={restaurantName[el.code] || ""}
                                    onChange={(e) => handleNameChange(e, el.code)}
                                />
                            ))}

                            <Select name="userId">
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="User Id" />
                                </SelectTrigger>
                                <SelectContent>
                                    {users?.length && users.map((el: Restaurant) => (
                                        <SelectItem key={el.user._id} value={el.user._id}>{el.user.username}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </DialogDescription>

                        <div className="grid grid-cols-3 gap-2">
                            {language?.length && language.map((el: lanuage) => (
                                <label key={el._id} className="text-sm font-medium leading-none flex gap-2">
                                    <Checkbox
                                        checked={languages.includes(el._id)}
                                        onCheckedChange={(checked) => handleLanguageChange(el._id, checked === true)}
                                    />
                                    <p>{el.name}</p>
                                </label>
                            ))}
                        </div>

                        <FileUpload file={file} handleFileChange={handleFileChange} />
                        <Button className="w-full mt-2" type="submit">Add</Button>
                    </form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default AddRestaurant;
