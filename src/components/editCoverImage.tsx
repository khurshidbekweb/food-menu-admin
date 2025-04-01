import { Pen } from "lucide-react";
import { useState } from "react";
import ImageCropper from "./image-cropper";

interface FileUploadProps {
    file: File | null;
    setFile: (file: File | null) => void; 
    handelCoverImage: () => void
}
const EditCoverImage = ({ file, setFile,handelCoverImage }: FileUploadProps) => {
    const [originalImage, setOriginalImage] = useState<string | null>(null);
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            setOriginalImage(URL.createObjectURL(selectedFile)); 
        }           
    }
    

    return (
        <div className="flex items-center gap-4">
            {/* Fayl yuklash tugmasi */}
            <label className="absolute right-2 bottom-2">
                <p className=" p-1 rounded-md font-semibold mt-2 cursor-pointer flex gap-3">
                    <Pen />
                </p>
                <input
                    required
                    type="file"
                    className="opacity-0 w-1 absolute"
                    accept="image/*"
                    onChange={handleFileChange}
                />
            </label>

            {/* Rasm preview va crop qilish */}
            {originalImage && file && (
                <ImageCropper src={originalImage}  onCrop={(croppedFile) => {
                        setFile(croppedFile); // Yangi faylni o‘rnatish
                        handelCoverImage();   // Funksiyani chaqirish
                    }} 
                />
            )}
        </div>
    );
};

export default EditCoverImage;