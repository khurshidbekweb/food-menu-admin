import FileUpload from "@/components/file-upload";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { uselanguageAll, useUserAll } from "@/querys";
import { lanuage, Restaurant } from "@/types";
import { useState } from "react";

const AddRestaurant = () => {
    const [file, setFile] = useState<File | null>(null);
    const language = uselanguageAll()?.data
    const users = useUserAll()?.data?.filter((el: Restaurant) => el.restaurant ==null )
console.log(language, users);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        setFile(e.target.files[0]);
      }
    };
    return (
        <Dialog>
            <DialogTrigger className="p-2 border rounded-md font-semibold  border-[#2ed573]">Add Restaurant</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="mb-4">Add restaurant</DialogTitle>
                    <DialogDescription className="flex flex-col space-y-4">
                        <h3>Restaurant nomi kiriting</h3>
                        {language?.length && language.map((el:lanuage) => (
                            <Input key={el._id} type="text" name={el.code} placeholder={el.code} />
                        ))}
                        <Select>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="User Id" />
                            </SelectTrigger>
                            <SelectContent>
                                {users?.length && users.map((el: Restaurant) => (
                                <SelectItem key={el.user._id} value={el.user._id}>{el.user.username}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </DialogDescription>
                    <FileUpload file={file} handleFileChange={handleFileChange} />
                    <Button>Add</Button>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    );
};

export default AddRestaurant;