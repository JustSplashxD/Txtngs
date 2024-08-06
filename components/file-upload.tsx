"use client";

import { X } from "lucide-react";
import Image from "next/image";

import { UploadDropzone } from "@/lib/uploadthing";
import '@uploadthing/react/styles.css';
import { Button } from "./ui/button";

interface FileUploadProps {
    onChange: (url?: string) => void;
    value: string;
    endpoint: "messageFile" | "serverImage";
}

export const FileUpload = ({
    onChange,
    value,
    endpoint
}: FileUploadProps ) => {
    const fileType = value?.split(".").pop();

    return (
        <div>
            {value && fileType !== "pdf" ? (
                <div className="relative h-20 w-20">
                    <Image
                        fill
                        src={value}
                        alt="Uploaded"
                        className="rounded-full"
                    />
                    <Button
                    onClick={() => onChange("")}
                    className="absolute top-0 right-0 p-0.5 rounded-full bg-rose-500 text-white shadow-sm flex items-center justify-center"
                        style={{ width: '24px', height: '24px' }} // Adjust the button size
                    >
                        <X className="h-4 w-4"></X>
                    </Button>
                </div>
            ) : (
                <UploadDropzone
                    endpoint={endpoint}
                    onClientUploadComplete={(res) => {
                        if (res?.[0]?.url) {
                            onChange(res[0].url);
                        }
                    }}
                    onUploadError={(error: Error) => {
                        console.log(error);
                    }}
                />
            )}
        </div>
    );
};
