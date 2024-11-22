import { Outlet } from "react-router-dom";

const Root = () => {
    return (
        <div className="container mx-auto max-w-6xl">
            <Outlet/>
        </div>
    );
};

export default Root;