import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Check, Copy, Share2 } from 'lucide-react';
import { useState } from 'react';

interface linkProp{
    id: string
}

const ShareLink = ({id}:linkProp) => {
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
            <DialogTrigger asChild>
                <Button variant="ghost" className='flex items-center gap-2'>
                    <Share2 />
                    <p className='text-[17px] font-createRound'>Share</p>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Share link</DialogTitle>
                    <DialogDescription>
                        Anyone who has this link will be able to view this.
                    </DialogDescription>
                </DialogHeader>
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
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ShareLink;