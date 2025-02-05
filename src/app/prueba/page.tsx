import { getNames } from "~/server/db/actions"

export default async function HomePage() {

 const names = await getNames()


  return (
    <main className="flex min-h-screen flex-col p-6 bg-">
      <h1>{JSON.stringify(names)}</h1>
      
    </main>
  )
}
 