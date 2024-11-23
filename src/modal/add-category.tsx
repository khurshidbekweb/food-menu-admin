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
import { useState } from "react";

const AddCategory = () => {
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        setFile(e.target.files[0]);
      }
    };
    return (
        <Dialog>
            <DialogTrigger className="p-2 border rounded-md font-semibold  border-[#2ed573]">Add Category</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="mb-4">Add category?</DialogTitle>
                    <DialogDescription className="flex flex-col space-y-4">
                        <Input type="text" placeholder="Category name" />
                        <Select>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Restaran Id" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="light">Ko'kcha</SelectItem>
                                <SelectItem value="dark">Rayhon</SelectItem>
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

export default AddCategory;