import Logo from "../Logo";
import LanguageSelect from "./language-select";

export default function Header() {
    return (
        <header className="fixed top-0 left-0 flex justify-between items-center px-10 py-[10px] w-full h-[70px] z-50 bg-white shadow-sm">
            {/* Logo */}
            <Logo />
            <LanguageSelect />
        </header>
    )
}