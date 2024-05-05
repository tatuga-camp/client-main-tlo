import Footer from "@/components/Footer";
import type { ReactNode } from "react";
import Navbar from "../components/Navbars/MainNavbar";

type LayoutProps = {
  children: ReactNode;
};

function HomeLayout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

export default HomeLayout;
