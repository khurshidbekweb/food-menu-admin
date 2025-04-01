import { Pen } from "lucide-react";
import { useState } from "react";
import ImageCropper from "./image-cropper";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { restaurantUtils } from "@/utils/restaurant";
import { QUERY_KEYS } from "@/querys/query-key";
import toast from "react-hot-toast";

const EditCoverImage = ({id}:{id:string}) => {
    const queryClient = useQueryClient()
    const [file, setFile] = useState<File | null>(null)
    const [originalImage, setOriginalImage] = useState<string | null>(null);    
    const editCoverImage = useMutation({
        mutationFn: restaurantUtils.editCoverImage,
        onSuccess: (data) => {
            console.log(data);
            queryClient.invalidateQueries({queryKey: [QUERY_KEYS.restuarant_one]})
            toast.success(data?.message)
        }
    })
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            setOriginalImage(URL.createObjectURL(selectedFile)); 
        }           
    }
    const handelCoverImage = () => {
        editCoverImage.mutate({
            id: id,
            coverImage: file
        })
    }

    return (
        <div className="relative border">
            {/* Fayl yuklash tugmasi */}
            <label className="absolute bottom-12 md:bottom-16 right-2 xl:bottom-20">
                <p className="p-1 rounded-md font-semibold mt-2 cursor-pointer shadow-md bg-white flex gap-3 z-40">
                    <Pen />
                </p>
                <input
                    required
                    type="file"
                    className="opacity-0 absolute"
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