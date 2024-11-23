import Navbar from "@/components/navbar/navbar";
import AddCategory from "@/modal/add-category";

const CategoryImg = () => {
    return (
        <>
            <Navbar/>
            <div className="flex justify-between items-center p-2 md:px-5">
                <h2 className="text-2xl font-semibold">Category Image</h2>
                <AddCategory/>
            </div>
        </>
    );
};

export default CategoryImg;