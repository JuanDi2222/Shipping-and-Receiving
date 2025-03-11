// Layout.tsx (Authenticated Layout)
import TopNav from '~/app/ui/dashboard/Topnav';
import { Toaster } from "~/components/ui/sonner";

interface LayoutProps {
    children: React.ReactNode;
    isProfileIncomplete: boolean;
}

export default function Layout({ children, isProfileIncomplete }: { children: React.ReactNode; isProfileIncomplete: boolean; }) {
    return (
        <div>
            <TopNav />
            <section>{children}</section>
            <Toaster />
        </div>
    );
}
