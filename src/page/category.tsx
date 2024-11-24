import Navbar from "@/components/navbar/navbar";
import { Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow } from "@/components/ui/table";
import { IMG_BASE_URL } from "@/constants";
import AddCategory from "@/modal/add-category";
import { useCategoryAll } from "@/querys";
import { useStore } from "@/store";
import { category, Restaurant } from "@/types";

const Category = () => {
    const restaurant:Restaurant = JSON.parse(localStorage.getItem('restaurentId'))
    const categoryes = useCategoryAll(restaurant?._id)?.data
    console.log(categoryes);
    
    const  {language} = useStore()
    return (
        <>
            <Navbar />
            <div className="p-2 md:px-5">
                <div className="flex justify-between items-center ">
                    <h2 className="text-2xl font-semibold">Category</h2>
                    <AddCategory />
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
                        {categoryes?.length && categoryes?.map((res: category) => (
                            <TableRow key={res._id}>
                                <TableCell className="font-medium">{JSON.parse(res.name)[language.code]}</TableCell>
                                {/* <TableCell><img src={`${IMG_BASE_URL}${res.image}`} alt="category img" /></TableCell> */}
                                <TableCell><img className="w-[40px] rounded-full" src={`${IMG_BASE_URL}${res.image.image}`} alt="" /></TableCell>
                                {/* <TableCell className=""><DeleteModal style="" fn={deleteLanguage.mutate} id={res._id}/></TableCell> */}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    );
};

export default Category;