import Navbar from "@/components/navbar/navbar";
import { Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow } from "@/components/ui/table";
import { IMG_BASE_URL } from "@/constants";
import { useUserMe } from "@/querys";
import { Restaurant } from "@/types";
import { useTranslation } from "react-i18next";

const UserProfile = () => {
    const restaurant:Restaurant =  JSON.parse(localStorage.getItem('restaurentId') as string)
    const me = useUserMe()?.data
    console.log(me?.user);
    const {t} = useTranslation()
    
    return (
        <>
            <Navbar/>
            <div className="px-3 md:px-5 mt-2">
                <img className="w-[250px] h-[250px] object-cover rounded-full mx-auto" src={`${IMG_BASE_URL}${restaurant?.image}`} alt="" />
                <Table>
                    <TableCaption>User Info</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>{t("user_usrname")}:</TableHead>
                            <TableHead>{me?.user?.username}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                            <TableRow>
                                <TableCell>{t("user_password")}: </TableCell>
                                <TableCell className="font-medium">{me?.user?.password}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>{t("user_role")}: </TableCell>
                                <TableCell className="font-medium">{me?.user?.role}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>{t("createAt")}: </TableCell>
                                <TableCell className="font-medium"> {me?.user?.createdAt.slice(0,10)}</TableCell>
                            </TableRow>
                    </TableBody>
                </Table>
            </div>
        </>
    );
};

export default UserProfile;