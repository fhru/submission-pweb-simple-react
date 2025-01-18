import axios from "axios";
import { IconBrandGithub, IconCircleHalf, IconCirclePlaceholderDashed, IconEye, IconEyeOff } from "justd-icons";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


export default function LoginForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState({ type: '', msg: '' });
    const [isPressed, setIsPressed] = useState(false)
    const navigate = useNavigate();

    const handleGithub = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 4500);
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const handleLogin = async (e) => {
        e.preventDefault()
        setIsPressed(true)
        await new Promise(resolve => setTimeout(resolve, 1000));
        try {
            const response = await axios.post("http://127.0.0.1:5000/login", {
                username,
                password,
            });

            if (response.status === 200) {
                setMessage({ type: 'success', msg: '`Login berhasil! Selamat datang, ${response.data.user.username}`' });
                sessionStorage.setItem('isLoggedIn', true);
                sessionStorage.setItem('username', username);
                navigate('/')
            }
        } catch (error) {
            if (error.response) {
                setMessage({ type: 'error', msg: error.response.data.error });
            } else {
                setMessage({ type: 'error', msg: "Terjadi kesalahan saat menghubungi server." });
            }
        }
        setIsPressed(false)
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="flex items-end absolute">
                <div className="relative bg-blue-600 h-[80px] w-[300px] -z-10 rounded-[100%] -top-36 opacity-75 blur-[90px]"></div>
                <div className="relative bg-blue-600 h-[150px] w-[300px] -z-10 rounded-[100%] -top-56 opacity-75 blur-[90px] right-12"></div>
            </div>
            <Link
                to={"/"}
                className="font-bold tracking-tighter leading-none text-[24px] mb-8">
                fahru_
            </Link>
            <div className="w-[20rem] lg:w-[32rem] border border-neutral-800 rounded-xl relative z-10">
                <div className="relative -top-px -mb-px h-px w-full bg-gradient-to-r from-transparent via-zinc-300 to-transparent dark:via-blue-600"></div>
                <div className="flex p-6 lg:p-10 flex-col">
                    {/* Login Text */}
                    <div className="title flex flex-col gap-2">
                        <div className="text-[18px] leading-[18px] tracking-tighter inter-bold">
                            Login
                        </div>
                        <div className="text-[14px] leading-[20px] tracking-tighter text-white/50">
                            Selamat datang kembali, masukkan kredensial Anda untuk melanjutkan.
                        </div>
                    </div>

                    {/* Github Login Button */}
                    <div className="my-6">
                        <a
                            href="#"
                            className="bg-white flex text-black/75 hover:text-black transition-all duration-200 text-[14px] leading-[24px] tracking-tighter inter-semibold justify-center items-center gap-1 py-[8px] rounded-lg"
                            onClick={handleGithub}
                        >
                            {isLoading ? (
                                <>
                                    <IconCircleHalf className="animate-spin" />
                                    Processing
                                </>
                            ) : (
                                <>
                                    <IconBrandGithub />
                                    Login Dengan Github
                                </>
                            )}
                        </a>
                    </div>

                    {/* Atau */}
                    <div className="flex justify-center items-center text-[14px] leading-[20px] tracking-tighter text-white/50">
                        <div className="w-full h-[1px] bg-neutral-800"></div>
                        <div className="mx-4 inter-medium">Atau</div>
                        <div className="w-full h-[1px] bg-neutral-800"></div>
                    </div>

                    {/* Form Input */}
                    <form action="#" className="mt-6" onSubmit={handleLogin}>
                        <div className="input1">
                            <label
                                htmlFor="username"
                                className="text-[14px] leading-[20px] tracking-tighter inter-semibold"
                            >
                                Username
                            </label>
                            <br />
                            <input
                                type="text"
                                id="username"
                                placeholder="Example John"
                                className={`placeholder-white/50 w-full text-[14px] leading-[20px] tracking-tighter p-[10px] bg-transparent border ${message.msg ? 'border-red-500' : 'border-neutral-800'} focus:border-blue-600 focus:ring-[3px] ring-transparent focus:ring-blue-950 outline-none ring-0 rounded-lg transition-all duration-200 mt-2`}
                                onChange={(e) => { setUsername(e.target.value) }}
                                value={username}
                            />
                            {message.msg && <p className="text-[14px] tracking-tighter text-red-500 mt-1">{message.msg}</p>}
                        </div>

                        <div className="mt-6 relative">
                            <label
                                htmlFor="password"
                                className="text-[14px] leading-[20px] tracking-tighter inter-semibold"
                            >
                                Password
                            </label>
                            <br />
                            <div className="flex items-center mt-2">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    className="w-full text-[14px] leading-[20px] tracking-tighter p-[10px] bg-transparent border focus:border-blue-600 focus:ring-[3px] ring-transparent focus:ring-blue-950 border-neutral-800 outline-none ring-0 rounded-lg transition-all duration-200"
                                    onChange={(e) => { setPassword(e.target.value) }}
                                    value={password}
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute text-white/50 hover:text-white transition duration-200 right-3"
                                >
                                    {showPassword ? <IconEyeOff /> : <IconEye />}
                                </button>
                            </div>
                        </div>

                        {/* Remember me */}
                        <div className="flex justify-between mt-6">
                            <div className="flex gap-1.5 items-center">
                                <input
                                    id="remember"
                                    type="checkbox"
                                    value=""
                                    className="text-blue-600 bg-neutral-800 border-neutral-700 focus:border-blue-600 rounded focus:ring-blue-950 focus:ring-offset-0 focus:ring-[3px] "
                                />
                                <label htmlFor="remember" className="select-none text-[14px] tracking-tighter">
                                    Ingat Saya
                                </label>
                            </div>
                            <div className="flex gap-1.5 items-center">
                                <a href="#" className="text-[14px] tracking-tighter underline leading-[20px]">
                                    Lupa Password?
                                </a>
                            </div>
                        </div>

                        {/* Login Button */}
                        <div className="flex justify-between mt-6">
                            <div className="flex items-center">
                                <Link to={"/register"} className="underline text-[14px] tracking-tighter inter-medium">
                                    Register
                                </Link>
                            </div>
                            <div className="flex items-center">
                                <button
                                    type="submit"
                                    className="flex gap-1.5 items-center justify-center bg-blue-600 rounded-lg text-[14px] tracking-tighter inter-semibold py-[10px] px-[12px]"
                                >
                                    {isPressed ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Logging in
                                        </>
                                    ) : 'Log in'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
