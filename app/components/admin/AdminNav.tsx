"use client";

import Link from "next/link";
import AdminNavItem from "./AdminNavItem";
import { usePathname } from "next/navigation";
import Container from "../Container";
import { CopyPlus, LayoutDashboard, Menu, NotebookText } from "lucide-react";

const AdminNav = () => {
  const pathname = usePathname();

  return (
    <div className="w-full shadow-sm top-20 border-b-[1px] pt-4">
      <Container>
        <div
          className="flex flex-row items-center justify-between
        md:justify-center gap-8 md:gap-12 overflow-x-auto flex-nowrap"
        >
          <Link href="/admin">
            <AdminNavItem
              label="Summary"
               icon={<LayoutDashboard />}
              selected={pathname === "/admin"}
            />
          </Link>
          <Link href="/admin/add-products">
            <AdminNavItem
              label="AddProducts"
               icon={<CopyPlus />}
              selected={pathname === "/admin/add-products"}
            />
          </Link>
          <Link href="/admin/manage-products">
            <AdminNavItem
              label="ManageProducts"
               icon={<NotebookText />}
              selected={pathname === "/admin/manage-products"}
            />
          </Link>
          <Link href="/admin/manage-orders">
            <AdminNavItem
              label="ManageOrders"
               icon={<Menu />}
              selected={pathname === "/admin/manage-orders"}
            />
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default AdminNav;
