
import { User } from 'lucide-react';
import { DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger, } from '../ui/dropdown-menu';

const UserSettings = () => {
  const logOut = () => {
    localStorage.clear()
    window.location.reload()
  }
    return (
        <DropdownMenu>
        <DropdownMenuTrigger><User/></DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logOut} className='bg-red-400 text-white cursor-pointer hover:bg-red-400'>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
    );
};

export default UserSettings;