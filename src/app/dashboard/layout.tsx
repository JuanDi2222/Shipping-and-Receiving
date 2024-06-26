import TopNav from '~/app/ui/dashboard/Topnav';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div >
      <div>
        <TopNav />
      </div>
      <div>{children}</div>
    </div>
  );
}