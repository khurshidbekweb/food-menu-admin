import Language from "./language";
import MobileMenu from "./mobile-menu";
import UserSettings from "./user-settings";

const Navbar = () => {
    return (
        <div className="flex justify-between items-center max-w-6xl h-[8vh] border px-2 md:px-5">
            <MobileMenu/>
            <div className="flex w-[70px] justify-between items-center">
                <Language/>
                <UserSettings/>
            </div>
        </div>
    );
};

export default Navbar;