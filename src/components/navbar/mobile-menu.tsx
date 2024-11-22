import { Menu } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "../ui/sheet";
import logo from '@/assets/image/menu.jpg'
import { navLink } from "@/constants";
import { Link, useLocation } from "react-router-dom";
import { navLinkType } from "@/types";

const MobileMenu = () => {
    const location = useLocation()
    console.log(location.pathname);
    
    return (
        <Sheet>
            <SheetTrigger><Menu /></SheetTrigger>
            <SheetContent side={'left'}>
                <SheetHeader>
                    <SheetTitle className="flex items-center gap-x-5">
                        <img width={50} src={logo} className="rounded-full" alt="logo" />
                        <p className="text-[18px] font-semibold">Food menu</p>
                    </SheetTitle>
                    <SheetDescription>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium, quo?
                    </SheetDescription>
                    <div className="flex flex-col space-y-3">
                        {navLink.map((nav: navLinkType) => (
                            <Link key={nav.path} className={`flex items-center gap-3 p-1 ${nav.path===location.pathname ? 'border rounded-md border-blue-500' : ''}`} to={nav.path}>
                                {nav.icon}
                                {nav.element}
                            </Link>
                        ))}
                    </div>
                </SheetHeader>
            </SheetContent>
        </Sheet>

    );
};

export default MobileMenu;