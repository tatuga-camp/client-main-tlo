import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import type { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

function HomeLayout({ children }: LayoutProps) {
  return <section>
    <Navbar/>
    {children}
    <Footer/>
    </section>;
}

export default HomeLayout;
