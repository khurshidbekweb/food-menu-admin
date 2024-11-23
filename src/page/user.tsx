import Navbar from "@/components/navbar/navbar";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import AddUser from "@/modal/add-user";
import DeleteModal from "@/modal/delete-modal";
import { useUserAll } from "@/querys";
import { QUERY_KEYS } from "@/querys/query-key";
import { Restaurant } from "@/types";
import { userUtils } from "@/utils/user.util";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const User = () => {
    const users: Restaurant[] = useUserAll()?.data
    console.log(users);
    const queryClinet = useQueryClient()
    const deleteUser = useMutation({
     mutationFn: userUtils.deleteUser,
     onSuccess: () => {
        toast.success('Muvaffaqiyatli o`chirildi')
        queryClinet.invalidateQueries({queryKey: [QUERY_KEYS.user]})
     },
     onError: (err) => {
        console.log(err);
        toast.error('Xatolik mavjud')
     }
    })

    return (
        <>
            <Navbar />
            <div className="p-2 md:px-5">
                <div className="flex justify-between items-center ">
                    <h2 className="text-2xl font-semibold">User</h2>
                    <AddUser />
                </div>
                <Table>
                    <TableCaption>All user table</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Username</TableHead>
                            <TableHead>Password</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead className="text-right"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.user._id}>
                                <TableCell className="font-medium">{user.user.username}</TableCell>
                                <TableCell>{user.user.password}</TableCell>
                                <TableCell>{user.user.role}</TableCell>
                                <TableCell className=""><DeleteModal fn={deleteUser.mutate} id={user.user?._id}/></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    );
};

export default User;