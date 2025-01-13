import axios from "axios";
import { IconBrandGithub, IconCircleHalf, IconEye, IconEyeOff } from "justd-icons";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isChecked, setIsChecked] = useState(true);
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isNotMatch, setIsNotMatch] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const [isPressed, setIsPressed] = useState(false)

    const handleRegister = async (e) => {
        e.preventDefault()
        setIsPressed(true)
        await new Promise(resolve => setTimeout(resolve, 1000))
        if (password !== confirmPassword) {
            setIsNotMatch(true)
        } else {
            try {
                const response = await axios.post('http://127.0.0.1:5000/register', {
                    name,
                    username,
                    password
                })
                if (response.status === 201) {
                    setMessage(response.data.message)
                    sessionStorage.setItem('isLoggedIn', true);
                    sessionStorage.setItem('username', username);
                    navigate('/');
                    // setName('')
                    // setUsername('')
                    // setPassword('')
                    // setConfirmPassword('')
                }
            } catch (error) {
                if (error.response) {
                    setMessage({ type: 'error', msg: error.response.data.error });
                } else {
                    setMessage({ type: 'error', msg: "Terjadi kesalahan saat menghubungi server." });
                }
            }
        }
        setIsPressed(false)
    }

    const handleGithub = () => {
        setIsLoading(!isLoading);
        setTimeout(() => {
            setIsLoading((prev) => !prev);
        }, 4500);
    };

    const handleCheckbox = () => {
        setIsChecked(!isChecked)
    }

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
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
            <div className="w-[23rem] lg:w-[32rem] border border-neutral-800 rounded-xl relative z-10">
                <div className="relative -top-px -mb-px h-px w-full bg-gradient-to-r from-transparent via-zinc-300 to-transparent dark:via-blue-600"></div>
                <div className="flex p-5 lg:p-10 flex-col">
                    {/* Login Text */}
                    <div className="title flex flex-col gap-2">
                        <div className="text-[18px] leading-[18px] tracking-tighter inter-bold">
                            Register
                        </div>
                        <div className="text-[14px] leading-[20px] tracking-tighter text-white/50">
                            Silakan masuk jika Anda sudah membuat akun.
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
                                    Register Dengan Github
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
                    <form action="#" className="mt-6" onSubmit={handleRegister}>
                        <div>
                            <label
                                htmlFor="nama"
                                className="text-[14px] leading-[20px] tracking-tighter inter-semibold"
                            >
                                Nama
                            </label>
                            <br />
                            <input
                                type="text"
                                id="nama"
                                placeholder="Example John"
                                className="placeholder-white/50 w-full text-[14px] leading-[20px] tracking-tighter p-[10px] bg-transparent border focus:border-blue-600 focus:ring-[3px] ring-transparent focus:ring-blue-950 border-neutral-800 outline-none ring-0 rounded-lg transition-all duration-200 mt-2"
                                onChange={(e) => { setName(e.target.value) }}
                                value={name}
                                required={true}
                            />
                        </div>

                        <div className="mt-5">
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
                                className={`placeholder-white/50 w-full text-[14px] leading-[20px] tracking-tighter p-[10px] bg-transparent border focus:border-blue-600 focus:ring-[3px] ring-transparent focus:ring-blue-950  outline-none ring-0 rounded-lg transition-all duration-200 mt-2 ${message.msg && message.msg.includes("Username") ? 'border-red-500' : 'border-neutral-800'}`}
                                onChange={(e) => { setUsername(e.target.value) }}
                                value={username}
                                required={true}
                            />
                            {message.msg && message.msg.includes("Username") && (
                                <p className="text-[12px] tracking-tighter leading-[24px] text-red-600">{message.msg}</p>
                            )}
                        </div>

                        <div className="mt-5 relative flex gap-6">
                            <div className="password relative">
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
                                        className={`w-full text-[14px] leading-[20px] tracking-tighter p-[10px] bg-transparent border focus:border-blue-600 focus:ring-[3px] ring-transparent focus:ring-blue-950 ${isNotMatch ? 'border-red-600' : 'border-neutral-800'} outline-none ring-0 rounded-lg transition-all duration-200`}
                                        onChange={(e) => { setPassword(e.target.value) }}
                                        value={password}
                                        required={true}
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
                            <div className="password relative">
                                <label
                                    htmlFor="confirm"
                                    className="text-[14px] leading-[20px] tracking-tighter inter-semibold"
                                >
                                    Konfirmasi Password
                                </label>
                                <br />
                                <div className="flex items-center mt-2">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="confirm"
                                        className={`w-full text-[14px] leading-[20px] tracking-tighter p-[10px] bg-transparent border focus:border-blue-600 focus:ring-[3px] ring-transparent focus:ring-blue-950 ${isNotMatch ? 'border-red-600' : 'border-neutral-800'} outline-none ring-0 rounded-lg transition-all duration-200`}
                                        onChange={(e) => { setConfirmPassword(e.target.value) }}
                                        value={confirmPassword}
                                        required={true}
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
                        </div>
                        {isNotMatch && <p className="text-[12px] tracking-tighter leading-[24px] text-red-600">Password Harus Sama!</p>}
                        {/* Remember me */}
                        <div className="flex justify-between mt-6">
                            <div className="flex gap-1.5 items-center">
                                <input
                                    id="remember"
                                    type="checkbox"
                                    value=""
                                    checked={isChecked}
                                    className={`text-blue-600 bg-red-950/50 border-red-800 focus:border-blue-600 rounded focus:ring-blue-950 focus:ring-offset-0 focus:ring-[3px]`}
                                    onChange={handleCheckbox}
                                />
                                <label htmlFor="remember" className="select-none text-[14px] tracking-tighter">
                                    Saya setuju dengan {" "}
                                    <a href="#" className="underline">Ketentuan Layanan{" "}</a>
                                    dan{" "}
                                    <a href="#" className="underline">Kebijakan Privasi</a>
                                </label>
                            </div>
                        </div>

                        {/* Login Button */}
                        <div className="flex justify-between mt-6">
                            <div className="flex items-center">
                                <Link to={"/login"} className="underline text-[14px] tracking-tighter inter-medium">
                                    Saya Memiliki Akun
                                </Link>
                            </div>
                            <div className="flex items-center">
                                <button
                                    type="submit"
                                    className="bg-blue-600 rounded-lg text-[14px] tracking-tighter inter-semibold py-[10px] px-[12px] flex justify-center items-center gap-1"
                                >
                                    {isPressed ? (
                                        <>
                                            <IconCircleHalf className="animate-spin" />
                                            Processing
                                        </>
                                    ) : 'Register'}
                                </button>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
}
