import { Languages } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const Language = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger><Languages /></DropdownMenuTrigger>
            <DropdownMenuContent className="!w-[20px]">
                <DropdownMenuItem>Uz</DropdownMenuItem>
                <DropdownMenuItem>Ru</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

    );
};

export default Language;