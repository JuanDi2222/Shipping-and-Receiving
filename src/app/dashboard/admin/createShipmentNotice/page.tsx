// Import the NoticeForm component
import { NoticeForm } from "~/app/ui/admin/create/NoticeForm";

// Import the authentication function
import { auth } from "~/auth";

// Import the redirect function from Next.js navigation
import { redirect } from "next/navigation";

/**
 * CreateNotice component
 * This component handles the creation of a shipment notice.
 * It checks if the user is authenticated before rendering the NoticeForm.
 * If the user is not authenticated, it redirects to the home page.
 */
export default async function CreateNotice() {
  // Authenticate the user
  const session = await auth();

  // If the user is not authenticated, redirect to the home page
  if (!session) return redirect("/");

  // Render the NoticeForm component inside a div with specific styling
  return (
    <div className="grid lg:grid-cols-1 gap-8 mt-16 m-28">
      <NoticeForm />
    </div>
  );
}
