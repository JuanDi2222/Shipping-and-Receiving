import Link from "next/link";

export default function TopNav(){
    return (
    <nav className="bg-white border-b-2">
        <div className="container flex items-center justify-start p-6 mx-auto text-black ">
            <img className="w-15 h-10 mx-1.5 sm:mx-6" src="/PHIN_BIG.png"/>
            <Link href="/dashboard" className="text-black dark:text-black border-b-2 border-red-500 mx-1.5 sm:mx-6" ><span>Home</span></Link>
            <Link href="/dashboard/export" className="text-black dark:text-black border-b-2 border-red-500 mx-1.5 sm:mx-6" ><span>Export</span></Link>
            <Link href="/dashboard/import" className="text-black dark:text-black border-b-2 border-red-500 mx-1.5 sm:mx-6" ><span>Import</span></Link>
            <Link href="/dashboard/admin" className="text-black dark:text-black border-b-2 border-red-500 mx-1.5 sm:mx-6" ><span>Admin</span></Link>
        </div>
    </nav>
    );
    }