import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const Root = () => {
    const navigate = useNavigate()
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/')
        }
    }, [])
    
    return (
        <div className="container mx-auto max-w-6xl">
            <Outlet />
        </div>
    );
};

export default Root;