import Navbar from "@/components/navbar/navbar";
import AddCategory from "@/modal/add-category";

const Category = () => {
    return (
        <>
            <Navbar/>
            <div className="flex justify-between items-center p-2 md:px-5">
                <h2 className="text-2xl font-semibold">Category</h2>
                <AddCategory/>
            </div>
        </>
    );
};

export default Category;