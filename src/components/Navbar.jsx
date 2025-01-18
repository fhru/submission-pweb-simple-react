import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Dropdown from "./Dropdown";
import { IconDashboard, IconGear, IconHamburger, IconLogout, IconX } from "justd-icons"; // Ikon burger dan close
import { motion } from "motion/react"

export default function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();
    const [activePath, setActivePath] = useState(location.pathname);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(
        sessionStorage.getItem("isLoggedIn") === "true"
    );
    const [ddDash, setDdDash] = useState(false)
    const dropdownRef = useRef(null);

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

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDdDash(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="border-b border-b-neutral-800 relative" ref={dropdownRef}>
            {/* Bagian Kiri: Brand atau Dropdown */}
            <div className="container mx-auto flex flex-col lg:flex-row lg:items-center px-4 lg:px-12 py-2 relative">
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
                            <div className="flex relative">
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/f/f3/%D0%92%D0%BB%D0%B0%D0%B4%D0%B8%D0%BC%D0%B8%D1%80_%D0%9F%D1%83%D1%82%D0%B8%D0%BD_%2808-03-2024%29_%28cropped%29.jpg"
                                    alt="Sultan"
                                    className="cursor-pointer inline-block size-8 rounded-full border-2 border-neutral-700 object-cover object-center"
                                    onClick={() => { setDdDash((prev) => !prev) }}
                                />
                                {/* Dd Dashboard */}
                                {ddDash && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className="absolute top-[55px] right-46 lg:right-0 min-w-48 rounded-lg h-fit bg-neutral-800 border border-neutral-700 flex flex-col"
                                    >
                                        <div className="text-[16px] tracking-tighter font-bold p-2 capitalize">
                                            <span className="font-normal">Halo,</span> {sessionStorage.getItem("username")}!
                                        </div>
                                        <div className="w-full h-[1px] bg-neutral-700"></div>
                                        <div className="p-1 flex flex-col gap-1">
                                            <a href="#" className="flex gap-1.5 items-center transition-all hover:bg-blue-600 p-2 rounded-md font-medium">
                                                <IconDashboard />
                                                <span className="text-[14px] tracking-tighter">Dashboard</span>
                                            </a>
                                            <a href="#" className="flex gap-1.5 items-center hover:bg-blue-600 p-2 rounded-md font-medium">
                                                <IconGear />
                                                <span className="text-[14px] tracking-tighter">Pengaturan</span>
                                            </a>
                                        </div>
                                        <div className="w-full h-[1px] bg-neutral-700"></div>
                                        <div className="p-1 flex flex-col gap-1">
                                            <button
                                                className="flex gap-1.5 items-center transition-all hover:bg-red-800 p-2 rounded-md font-medium"
                                                onClick={handleLogout}
                                            >
                                                <IconLogout />
                                                <span className="text-[14px] tracking-tighter">Logout</span>
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </div>
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
        </div >
    );
}
