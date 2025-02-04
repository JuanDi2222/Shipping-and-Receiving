"use server"

import { lusitana } from '~/app/ui/fonts';
import Image from 'next/image';
import {SignIn} from "~/app/ui/login/signin-button";
import {auth} from "~/auth"
import {redirect} from "next/navigation";

export default async function HomePage() {

    const session = await auth();
    if (session) return redirect("/dashboard");
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-White-500 p-4 md:h-52">
        <Image
          src="/PHIN_BIG.png"
          alt="Logo"
          width={500}
          height={100}
        />
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          
          <p
            className={`${lusitana.className} text-xl text-gray-800 antialiased md:text-3xl md:leading-normal`}
          >
            <strong>Proyecto en desarrollo</strong> para el MTC{' '}
            <a href="https://phinia.com" className="text-red-500">
              Phinia
            </a>
              , desarrollado por Juan c:
          </p>
          <SignIn />
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          <Image
            src="/BG_MAIN.jpg"
            alt="Logo"
            width={1000}
            height={100}
          />
        </div>
      </div>
    </main>
  );
}
