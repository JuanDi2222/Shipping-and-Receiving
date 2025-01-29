
"use server"
import {auth} from "~/auth"

export default async function HomePage() {
  const hola = await auth();
  return (
    <main className="flex min-h-screen flex-col p-6 ">
      <h1 className="text-2xl font-bold">Prueba</h1>
      <p>{JSON.stringify(hola)}</p>
    </main>
  )
}
