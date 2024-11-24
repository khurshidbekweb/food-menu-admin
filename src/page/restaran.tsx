import Navbar from "@/components/navbar/navbar";
import AddRestaurant from "@/modal/add-restaurant";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { useRestuarant } from "@/querys";
import DeleteModal from "@/modal/delete-modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { restaurantUtils } from "@/utils/restaurant";
import toast from "react-hot-toast";
import { QUERY_KEYS } from "@/querys/query-key";
import { Restaurant } from "@/types";
import { BASE_URL_SERVER } from "@/constants";

const Restaran = () => {
    const restaurant = useRestuarant()?.data
    const queryClient = useQueryClient()
    const deleteRestaran = useMutation({
        mutationFn: restaurantUtils.deleteRestuarant,
        onSuccess: () => {
            toast.success('Muvaffaqiyatli o`chirildi')
            queryClient.invalidateQueries({queryKey: [QUERY_KEYS.restuarant_all]})
         },
         onError: (err) => {
            console.log(err);
            toast.error('Xatolik mavjud')
         }
    })
    
    return (
        <>
            <Navbar />
            <div className="px-2 md:px-5">
                <div className="flex justify-between items-center mt-3">
                    <h2 className="text-2xl font-semibold">Restaurant</h2>
                    <AddRestaurant />
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
                        {restaurant?.length && restaurant?.map((res: Restaurant) => (
                            <TableRow key={res._id}>
                                <TableCell className="font-medium">{res.name}</TableCell>
                                <TableCell>{res.user.username}</TableCell>
                                <TableCell><img src={`${BASE_URL_SERVER}${res.image}`} alt="" /></TableCell>
                                <TableCell className=""><DeleteModal style="" fn={deleteRestaran.mutate} id={res._id}/></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    );
};

export default Restaran;