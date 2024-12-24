import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Check, Copy, Download } from "lucide-react";
import { useTranslation } from "react-i18next";
import { IoQrCodeOutline } from "react-icons/io5";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface QrCodeProps {
    data: string,
    id:string
}

const ViewQRCode = ({ data, id }: QrCodeProps) => {
    const {t} = useTranslation()
     const [copySuccess, setCopySuccess] = useState<string>('');
        const link:string = 'https://sharqmenu.uz/' + id
        const copyToClipboard = async (e: React.FormEvent) => {
            e.preventDefault()
            const form = e.target as HTMLFormElement;
            const targetLink = (form.elements.namedItem("link") as HTMLInputElement).value
            try {
                await navigator.clipboard.writeText(targetLink);
                setCopySuccess('Link copied! You can now share it.');
            } catch (err) {
                setCopySuccess('Failed to copy the link');
                console.error('Failed to copy: ', err);
            }
        };
    
    return (
        <Dialog>
            <DialogTrigger className="flex"><IoQrCodeOutline size={25} /></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{t("add_modal_view_qr")} </DialogTitle>
                    <DialogDescription>
                        <img className="w-[200px] h-[200px] mx-auto rounded-sm" src={data} alt="qr code" />
                    </DialogDescription>
                    <form onSubmit={copyToClipboard} className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        <Label htmlFor="link" className="sr-only">
                            Link
                        </Label>
                        <Input
                            id="link"
                            defaultValue={link}
                            readOnly
                            name='link'
                        />
                    </div>
                    <Button type="submit" size="sm" className="px-3">
                        <span className="sr-only">Copy</span>
                        {copySuccess ? <Check /> : <Copy className="h-4 w-4" />}
                    </Button>
                </form>
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