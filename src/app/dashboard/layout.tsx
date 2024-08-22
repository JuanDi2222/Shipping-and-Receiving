import TopNav from '~/app/ui/dashboard/Topnav';
import { Toaster } from "~/components/ui/sonner"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div >
      <div>
        <TopNav />
      </div>
      <div>{children}</div>
      <Toaster />
    </div>
  );
}