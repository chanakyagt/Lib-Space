
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session=await auth();
  const user_role=session?.user.role;
  console.log(user_role)
if(user_role==="Admin"){
    return (
        <>
    
        {children}
      
  

     
        </>
  
    );
}
else{
    redirect("/accessdenied")
}
}
