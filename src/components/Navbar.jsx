import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Dropdown from "./Dropdown";
import { IconHamburger, IconX } from "justd-icons"; // Ikon burger dan close

export default function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();
    const [activePath, setActivePath] = useState(location.pathname);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(
        sessionStorage.getItem("isLoggedIn") === "true"
    );

    const handleSetActive = (path) => {
        setActivePath(path);
        setIsMobileMenuOpen(false);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleLogout = () => {
        sessionStorage.removeItem("isLoggedIn");
        sessionStorage.removeItem("username");
        setIsLoggedIn(false);
        navigate("/");
        window.location.reload();
    };

    useEffect(() => {
        setActivePath(location.pathname);
    }, [location]);

    return (
        <div className="border-b border-b-neutral-800">
            {/* Bagian Kiri: Brand atau Dropdown */}
            <div className="container mx-auto flex flex-col lg:flex-row lg:items-center lg:px-12 py-2">
                <div className="flex justify-between items-center lg:flex-1">
                    <Dropdown name="fahru_" />
                    {/* Tombol Mobile Menu */}
                    <button
                        onClick={toggleMobileMenu}
                        className="lg:hidden text-white text-2xl"
                    >
                        {isMobileMenuOpen ? <IconX /> : <IconHamburger />}
                    </button>
                </div>

                {/* Bagian Tengah dan Kanan: Menu Links */}
                <div
                    className={`flex-col lg:flex lg:flex-row lg:items-center lg:justify-end lg:flex-1 lg:gap-x-4 transition-all duration-300 ${isMobileMenuOpen ? "flex" : "hidden"
                        } lg:flex`}
                >
                    <div className="flex flex-col lg:flex-row lg:gap-x-1 gap-2 pb-2 lg:pb-0">
                        <Link
                            to="/"
                            className={`inter-medium tracking-tighter rounded-full text-[14px] leading-[21px] px-3 py-1 transition-all hover:text-white ${activePath === "/"
                                ? "text-white bg-neutral-800"
                                : "text-white/50"
                                }`}
                            onClick={() => handleSetActive("/")}
                        >
                            Home
                        </Link>
                        <Link
                            to="/about"
                            className={`inter-medium tracking-tighter rounded-full text-[14px] leading-[21px] px-3 py-1 transition-all hover:text-white ${activePath === "/about"
                                ? "text-white bg-neutral-800"
                                : "text-white/50"
                                }`}
                            onClick={() => handleSetActive("/about")}
                        >
                            About
                        </Link>
                        <Link
                            to="/contact"
                            className={`inter-medium tracking-tighter rounded-full text-[14px] leading-[21px] px-3 py-1 transition-all hover:text-white ${activePath === "/contact"
                                ? "text-white bg-neutral-800"
                                : "text-white/50"
                                }`}
                            onClick={() => handleSetActive("/contact")}
                        >
                            Contact
                        </Link>
                    </div>

                    {/* Divider */}
                    <div className="hidden lg:block mx-4 w-0 h-6 border border-neutral-800"></div>

                    {/* Login & Register Buttons */}
                    <div className="flex flex-col lg:flex-row gap-2 lg:gap-x-2">
                        {isLoggedIn ? (
                            <button
                                onClick={handleLogout}
                                className="rounded-[8px] inter-medium leading-[20px] text-white tracking-tighter text-[14px] px-3 py-2 bg-transparent border border-neutral-800 hover:bg-neutral-800 transition-all"
                            >
                                Logout
                            </button>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="rounded-[8px] inter-medium leading-[20px] text-white tracking-tighter text-[14px] px-3 py-2 bg-transparent border border-neutral-800 hover:bg-neutral-800 transition-all"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="rounded-[8px] inter-medium leading-[20px] tracking-tighter text-[14px] px-3 py-2 bg-white text-black border border-neutral-800 hover:bg-white/75 transition-all"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}
