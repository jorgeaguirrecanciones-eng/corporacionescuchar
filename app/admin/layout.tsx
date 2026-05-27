import AdminSidebar from "@/components/admin/AdminSidebar";

export const metadata = {
  title: "Admin — Corporación Escuchar",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#F7F6F3]">
      <AdminSidebar />
      <main className="flex-1 min-w-0 p-6 md:p-8">
        {children}
      </main>
    </div>
  );
}
