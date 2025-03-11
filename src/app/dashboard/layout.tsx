import TopNav from '~/app/ui/dashboard/Topnav';
import { Toaster } from "~/components/ui/sonner";

export default function Layout({ children, isProfileIncomplete }: { children: React.ReactNode; isProfileIncomplete: boolean }) {
  return (
    <div>
      <div>
        <TopNav isProfileIncomplete={isProfileIncomplete} />
      </div>
      <div>{children}</div>
      <Toaster />
    </div>
  );
}
