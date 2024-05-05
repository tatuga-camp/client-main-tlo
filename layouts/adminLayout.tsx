import { useState, type ReactNode } from "react";

import Footer from "../components/Footer";
import AdminNavbar from "../components/Navbars/AdminNavbar";
import Sidebar from "../components/Sidebar";

type LayoutProps = {
  children: ReactNode;
};

function AdminLayout({ children }: LayoutProps) {
  const [triggerSidebar, setTriggerSidebar] = useState(false);
  return (
    <>
      <AdminNavbar setTriggerSidebar={setTriggerSidebar} />
      {triggerSidebar && <Sidebar setTriggerSidebar={setTriggerSidebar} />}
      {children}
      <Footer />
    </>
  );
}

export default AdminLayout;
