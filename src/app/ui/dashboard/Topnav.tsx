"use client";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { SignOut} from "~/app/ui/login/signout-button"

export default function TopNav(){
    const pathname = usePathname();
    return (
    <nav className="bg-white border-b-2">
        <div className="container flex items-center justify-start p-6 mx-auto text-black ">
            <img alt="logo" className="w-15 h-10 mx-1.5 sm:mx-6" src="/PHIN_BIG.png"/>
            <Link href="/dashboard" className={clsx("text-black dark:text-black border-b-2  mx-1.5 sm:mx-6",{"border-red-500":pathname==="/dashboard"})}><span>Home</span></Link>
            <Link href="/dashboard/export" className={clsx("text-black dark:text-black border-b-2  mx-1.5 sm:mx-6",{"border-red-500":pathname==="/dashboard/export"})}><span>Export</span></Link>
            <Link href="/dashboard/import" className={clsx("text-black dark:text-black border-b-2  mx-1.5 sm:mx-6",{"border-red-500":pathname==="/dashboard/import"})}><span>Import</span></Link>
            <Link href="/dashboard/admin" className={clsx("text-black dark:text-black border-b-2  mx-1.5 sm:mx-6",{"border-red-500":pathname==="/dashboard/admin"})}><span>Admin</span></Link>
            <Link href="/dashboard/profile" className={clsx("text-black dark:text-black border-b-2  mx-1.5 sm:mx-6",{"border-red-500":pathname==="/dashboard/profile"})}><span>Profile</span></Link>
            <SignOut/>
        </div>
    </nav>
    );
    }