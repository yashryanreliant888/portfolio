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
    <div className="min-h-screen bg-near-black">
      <div className="flex">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main Content */}
        <div className="flex-1 lg:pl-64">
          {/* Top Bar */}
          <AdminTopBar user={user} />

          {/* Page Content */}
          <main className="p-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
