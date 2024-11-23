import Navbar from "@/components/navbar/navbar";
import AddCategory from "@/modal/add-category";

const Category = () => {
    return (
        <>
            <Navbar />
            <div className="p-2 md:px-5">
                <div className="flex justify-between items-center ">
                    <h2 className="text-2xl font-semibold">Category</h2>
                    <AddCategory />
                </div>
            </div>
        </>
    );
};

export default Category;