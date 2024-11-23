interface FileUploadProps {
    file: File | null; // Fayl holati
    handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // Hodisa funksiyasi
}

const FileUpload = ({ file, handleFileChange }: FileUploadProps) => {
    return (
        <div className="flex items-start gap-4 gap-x-8">            
            <label className="relative">
                <p className="border p-1 rounded-md font-semibold mt-2 shadow-md cursor-pointer">Choose File</p>
                <input
                type="file"
                className="opacity-0 w-1 absolute"
                onChange={handleFileChange}
            />
            </label>
            {file && (
                <div className="text-center mt-2">
                    <p>File: {file.name}</p>
                    {file.type.startsWith("image/") && (
                        <img
                            src={URL.createObjectURL(file)}
                            alt="Preview"
                            className="mt-2 w-32 h-32 object-cover rounded-md"
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default FileUpload;