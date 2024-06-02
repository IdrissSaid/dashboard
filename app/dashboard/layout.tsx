"use client"
import HeaderNavigation, { ListItem } from "@/components/HeaderNavigation";
import { Loader } from "lucide-react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

const DashboardLayout = ({
  children,
  savedServices
}: Readonly<{
  children: React.ReactNode;
  savedServices: React.ReactNode;
}>) => {
  const session = useSession()
  const path = usePathname()
  if (session.status === "loading") return <Loader />

  return (
    <div className="w-full h-screen flex-col">
      <div className="w-full h-16 flex justify-center items-center p-8">
        <HeaderNavigation triger={session.data?.user?.name || "Chargement..."}>
          <ul className="grid gap-3 p-4 w-48">
            <ListItem
              key={"Se déconnecter"}
              title={"Se déconnecter"}
              href={"/logout"}
            >
            </ListItem>
          </ul>
        </HeaderNavigation>
      </div>
      <div className="w-full h-[92%] gap-4 flex items-center justify-center">
        {children}
        { path === "/dashboard" && savedServices }
      </div>
    </div>
  )
}

export default DashboardLayout