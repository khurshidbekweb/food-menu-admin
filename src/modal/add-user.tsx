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
import toast from "react-hot-toast";

const AddUser = () => {
    const queryClinet = useQueryClient()
    const addUser = useMutation({
        mutationFn: userUtils.postUser,
        onSuccess: () => {
            queryClinet.invalidateQueries({ queryKey: [QUERY_KEYS.user] })
            toast.success('User muvaffaqiyatli qo`shildi')
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
        password,role,username
     })
     console.log(addUser.variables);
     
    }



    return (
        <div>
            <Dialog>
                <DialogTrigger className="p-2 border rounded-md font-semibold  border-[#2ed573]">Add user</DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="mb-4">Add user 🧑‍🦰</DialogTitle>
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
                        <Button type="submit" className="mt-5 w-full">Add</Button>
                        </form>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AddUser;