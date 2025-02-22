import { useRef, useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "./ui/dialog";

interface ImageCropperProps {
    src: string;
    onCrop: (croppedImage: string) => void;
}

const ImageCropper = ({ src, onCrop }: ImageCropperProps) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cropperRef = useRef<any>(null);
    const [open, setOpen] = useState(true)
    const getCroppedImage = () => {
        if (cropperRef.current) {
            const croppedDataUrl = cropperRef.current.cropper
                .getCroppedCanvas()
                .toDataURL(); // Rasmni base64 formatida olish
            onCrop(croppedDataUrl);
            setOpen(false)
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger></DialogTrigger>
            <DialogContent className="flex flex-col items-center overflow-hidden">
                <Cropper
                    src={src}
                    style={{ height: 200, width: "100%" }} // Ko'rinadigan joy
                    aspectRatio={16 / 6} // O‘lchamni majburlash
                    viewMode={1} // Crop qilinadigan joyni cheklash
                    guides={false}
                    dragMode="none" // Faqat crop qilish, harakatlantirish yo‘q
                    ref={cropperRef}
                />
                <button
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={getCroppedImage}
                >
                    Crop Image
                </button>
            </DialogContent>
        </Dialog>
    );
};

export default ImageCropper;
