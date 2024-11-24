import Navbar from "@/components/navbar/navbar";
import AddLanguage from "@/modal/add-language";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { uselanguageAll } from "@/querys";
import DeleteModal from "@/modal/delete-modal";
import { IMG_BASE_URL } from "@/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { languageUtils } from "@/utils/language.utils";
import toast from "react-hot-toast";
import { QUERY_KEYS } from "@/querys/query-key";
import { Language } from "@/types";

const LanguagePage = () => {
    const languages = uselanguageAll()?.data
    const queryClient = useQueryClient()
    
    const deleteLanguage = useMutation({
        mutationFn: languageUtils.deletLanguage,
        onSuccess: () => {
            toast.success('Muvaffaqiyatli o`chirildi')
            queryClient.invalidateQueries({queryKey: [QUERY_KEYS.language_all]})
         },
         onError: (err) => {
            console.log(err);
            toast.error('Xatolik mavjud')
         }
    })
    return (
        <>
            <Navbar/>
            <div className="p-2 md:px-5">
                <div className="flex justify-between items-center ">
                    <h2 className="text-2xl font-semibold">Language</h2>
                    <AddLanguage />
                </div>
                <Table>
                    <TableCaption>All language table</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Name</TableHead>
                            <TableHead>Code</TableHead>
                            <TableHead>Image</TableHead>
                            <TableHead className="text-right"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {languages?.length && languages?.map((res: Language) => (
                            <TableRow key={res._id}>
                                <TableCell className="font-medium">{res.name}</TableCell>
                                <TableCell>{res.code}</TableCell>
                                <TableCell><img className="w-[40px] rounded-full" src={`${IMG_BASE_URL}${res.image}`} alt="" /></TableCell>
                                <TableCell className=""><DeleteModal style="" fn={deleteLanguage.mutate} id={res._id}/></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    );
};

export default LanguagePage;