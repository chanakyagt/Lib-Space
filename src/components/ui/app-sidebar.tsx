'use client'

import { Book, BookPlus, HomeIcon, IdCard, LogOut, User, UserPlus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { signOut } from "next-auth/react"; // Import signOut for logout
import { useState } from "react";

const items_admin = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: HomeIcon,
  },
  {
    title: "Books",
    url: "/books",
    icon: Book,
  },
  {
    title: "Add Books",
    url: "/add-book",
    icon: BookPlus,
  },
  {
    title: "Users",
    url: "/users",
    icon: User,
  },
  {
    title: "Add-Users",
    url: "/add-user",
    icon: UserPlus,
  },
];
const items_student = [
  {
    title: "Home",
    url: "/Home",
    icon: HomeIcon,
  },
  {
    title: "Books",
    url: "/books",
    icon: Book,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: IdCard,
  },
];

export function AppSidebar({user}) {
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

  const handleLogout = () => {
    signOut({ callbackUrl: "/" }); // Logs out the user and redirects to the homepage
  };
  const items= user==="Admin" ? items_admin : items_student;
  return (
    <Sidebar className='' variant="sidebar" collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xl text-black font-bold my-3">
            Lib<span className="text-blue-600 italic">Space</span>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="hover:bg-blue-600 hover:text-white">
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Sidebar Footer with Logout Button */}
      <SidebarFooter>
        <SidebarMenuItem key="logout">
          <SidebarMenuButton
            className="hover:bg-red-500 hover:text-white"
            onClick={() => setIsLogoutDialogOpen(true)} // Open logout confirmation dialog
          >
            <LogOut />
            <span>Logout</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarFooter>

      {/* Logout Confirmation Dialog */}
      <Dialog open={isLogoutDialogOpen} onOpenChange={setIsLogoutDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Logout</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to log out?</p>
          <DialogFooter>
            <button
              className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
              onClick={() => setIsLogoutDialogOpen(false)} // Cancel button to close the dialog
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              onClick={handleLogout} // Logout button to perform the logout
            >
              Logout
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Sidebar>
  );
}
