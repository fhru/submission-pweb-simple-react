import { useState, useRef, useEffect } from "react";
import PropTypes from 'prop-types'
import { IconBrandGithub, IconBrandInstagram, IconBrandLayers, IconHome2 } from "justd-icons";
import { Link } from "react-router-dom";

export default function Dropdown({ name }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [isCopied, setIsCopied] = useState(false);

    const toggleCopy = () => {
        navigator.clipboard.writeText(window.location.href)
        setIsCopied(true);
    }

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative inline-block" ref={dropdownRef}>
            <button
                onClick={toggleDropdown}
                className={`tracking-tighter inter-bold transition-all rounded-md text-[21px] leading-[24px] px-3 py-2 cursor-pointer ${isOpen ? 'bg-neutral-800' : 'bg-transparent hover:bg-neutral-800'}`}
            >
                {name}
            </button>

            <ul
                className={`cursor-default absolute bg-neutral-800 border border-neutral-700 rounded-[10px] shadow-md mt-2 transition-all duration-200 transform origin-top ${isOpen ? 'opacity-100 scale-y-100' : 'opacity-0 pointer-events-none scale-y-0'}`}
            >
                <li
                    className="text-[14px] inter-medium leading-[20px] tracking-tighter px-4 py-2 border-b border-b-neutral-700 text-white/50 cursor-default"
                >
                    Links
                </li>

                <Link
                    to={"/"}
                    className="flex items-center gap-2 m-1 text-[14px] tracking-tighter w-64 px-[10px] py-[8px] hover:bg-blue-600 rounded-[8px]"
                >
                    <IconHome2 />
                    Home Page
                </Link>
                <li
                    className="flex items-center gap-2 m-1 text-[14px] tracking-tighter w-64 px-[10px] py-[8px] hover:bg-blue-600 rounded-[8px]"
                    onClick={toggleCopy}
                >
                    <IconBrandLayers />
                    {isCopied ? "Copied" : "Copy URL"}
                </li>

                <li
                    className="text-[14px] inter-medium leading-[20px] tracking-tighter px-4 py-2 border-y border-y-neutral-700 text-white/50 cursor-default"
                >
                    Say Hi
                </li>

                <a
                    className="flex items-center gap-2 m-1 text-[14px] tracking-tighter w-64 px-[10px] py-[8px] hover:bg-blue-600 rounded-[8px]"
                    href="https://instagram.com/fa.hru"
                    target="_blank"
                >
                    <IconBrandInstagram />
                    Instagram
                </a>
                <a
                    className="flex items-center gap-2 m-1 text-[14px] tracking-tighter w-64 px-[10px] py-[8px] hover:bg-blue-600 rounded-[8px]"
                    href="https://github.com/fhru"
                    target="_blank"
                >
                    <IconBrandGithub />
                    Github
                </a>
            </ul>
        </div>
    )
}

Dropdown.propTypes = {
    name: PropTypes.string.isRequired,
}
