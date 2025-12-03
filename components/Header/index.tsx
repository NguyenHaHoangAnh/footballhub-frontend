import Image from "next/image";

export default function Header() {
    return (
        <header className="fixed top-0 left-0 px-10 py-[10px] w-full h-[70px] z-50 bg-white shadow-sm">
            {/* Logo */}
            <div className="flex justify-center items-center h-full text-[20px] font-bold">
                <span>Football</span>
                <span className="p-1 bg-[#FF8023] rounded-[6px]">Hub</span>
            </div>
        </header>
    )
}