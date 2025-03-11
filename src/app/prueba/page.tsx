import { getNames } from "~/server/db/actions"
import { ShipmentForm } from "../ui/prueba/PruebaForm"

export default async function HomePage() {

 const names = await getNames()
 

  return (
    <main className="flex min-h-screen flex-col p-6 bg-">

      <ShipmentForm />
    </main>
  )
}
 