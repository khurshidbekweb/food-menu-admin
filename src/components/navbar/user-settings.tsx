
import { User } from 'lucide-react';
import { DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger, } from '../ui/dropdown-menu';
import { useTranslation } from 'react-i18next';

const UserSettings = () => {
  const logOut = () => {
    localStorage.clear()
    window.location.reload()
  }
  const {t} = useTranslation()
    return (
        <DropdownMenu>
        <DropdownMenuTrigger><User/></DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{t("user_profile")}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logOut} className='bg-red-400 text-white cursor-pointer hover:bg-red-400'>{t("user_log_out")}</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
    );
};

export default UserSettings;