import Navbar from "@/components/navbar/navbar";
import { Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow } from "@/components/ui/table";
import { DOMEN_URL, IMG_BASE_URL } from "@/constants";
import ViewQRCode from "@/modal/view-img";
import { useRestuarantLink } from "@/querys";
import { useStore } from "@/store";
import { Restaurant } from "@/types";

const RestaurantUser = () => {
    const restaurant:Restaurant =  JSON.parse(localStorage.getItem('restaurentId'))
    const {language} = useStore()
    const getQrCode = useRestuarantLink(`${DOMEN_URL}${restaurant?._id}`)?.data
    return (
        <>
            <Navbar/>
            <div className="px-3 md:px-5 mt-2">
                <img className="w-[250px] h-[250px] object-cover rounded-full mx-auto" src={`${IMG_BASE_URL}${restaurant?.image}`} alt="" />
                <Table>
                    <TableCaption>All language table</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name:</TableHead>
                            <TableHead>{JSON.parse(restaurant?.name)[language.code]}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                            <TableRow>
                                <TableCell>Description: </TableCell>
                                {/* <TableCell className="font-medium">{JSON.parse(restaurant?.description)[language?.code]}</TableCell> */}
                            </TableRow>
                            <TableRow>
                                <TableCell>Foods: </TableCell>
                                <TableCell className="font-medium">{restaurant?.name[language?.code]}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Categories: </TableCell>
                                <TableCell className="font-medium">{}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>QR code: </TableCell>
                                <TableCell className="font-medium"> <ViewQRCode data={getQrCode}/></TableCell>
                            </TableRow>
                    </TableBody>
                </Table>
            </div>
        </>
    );
};

export default RestaurantUser;