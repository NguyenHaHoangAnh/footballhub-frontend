"use client";

import { useRouter } from "next/navigation";

export default function Logo() {
    const router = useRouter();
    return (
        <div 
            className="flex justify-center items-center h-full text-[20px] font-bold cursor-pointer"
            onClick={() => {
                router.push(`/`);
            }}
        >
            <span>Football</span>
            <span className="p-1 bg-primary text-white rounded-md">Hub</span>
        </div>
    );
}