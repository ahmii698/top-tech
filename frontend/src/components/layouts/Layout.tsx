// components/layouts/Layout.tsx
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // ✅ Import this
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import ScrollToTop from "../common/ScrollToTop";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const location = useLocation(); // ✅ Get current path
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  // ✅ AGAR ADMIN PAGE HAI TO SIRF CHILDREN DIKHAO (LAYOUT MAT DIKHAO)
  if (location.pathname.startsWith('/admin')) {
    return <>{children}</>;
  }

  // ✅ AGAR NORMAL PAGE HAI TO PURA LAYOUT DIKHAO
  return (
    <div className={`app ${darkMode ? 'dark' : ''}`}>
      <Header 
        darkMode={darkMode} 
        setDarkMode={setDarkMode}
        setSidebarOpen={setSidebarOpen}
      />

      <Sidebar 
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        darkMode={darkMode}
      />

      <div className="mainLayout">
        <main className="content">
          {children}  {/* YAHI PE HOME, ABOUT, SERVICES RENDER HONGE */}
        </main>
      </div>

      <Footer darkMode={darkMode} />
      <ScrollToTop />
    </div>
  );
};

export default Layout;