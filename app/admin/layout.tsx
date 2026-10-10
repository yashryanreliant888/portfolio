import { getAdminUser } from '@/lib/auth';
import { AdminSidebar } from './AdminSidebar';
import { AdminTopBar } from './AdminTopBar';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getAdminUser();
  if (!user) return children;

  return (
    <div className="admin-shell min-h-screen bg-near-black">
      <div className="flex">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main Content */}
        <div className="admin-main flex-1 lg:pl-72">
          {/* Top Bar */}
          <AdminTopBar user={user} />

          {/* Page Content */}
          <main className="admin-main__content px-5 py-6 sm:px-8 lg:px-10">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
