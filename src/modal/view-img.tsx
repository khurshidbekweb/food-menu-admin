import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Download } from "lucide-react";
import { useTranslation } from "react-i18next";
import { IoQrCodeOutline } from "react-icons/io5";

interface QrCodeProps {
    data: string
}

const ViewQRCode = ({ data }: QrCodeProps) => {
    const {t} = useTranslation()
    return (
        <Dialog>
            <DialogTrigger className="flex"><IoQrCodeOutline size={25} /></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{t("add_modal_view_qr")} </DialogTitle>
                    <DialogDescription>
                        <img className="w-[200px] h-[200px] mx-auto rounded-sm" src={data} alt="qr code" />
                    </DialogDescription>
                </DialogHeader>
                <Button onClick={() => {
                    const link = document.createElement("a");
                    link.href = data;
                    link.download = 'Qrcode';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }} className="flex gap-2 p-2 px-5 border text-center">{t("qr_code_download")} <Download /></Button>
            </DialogContent>
        </Dialog>

    );
};

export default ViewQRCode;