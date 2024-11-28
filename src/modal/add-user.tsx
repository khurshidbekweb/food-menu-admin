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
import { QUERY_KEYS } from "@/querys/query-key";
import { userUtils } from "@/utils/user.util";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

const AddUser = () => {
    const queryClinet = useQueryClient()
    const [open, setOpen] = useState(false)
    const {t} = useTranslation()
    const addUser = useMutation({
        mutationFn: userUtils.postUser,
        onSuccess: () => {
            queryClinet.invalidateQueries({ queryKey: [QUERY_KEYS.user] })
            toast.success('User muvaffaqiyatli qo`shildi')
            setOpen(false)
        },
        onError: (err) => {
            toast.error('Xatolik mavjud')
            console.log(err);
        }
    })

    const handleAddUser = (e: React.FormEvent) => {
        e.preventDefault()
        const form = e.target as HTMLFormElement; // e.target ni HTMLFormElement sifatida tiplaymiz
        const password = (form.elements.namedItem("password") as HTMLInputElement).value;
        const username = (form.elements.namedItem("username") as HTMLInputElement).value;
        const role = (form.elements.namedItem("role") as HTMLInputElement).value;
        addUser.mutate({
            password, role, username
        })
    }


    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <span className="p-2 border rounded-md font-semibold border-[#2ed573]" onClick={() => setOpen(true)}>{t("add_modal")}</span>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="mb-4">{t("add_modal_user")} 🧑‍🦰</DialogTitle>
                        <form onSubmit={handleAddUser} className="w-full">
                            <DialogDescription className="flex flex-col space-y-4">
                                <Input name="username" type="text" placeholder="Username" />
                                <Input name="password" type="text" placeholder="Password " />
                                <Select name="role">
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="user role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="ADMIN">Admin</SelectItem>
                                        <SelectItem value="SUPER_ADMIN">Supper admin</SelectItem>
                                    </SelectContent>
                                </Select>
                            </DialogDescription>
                            <Button type="submit" className="mt-5 w-full">{t("add_modal_botton")}</Button>
                        </form>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AddUser;