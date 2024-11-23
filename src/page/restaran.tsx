import Navbar from "@/components/navbar/navbar";
import AddRestaurant from "@/modal/add-restaurant";

const Restaran = () => {
    return (
        <>
            <Navbar/>
        <div className="px-2 md:px-5">
<div className="flex justify-between items-center mt-3">
    <h2 className="text-2xl font-semibold">Restaurant</h2>
    <AddRestaurant/>
</div>
        </div>
        </>
    );
};

export default Restaran;