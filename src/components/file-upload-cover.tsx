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
    const [croppedImage, setCroppedImage] = useState<string | null>(null);
    const [originalImage, setOriginalImage] = useState<string | null>(null);
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            setOriginalImage(URL.createObjectURL(selectedFile)); // Original rasmni saqlash
        }
    }
    console.log(file);

    return (
        <div className="flex flex-col items-start gap-4 my-2">
            {/* Fayl yuklash tugmasi */}
            <label className="relative">
                <p className="border p-1 rounded-md font-semibold mt-2 shadow-md cursor-pointer flex gap-3">
                    {t("upload_file")} <ImageDown />
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
            {originalImage && !croppedImage && (
                <ImageCropper src={originalImage} onCrop={setCroppedImage} />
            )}

            {/* Crop qilingan rasm */}
            {croppedImage && (
                <div className="text-center mt-2">
                    <p>✅ Cropped Image:</p>
                    <img
                        src={croppedImage}
                        alt="Cropped Preview"
                        className="mt-2 w-32 h-32 object-cover rounded-md"
                    />
                </div>
            )}
        </div>
    );
};

export default FileUploadCOver;