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
import { useState } from "react";

const AddCategoryImg = () => {
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
                    </DialogDescription>
                    <FileUpload file={file} handleFileChange={handleFileChange} />
                    <Button>Add</Button>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    );
};

export default AddCategoryImg;