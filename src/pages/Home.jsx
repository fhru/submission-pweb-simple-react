import Navbar from "../components/Navbar";

export default function Home() {
    return (
        <div>
            <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#2563eb_100%)]"></div>
            <Navbar />
            <div className="container mx-auto h-[90vh] flex justify-center items-center">
                <div
                    className="text-[72px] font-bold tracking-tighter leading-[72px] text-center capitalize"
                >
                    {sessionStorage.getItem('username') ? `Halo, Selamat Datang ${sessionStorage.getItem('username')}.` : 'Halo, Selamat Datang.'}
                </div>
            </div>
        </div>
    )
}
