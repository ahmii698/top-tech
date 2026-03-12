import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layouts/Layout";

import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Services from "./components/pages/Services";
import Contact from "./components/pages/contact";
import Blog from "./components/pages/blog";
import AdminPanel from "./components/admin/AdminPanel";
import AdminLogin from "./components/admin/AdminLogin"; // ✅ Import karo
import ProtectedRoute from "./components/ProtectedRoute"; // ✅ Import karo

import "./App.css";

function App() {
  return (
    <Router>
      <Layout> {/* ✅ Layout yahan hi rahay ga, home chalta rahay ga */}
        <Routes>
          {/* WEBSITE ROUTES - YEH CHALTA RAHAY GA */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />

          {/* ADMIN LOGIN ROUTE - YEH LAYOUT K ANDAR HI CHALAY GA */}
          <Route path="/admin-login" element={<AdminLogin />} />

          {/* ADMIN PANEL - PROTECTED ROUTE */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminPanel />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;