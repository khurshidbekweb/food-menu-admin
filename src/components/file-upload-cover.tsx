import { ImageDown } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import ImageCropper from "./image-cropper";

interface FileUploadProps {
    file: File | null;
    setFile: (file: File | null) => void; // Hodisa funksiyasi
}

const FileUploadCOver = ({ file, setFile }: FileUploadProps) => {
    const { t } = useTranslation()
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
            <label className="relative">
                <p className="border p-1 rounded-md font-semibold mt-2 shadow-md cursor-pointer flex gap-3">
                    {t("cover_image")} <ImageDown />
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
                <ImageCropper src={originalImage} onCrop={setFile} />
            )}

            {/* Crop qilingan rasm */}
            {file && (
                <div className="text-center mt-2">
                    <p>✅ Success</p>
                </div>
            )}
        </div>
    );
};

export default FileUploadCOver;