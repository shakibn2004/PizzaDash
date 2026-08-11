import { AdminLayout } from "@/components/AdminLayout";


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-screen bg-[#0E1117] text-gray-100 flex">
            <AdminLayout />

            {/* Main Admin Area */}
            <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
