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
import { Language, Restaurant } from "@/types";
import { restaurantUtils } from "@/utils/restaurant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

const EditRestaurant = () => {
    const [open, setOpen] = useState(false)
    const [languages, setLanguages] = useState<string[]>([]);
    const [restaurantName, setRestaurantName] = useState<Record<string, string>>({});
    const queryClient = useQueryClient();
    const language = uselanguageAll()?.data;
    const {t} = useTranslation()
    const users = useUserAll()?.data?.filter((el: Restaurant) => el.restaurant == null);  

    const editRestaurant = useMutation({
        mutationFn: restaurantUtils.editRestaurant,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.restuarant_one] });
            toast.success(data.message);
            setOpen(false)
            setRestaurantName({})
            setLanguages([])
        },
        onError: (err) => {
            toast.error('Xatolik mavjud');
            console.log(err);
        }
    });

    const handleAddRestaurant = (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        editRestaurant.mutate({
            description: '',
            id: '',
            languages: ['aa'],
            name: restaurantName,
            serviceCharge: 10
        })
        const restaurantData = {
            id:'sss',
            name: restaurantName,
            description: '',
            languages,
            serviceCharge: (form.elements.namedItem("serviceCharge") as HTMLInputElement).value,
        };  
        console.log(restaurantData);
        
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
            <DialogTrigger className="p-2 border rounded-md font-semibold border-[#2ed573]" onClick={() => setOpen(true)}>{t("add_modal")}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="mb-4">{t("add_modal_restaurant")}</DialogTitle>
                    <h3 className="text-start">{t("add_modal_restaurant_title")}</h3>
                    <form className="w-full p-0" onSubmit={handleAddRestaurant}>
                        <DialogDescription className="flex flex-col space-y-4 my-2">
                            {language?.length && language.map((el: Language) => (
                                <Input
                                    key={el._id}
                                    type="text"
                                    name={el.code}
                                    placeholder={el.code}
                                    value={restaurantName[el.code] || ""}
                                    onChange={(e) => handleNameChange(e, el.code)}
                                />
                            ))}
                            <div className="flex justify-between items-center gap-2 text-start">
                                <label className="w-full">
                                    <span className="text-black">{t('user_select')}</span>
                                    <Select name="userId">
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="User Id" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {users?.length && users.filter((user:Restaurant)=>user.user.role=="ADMIN").map((el: Restaurant) => (
                                                <SelectItem key={el.user._id} value={el.user._id}>{el.user.username}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </label>
                                <label className="w-full">
                                    <span className="text-black">{t('service_charge')}</span>
                                    <Input
                                        type="tel"
                                        defaultValue={0}
                                        name="serviceCharge"
                                    />
                                </label>                                    
                            </div>                            
                        </DialogDescription>

                        <div className="grid grid-cols-3 gap-2 mt-2">
                            {language?.length && language.map((el: Language) => (
                                <label key={el._id} className="text-sm font-medium leading-none flex gap-2">
                                    <Checkbox
                                        checked={languages.includes(el._id)}
                                        onCheckedChange={(checked) => handleLanguageChange(el._id, checked === true)}
                                    />
                                    <p>{el.name}</p>
                                </label>
                            ))}
                        </div>
                        <Button className="w-full mt-2" type="submit">{t("add_modal_botton")}</Button>
                    </form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default EditRestaurant;
