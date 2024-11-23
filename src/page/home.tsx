import Navbar from "@/components/navbar/navbar";
import { uselanguageAll } from "@/querys";

const Home = () => {
    const role = localStorage.getItem('role')
    const languageAll = uselanguageAll()?.data
    console.log(languageAll);
    
    
    return (
        <>        
        <Navbar/>
        <div className="home-page px-2 md:px-5">
            {role==='SUPER_ADMIN' ? <>Super admin</>:<>Admin</>}
        </div>
        </>
    );
};

export default Home;