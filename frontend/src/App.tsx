import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layouts/Layout";

import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Services from "./components/pages/Services";
import Contact from "./components/pages/contact";
import Blog from "./components/pages/blog";
import AdminPanel from "./components/admin/NewAdminPanel";
import AdminLogin from "./components/admin/AdminLogin";
import ForgotPassword from "./components/admin/ForgotPassword"; // ✅ Import karo
import ProtectedRoute from "./components/ProtectedRoute";

import "./App.css";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* WEBSITE ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />

          {/* ✅ ADMIN AUTH ROUTES - GROUPED TOGETHER */}
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/forgot" element={<ForgotPassword />} /> {/* ✅ YAHAN ADD KIYA */}

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