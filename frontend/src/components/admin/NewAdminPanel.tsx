 // src/components/admin/NewAdminPanel.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FiImage, FiBookOpen, FiHome, FiMail, FiMessageSquare, FiHelpCircle, 
  FiStar, FiImage as FiHeroImage, FiMail as FiNewsletter, FiFileText, 
  FiBriefcase, FiTool, FiDollarSign, FiPieChart, FiSettings, 
  FiCreditCard, FiCalendar, FiTool as FiServices, FiZap,
  FiBarChart2, FiUsers, FiCpu, FiMessageCircle, FiUser,
  FiRefreshCw, FiTrash2, FiEdit2, FiPlus, FiSearch, FiLogOut,
  FiSend, FiX, FiChevronLeft, FiChevronRight
} from 'react-icons/fi';

// ==================== ALL DATABASE TABLES ====================
const TABLES = [
    { name: "banners", icon: <FiImage size={18} />, label: "Banners" },
  { name: "blog_posts", icon: <FiBookOpen size={18} />, label: "Blog Posts" },
  { name: "company_info", icon: <FiHome size={18} />, label: "Company Info" },
  { name: "contact_messages", icon: <FiMail size={18} />, label: "Contact Messages" },
  { name: "cta_section", icon: <FiMessageSquare size={18} />, label: "CTA Section" },
  { name: "faqs", icon: <FiHelpCircle size={18} />, label: "FAQs" },
  { name: "features", icon: <FiStar size={18} />, label: "Features" },
   { name: "hero_section", icon: <FiHeroImage size={18} />, label: "Hero Section" },
  { name: "newsletter_subscribers", icon: <FiNewsletter size={18} />, label: "Newsletter" },
  { name: "pages", icon: <FiFileText size={18} />, label: "Pages" },
  { name: "portfolio", icon: <FiBriefcase size={18} />, label: "Portfolio" },
  { name: "portfolio_technologies", icon: <FiTool size={18} />, label: "Portfolio Tech" },
  { name: "pricing_features", icon: <FiDollarSign size={18} />, label: "Pricing Features" },
  { name: "pricing_plans", icon: <FiPieChart size={18} />, label: "Pricing Plans" },
  { name: "process_steps", icon: <FiSettings size={18} />, label: "Process Steps" },
  { name: "plan_purchases", icon: <FiCreditCard size={18} />, label: "Plan Purchases" },
  { name: "appointments", icon: <FiCalendar size={18} />, label: "Appointments" },
  { name: "services", icon: <FiServices size={18} />, label: "Services" },
  { name: "service_features", icon: <FiZap size={18} />, label: "Service Features" },
  { name: "statistics", icon: <FiBarChart2 size={18} />, label: "Statistics" },
  { name: "team_members", icon: <FiUsers size={18} />, label: "Team Members" },
  { name: "technologies", icon: <FiCpu size={18} />, label: "Technologies" },
  { name: "testimonials", icon: <FiMessageCircle size={18} />, label: "Testimonials" },
  { name: "users", icon: <FiUser size={18} />, label: "Users" }
];

// ==================== MAIN ADMIN PANEL ====================
export default function NewAdminPanel() {
  const [activeTable, setActiveTable] = useState(TABLES[0].name);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    const token = localStorage.getItem("adminToken");
    const userStr = localStorage.getItem("adminUser");

    if (!token || !userStr) {
      navigate("/admin-login");
      return;
    }

    try {
      setUser(JSON.parse(userStr));
    } catch {
      navigate("/admin-login");
    }
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const logout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    navigate("/");
  };

  const activeTableData = TABLES.find(t => t.name === activeTable);

  const filteredTables = TABLES.filter(t => 
    t.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ 
      display: "flex", 
      height: "100vh", 
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      background: "#0a0a0a",
      overflow: "hidden"
    }}>
      {/* Sidebar */}
      <div style={{
        width: sidebarOpen ? "280px" : "80px",
        background: "#111111",
        color: "#ffffff",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        display: "flex",
        flexDirection: "column",
        borderRight: "1px solid #222222",
        position: "relative",
        zIndex: 50,
        flexShrink: 0
      }}>
        {/* Sidebar Header */}
        <div style={{
          padding: sidebarOpen ? "28px 24px" : "20px 0",
          borderBottom: "1px solid #222222",
          display: "flex",
          alignItems: "center",
          justifyContent: sidebarOpen ? "space-between" : "center",
          height: "80px"
        }}>
          {sidebarOpen ? (
            <>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{
                  width: "40px",
                  height: "40px",
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "18px",
                  fontWeight: "700",
                  color: "#ffffff",
                  boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)"
                }}>A</div>
                <div>
                  <span style={{ 
                    fontSize: "17px", 
                    fontWeight: "700", 
                    color: "#ffffff",
                    letterSpacing: "-0.5px"
                  }}>Admin</span>
                  <p style={{ 
                    margin: "2px 0 0", 
                    fontSize: "10px", 
                    color: "#888888", 
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    fontWeight: "600"
                  }}>Dashboard</p>
                </div>
              </div>
              <button 
                onClick={() => setSidebarOpen(false)} 
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#666666",
                  cursor: "pointer",
                  fontSize: "14px",
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#222222";
                  e.currentTarget.style.color = "#ffffff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#666666";
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11 17l-5-5 5-5M18 17l-5-5 5-5"/>
                </svg>
              </button>
            </>
          ) : (
            <button 
              onClick={() => setSidebarOpen(true)} 
              style={{
                background: "transparent",
                border: "none",
                color: "#666666",
                cursor: "pointer",
                fontSize: "16px",
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#222222";
                e.currentTarget.style.color = "#ffffff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#666666";
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M13 5l7 7-7 7M5 5l7 7-7 7"/>
              </svg>
            </button>
          )}
        </div>

        {/* Search Bar */}
        {sidebarOpen && (
          <div style={{ padding: "20px 20px 12px" }}>
            <div style={{ position: "relative" }}>
              <input
                type="text"
                placeholder="Search modules..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 12px 10px 36px",
                  background: "#1a1a1a",
                  border: "1px solid #222222",
                  borderRadius: "10px",
                  color: "#ffffff",
                  fontSize: "13px",
                  outline: "none",
                  transition: "all 0.2s",
                  fontWeight: "400"
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#667eea";
                  e.target.style.background = "#222222";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#222222";
                  e.target.style.background = "#1a1a1a";
                }}
              />
              <span style={{ 
                position: "absolute", 
                left: "12px", 
                top: "50%", 
                transform: "translateY(-50%)",
                color: "#555555", 
                fontSize: "14px" 
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="M21 21l-4.35-4.35"/>
                </svg>
              </span>
            </div>
          </div>
        )}

        {/* Menu Items */}
        <div style={{
          flex: 1,
          overflowY: "auto",
          padding: sidebarOpen ? "8px 12px" : "8px 8px",
          scrollbarWidth: "thin",
          scrollbarColor: "#333333 transparent"
        }}>
          {sidebarOpen && (
            <div style={{
              fontSize: "10px",
              fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: "1.5px",
              color: "#555555",
              margin: "16px 8px 12px",
              paddingLeft: "4px"
            }}>
              Modules
            </div>
          )}

          {filteredTables.map((table) => {
            const isActive = activeTable === table.name;
            return (
              <div
                key={table.name}
                onClick={() => setActiveTable(table.name)}
                style={{
                  padding: sidebarOpen ? "10px 14px" : "12px 0",
                  marginBottom: "4px",
                  background: isActive ? "linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%)" : "transparent",
                  borderRadius: "10px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: sidebarOpen ? "flex-start" : "center",
                  color: isActive ? "#667eea" : "#888888",
                  border: isActive ? "1px solid rgba(102, 126, 234, 0.3)" : "1px solid transparent",
                  transition: "all 0.2s ease",
                  position: "relative",
                  overflow: "hidden"
                }}
                title={!sidebarOpen ? table.label : ""}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = "#1a1a1a";
                    e.currentTarget.style.color = "#ffffff";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "#888888";
                  }
                }}
              >
                {isActive && (
                  <div style={{
                    position: "absolute",
                    left: 0,
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "3px",
                    height: "20px",
                    background: "linear-gradient(180deg, #667eea 0%, #764ba2 100%)",
                    borderRadius: "0 3px 3px 0"
                  }}/>
                )}
                
                <span style={{ 
                  fontSize: "18px", 
                  marginRight: sidebarOpen ? "12px" : 0,
                  filter: isActive ? "drop-shadow(0 0 8px rgba(102, 126, 234, 0.5))" : "none",
                  transition: "all 0.2s"
                }}>
                  {table.icon}
                </span>
                
                {sidebarOpen && (
                  <span style={{ 
                    flex: 1, 
                    fontSize: "13px", 
                    fontWeight: isActive ? "600" : "500",
                    letterSpacing: "-0.2px"
                  }}>
                    {table.label}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Logout Button */}
        <div style={{ 
          padding: sidebarOpen ? "20px" : "16px 12px", 
          borderTop: "1px solid #222222",
          background: "#0f0f0f"
        }}>
          <button
            onClick={logout}
            style={{
              width: "100%",
              padding: "12px",
              background: "transparent",
              color: "#ff6b6b",
              border: "1px solid #333333",
              borderRadius: "10px",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              transition: "all 0.2s",
              letterSpacing: "-0.2px"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255, 107, 107, 0.1)";
              e.currentTarget.style.borderColor = "rgba(255, 107, 107, 0.3)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.borderColor = "#333333";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>
            </svg>
            {sidebarOpen && "Logout"}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ 
        flex: 1, 
        display: "flex", 
        flexDirection: "column", 
        background: "#0a0a0a",
        overflow: "hidden",
        position: "relative"
      }}>
        {/* Background Gradient Effect */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "400px",
          background: "radial-gradient(ellipse at top, rgba(102, 126, 234, 0.08) 0%, transparent 70%)",
          pointerEvents: "none"
        }}/>

        {/* Top Bar */}
        <div style={{
          background: "rgba(17, 17, 17, 0.8)",
          backdropFilter: "blur(20px)",
          padding: "20px 32px",
          borderBottom: "1px solid #222222",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
          zIndex: 10
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{
              width: "48px",
              height: "48px",
              background: "linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%)",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid rgba(102, 126, 234, 0.3)",
              fontSize: "24px"
            }}>
              {activeTableData?.icon}
            </div>
            <div>
              <h1 style={{ 
                margin: 0,
                fontSize: "24px",
                fontWeight: "700",
                color: "#ffffff",
                letterSpacing: "-0.5px"
              }}>
                {activeTableData?.label}
              </h1>
              <p style={{
                margin: "4px 0 0",
                color: "#666666",
                fontSize: "13px",
                fontWeight: "500"
              }}>
                Manage {activeTableData?.label.toLowerCase()} records
              </p>
            </div>
          </div>

          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            padding: "8px 16px",
            background: "#1a1a1a",
            borderRadius: "12px",
            border: "1px solid #222222"
          }}>
            <div style={{
              width: "36px",
              height: "36px",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "14px",
              fontWeight: "600",
              color: "#ffffff"
            }}>
              {user?.name?.charAt(0) || 'A'}
            </div>
            {sidebarOpen && (
              <div>
                <div style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#ffffff"
                }}>{user?.name || 'Admin User'}</div>
                <div style={{
                  fontSize: "11px",
                  color: "#667eea",
                  fontWeight: "500"
                }}>Super Admin</div>
              </div>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div style={{ 
          flex: 1, 
          padding: "24px 32px", 
          overflowY: "auto",
          position: "relative",
          zIndex: 5
        }}>
          <DataTable table={activeTable} />
        </div>
      </div>
    </div>
  );
}

// ==================== DATA TABLE COMPONENT WITH IMAGE UPLOAD & EMAIL REPLY ====================
const DataTable = ({ table }: { table: string }) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editingRow, setEditingRow] = useState<any>(null);
  const [addingNew, setAddingNew] = useState(false);
  const [newRecord, setNewRecord] = useState<any>({});
  const [message, setMessage] = useState<{text: string, type: 'success' | 'error'} | null>(null);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState({ to: '', name: '', subject: '', message: '', type: '' });
  const [uploadingImage, setUploadingImage] = useState(false);
  const rowsPerPage = 10;

  const API_URL = 'http://localhost:8000/api';

  // Image Upload Function
  const uploadImage = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append('image', file);
    
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_URL}/upload.php`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      
      const result = await response.json();
      if (result.success) {
        return result.url;
      }
      return null;
    } catch (error) {
      console.error('Upload error:', error);
      return null;
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, isNew: boolean = false, field: string) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setUploadingImage(true);
    const imageUrl = await uploadImage(file);
    
    if (imageUrl) {
      if (isNew) {
        setNewRecord({ ...newRecord, [field]: imageUrl });
      } else if (editingRow) {
        setEditingRow({ ...editingRow, [field]: imageUrl });
      }
      showMessage("Image uploaded successfully!", "success");
    } else {
      showMessage("Image upload failed!", "error");
    }
    setUploadingImage(false);
  };

  useEffect(() => {
    fetchData();
  }, [table]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_URL}/admin/${table}`, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
      
      const result = await response.json();
      
      if (result.data) {
        setData(result.data);
      } else if (Array.isArray(result)) {
        setData(result);
      } else {
        setData([]);
      }
    } catch (error) {
      showMessage("Failed to load data", "error");
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (text: string, type: 'success' | 'error') => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this record?")) return;
    try {
      const token = localStorage.getItem('adminToken');
      await fetch(`${API_URL}/admin/${table}/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      showMessage("Record deleted", "success");
      fetchData();
    } catch {
      showMessage("Delete failed", "error");
    }
  };

  const handleBulkDelete = async () => {
    if (selectedRows.length === 0) return;
    if (!window.confirm(`Delete ${selectedRows.length} records?`)) return;
    
    try {
      const token = localStorage.getItem('adminToken');
      await Promise.all(selectedRows.map(id => 
        fetch(`${API_URL}/admin/${table}/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ));
      setSelectedRows([]);
      showMessage(`${selectedRows.length} records deleted`, "success");
      fetchData();
    } catch {
      showMessage("Bulk delete failed", "error");
    }
  };

  const handleUpdate = async () => {
    if (!editingRow) return;
    try {
      const token = localStorage.getItem('adminToken');
      await fetch(`${API_URL}/admin/${table}/${editingRow.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editingRow)
      });
      setEditingRow(null);
      showMessage("Record updated", "success");
      fetchData();
    } catch {
      showMessage("Update failed", "error");
    }
  };

  const handleCreate = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      await fetch(`${API_URL}/admin/${table}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newRecord)
      });
      setAddingNew(false);
      setNewRecord({});
      showMessage("Record created", "success");
      fetchData();
    } catch {
      showMessage("Create failed", "error");
    }
  };

  // Email Reply Handler - Works for both Plan Purchases and Appointments
  const handleEmailReply = (row: any, type: 'plan' | 'appointment') => {
    let email = '';
    let name = '';
    let subject = '';
    let message = '';
    
    if (type === 'plan') {
      email = row.email || row.customer_email;
      name = row.name || row.full_name;
      subject = `Re: ${row.plan_name || 'Plan'} Purchase Inquiry - ${name}`;
      message = `Dear ${name},\n\nThank you for your interest in our ${row.plan_name || 'plan'} plan.\n\n`;
    } else if (type === 'appointment') {
      email = row.email || row.customer_email;
      name = row.full_name || row.name || row.customer_name;
      subject = `Re: Your Appointment on ${row.appointment_date || ''} - ${name}`;
      message = `Dear ${name},\n\nThank you for scheduling an appointment with us on ${row.appointment_date} at ${row.appointment_time || 'your preferred time'}.\n\n`;
    }
    
    setSelectedEmail({ to: email, name, subject, message, type });
    setShowEmailModal(true);
  };

  const handleSendEmail = async (emailData: any) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_URL}/send-email`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          to: emailData.to,
          subject: emailData.subject,
          message: emailData.message,
          name: emailData.name
        })
      });

      const result = await response.json();

      if (result.success) {
        showMessage("Email sent successfully!", "success");
        setShowEmailModal(false);
      } else {
        showMessage(result.error || "Failed to send email", "error");
      }
    } catch (error) {
      showMessage("Network error", "error");
    }
  };

  const filteredData = data.filter(row =>
    Object.values(row).some(val =>
      String(val).toLowerCase().includes(search.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const formatLabel = (key: string) => {
    return key.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  };

  const toggleRowSelection = (id: number) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  const toggleAllRows = () => {
    if (selectedRows.length === paginatedData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(paginatedData.map(row => row.id));
    }
  };

  const isImageField = (key: string) => {
    return key.includes('image') || key.includes('img') || key.includes('photo') || key.includes('icon');
  };

  // Check if current table has email fields
  const hasEmailField = (row: any) => {
    return row.email || row.customer_email;
  };

  const getCustomerName = (row: any) => {
    return row.full_name || row.name || row.customer_name || 'Customer';
  };

  return (
    <div style={{ 
      background: "#111111", 
      borderRadius: "16px", 
      border: "1px solid #222222",
      overflow: "hidden",
      boxShadow: "0 4px 24px rgba(0,0,0,0.4)"
    }}>
      {/* Toast Message */}
      {message && (
        <div style={{
          position: "fixed", 
          top: "24px", 
          right: "24px", 
          padding: "14px 24px",
          background: message.type === 'success' 
            ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" 
            : "linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)",
          color: "#ffffff",
          borderRadius: "12px", 
          zIndex: 1000,
          fontSize: "14px", 
          fontWeight: "600",
          boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
          border: "1px solid rgba(255,255,255,0.1)",
          backdropFilter: "blur(10px)",
          animation: "slideIn 0.3s ease"
        }}>
          {message.text}
        </div>
      )}

      {/* Toolbar */}
      <div style={{ 
        padding: "24px", 
        borderBottom: "1px solid #222222",
        display: "flex", 
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "16px",
        background: "#0f0f0f"
      }}>
        <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ position: "relative" }}>
            <input
              type="text"
              placeholder="Search records..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                padding: "12px 16px 12px 44px",
                background: "#1a1a1a",
                border: "1px solid #333333",
                borderRadius: "10px",
                width: "300px",
                fontSize: "14px",
                color: "#ffffff",
                outline: "none",
                transition: "all 0.2s",
                fontWeight: "400"
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#667eea";
                e.target.style.background = "#222222";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#333333";
                e.target.style.background = "#1a1a1a";
              }}
            />
            <span style={{ 
              position: "absolute", 
              left: "16px", 
              top: "50%", 
              transform: "translateY(-50%)",
              color: "#555555", 
              fontSize: "16px" 
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
              </svg>
            </span>
          </div>

          {selectedRows.length > 0 && (
            <button
              onClick={handleBulkDelete}
              style={{
                padding: "12px 20px",
                background: "rgba(255, 107, 107, 0.1)",
                color: "#ff6b6b",
                border: "1px solid rgba(255, 107, 107, 0.3)",
                borderRadius: "10px",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: "600",
                transition: "all 0.2s",
                display: "flex",
                alignItems: "center",
                gap: "6px"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255, 107, 107, 0.2)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255, 107, 107, 0.1)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
              </svg>
              Delete ({selectedRows.length})
            </button>
          )}

          <button 
            onClick={fetchData}
            style={{
              padding: "12px 20px",
              background: "#1a1a1a",
              border: "1px solid #333333",
              borderRadius: "10px",
              cursor: "pointer",
              fontSize: "13px",
              color: "#888888",
              fontWeight: "500",
              transition: "all 0.2s",
              display: "flex",
              alignItems: "center",
              gap: "6px"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#222222";
              e.currentTarget.style.color = "#ffffff";
              e.currentTarget.style.borderColor = "#444444";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#1a1a1a";
              e.currentTarget.style.color = "#888888";
              e.currentTarget.style.borderColor = "#333333";
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
            </svg>
            Refresh
          </button>
        </div>

        <button
          onClick={() => {
            setAddingNew(true);
            if (data[0]) {
              const empty: any = {};
              Object.keys(data[0]).forEach(key => {
                if (key !== 'id' && key !== 'created_at' && key !== 'updated_at') {
                  empty[key] = '';
                }
              });
              setNewRecord(empty);
            }
          }}
          style={{
            padding: "12px 28px",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "#ffffff",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "600",
            transition: "all 0.2s",
            boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 6px 20px rgba(102, 126, 234, 0.6)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 15px rgba(102, 126, 234, 0.4)";
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          Add New Record
        </button>
      </div>

      {/* Table */}
      <div style={{ overflowX: "auto", padding: "0" }}>
        {loading ? (
          <div style={{ textAlign: "center", padding: "80px 20px" }}>
            <div style={{
              display: "inline-block",
              width: "48px",
              height: "48px",
              border: "3px solid #222222",
              borderTop: "3px solid #667eea",
              borderRadius: "50%",
              animation: "spin 1s linear infinite"
            }} />
            <p style={{ marginTop: "20px", color: "#666666", fontSize: "14px", fontWeight: "500" }}>
              Loading data...
            </p>
          </div>
        ) : (
          <>
            {paginatedData.length === 0 ? (
              <div style={{ textAlign: "center", padding: "80px 20px", color: "#555555" }}>
                <div style={{ 
                  fontSize: "64px", 
                  marginBottom: "20px", 
                  opacity: 0.3,
                  filter: "grayscale(100%)"
                }}>📭</div>
                <p style={{ 
                  color: "#888888", 
                  fontSize: "16px",
                  fontWeight: "500",
                  marginBottom: "8px"
                }}>
                  No records found
                </p>
                <p style={{
                  color: "#555555",
                  fontSize: "13px"
                }}>
                  Try adjusting your search or add a new record
                </p>
              </div>
            ) : (
              <>
                <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "0" }}>
                  <thead>
                    <tr style={{ background: "#0a0a0a" }}>
                      <th style={{ 
                        padding: "16px", 
                        width: "48px",
                        borderBottom: "1px solid #222222"
                      }}>
                        <input
                          type="checkbox"
                          checked={selectedRows.length === paginatedData.length && paginatedData.length > 0}
                          onChange={toggleAllRows}
                          style={{ 
                            width: "18px", 
                            height: "18px", 
                            cursor: "pointer",
                            accentColor: "#667eea"
                          }}
                        />
                      </th>
                      {data[0] && Object.keys(data[0]).map(key => (
                        <th key={key} style={{ 
                          padding: "16px 14px", 
                          textAlign: "left", 
                          fontWeight: "600", 
                          color: "#888888",
                          fontSize: "11px",
                          textTransform: "uppercase",
                          letterSpacing: "1px",
                          borderBottom: "1px solid #222222",
                          whiteSpace: "nowrap"
                        }}>
                          {formatLabel(key)}
                        </th>
                      ))}
                      <th style={{ 
                        padding: "16px", 
                        textAlign: "center", 
                        width: "280px",
                        borderBottom: "1px solid #222222"
                      }}>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.map((row, index) => (
                      <tr key={row.id} style={{ 
                        background: selectedRows.includes(row.id) ? 'rgba(102, 126, 234, 0.08)' : '#111111',
                        transition: "all 0.2s ease"
                      }}
                      onMouseEnter={(e) => {
                        if (!selectedRows.includes(row.id)) {
                          e.currentTarget.style.background = '#1a1a1a';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!selectedRows.includes(row.id)) {
                          e.currentTarget.style.background = '#111111';
                        }
                      }}>
                        <td style={{ 
                          padding: "16px", 
                          textAlign: "center",
                          borderBottom: "1px solid #1a1a1a"
                        }}>
                          <input
                            type="checkbox"
                            checked={selectedRows.includes(row.id)}
                            onChange={() => toggleRowSelection(row.id)}
                            style={{ 
                              width: "18px", 
                              height: "18px", 
                              cursor: "pointer",
                              accentColor: "#667eea"
                            }}
                          />
                        </td>
                        {Object.entries(row).map(([key, val], i) => {
                          const isImage = isImageField(key);
                          
                          return (
                            <td key={i} style={{ 
                              padding: "16px 14px", 
                              color: "#e0e0e0", 
                              fontSize: "13px",
                              fontWeight: "400",
                              borderBottom: "1px solid #1a1a1a",
                              maxWidth: "200px",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap"
                            }}>
                              {isImage && val ? (
                                val.startsWith('http') || val.startsWith('/') || val.startsWith('uploads/') ? (
                                  <img 
                                    src={val} 
                                    alt={key}
                                    style={{
                                      width: "40px",
                                      height: "40px",
                                      objectFit: "cover",
                                      borderRadius: "8px",
                                      border: "1px solid #333333"
                                    }}
                                    onError={(e) => {
                                      (e.target as HTMLImageElement).style.display = 'none';
                                    }}
                                  />
                                ) : (
                                  <span style={{ fontSize: "28px" }}>{val}</span>
                                )
                              ) : (
                                <span title={String(val)}>
                                  {val !== null && val !== undefined ? String(val).substring(0, 50) : '-'}
                                  {String(val).length > 50 && '...'}
                                </span>
                              )}
                            </td>
                          );
                        })}
                        <td style={{ 
                          padding: "16px", 
                          textAlign: "center",
                          borderBottom: "1px solid #1a1a1a"
                        }}>
                          <div style={{ display: "flex", gap: "8px", justifyContent: "center", flexWrap: "wrap" }}>
                            {/* Email Reply Button - Works for Plan Purchases AND Appointments */}
                            {hasEmailField(row) && (
                              <button
                                onClick={() => {
                                  if (table === 'plan_purchases') {
                                    handleEmailReply(row, 'plan');
                                  } else if (table === 'appointments') {
                                    handleEmailReply(row, 'appointment');
                                  } else {
                                    // Fallback for any table with email
                                    handleEmailReply(row, 'plan');
                                  }
                                }}
                                style={{
                                  padding: "8px 14px",
                                  background: "rgba(102, 126, 234, 0.15)",
                                  color: "#667eea",
                                  border: "1px solid rgba(102, 126, 234, 0.3)",
                                  borderRadius: "8px",
                                  cursor: "pointer",
                                  fontSize: "12px",
                                  fontWeight: "600",
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "6px",
                                  transition: "all 0.2s"
                                }}
                                title="Reply via Email"
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background = "rgba(102, 126, 234, 0.25)";
                                  e.currentTarget.style.transform = "translateY(-1px)";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background = "rgba(102, 126, 234, 0.15)";
                                  e.currentTarget.style.transform = "translateY(0)";
                                }}
                              >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                                  <polyline points="22,6 12,13 2,6"/>
                                </svg>
                                Email Reply
                              </button>
                            )}
                            
                            <button
                              onClick={() => setEditingRow(row)}
                              style={{
                                padding: "8px 14px",
                                background: "#1a1a1a",
                                color: "#888888",
                                border: "1px solid #333333",
                                borderRadius: "8px",
                                cursor: "pointer",
                                fontSize: "12px",
                                fontWeight: "500",
                                transition: "all 0.2s",
                                display: "flex",
                                alignItems: "center",
                                gap: "6px"
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = "#222222";
                                e.currentTarget.style.color = "#ffffff";
                                e.currentTarget.style.borderColor = "#444444";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = "#1a1a1a";
                                e.currentTarget.style.color = "#888888";
                                e.currentTarget.style.borderColor = "#333333";
                              }}
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                              </svg>
                              Edit
                            </button>
                            
                            <button
                              onClick={() => handleDelete(row.id)}
                              style={{
                                padding: "8px 14px",
                                background: "transparent",
                                color: "#ff6b6b",
                                border: "1px solid rgba(255, 107, 107, 0.3)",
                                borderRadius: "8px",
                                cursor: "pointer",
                                fontSize: "12px",
                                fontWeight: "500",
                                transition: "all 0.2s",
                                display: "flex",
                                alignItems: "center",
                                gap: "6px"
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = "rgba(255, 107, 107, 0.1)";
                                e.currentTarget.style.transform = "translateY(-1px)";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = "transparent";
                                e.currentTarget.style.transform = "translateY(0)";
                              }}
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                              </svg>
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "8px",
                    padding: "24px",
                    borderTop: "1px solid #222222",
                    background: "#0f0f0f"
                  }}>
                    <button
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      style={{
                        padding: "10px 18px",
                        background: currentPage === 1 ? "#1a1a1a" : "#222222",
                        border: "1px solid #333333",
                        borderRadius: "10px",
                        cursor: currentPage === 1 ? "not-allowed" : "pointer",
                        color: currentPage === 1 ? "#555555" : "#ffffff",
                        fontSize: "13px",
                        fontWeight: "500",
                        transition: "all 0.2s",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px"
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 12H5M12 19l-7-7 7-7"/>
                      </svg>
                      Previous
                    </button>
                    
                    <div style={{ display: "flex", gap: "6px" }}>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          style={{
                            width: "40px",
                            height: "40px",
                            background: currentPage === page 
                              ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" 
                              : "#1a1a1a",
                            border: "1px solid " + (currentPage === page ? "transparent" : "#333333"),
                            borderRadius: "10px",
                            cursor: "pointer",
                            color: "#ffffff",
                            fontSize: "13px",
                            fontWeight: "600",
                            transition: "all 0.2s",
                            boxShadow: currentPage === page ? "0 4px 15px rgba(102, 126, 234, 0.4)" : "none"
                          }}
                        >
                          {page}
                        </button>
                      ))}
                    </div>
                    
                    <button
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      style={{
                        padding: "10px 18px",
                        background: currentPage === totalPages ? "#1a1a1a" : "#222222",
                        border: "1px solid #333333",
                        borderRadius: "10px",
                        cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                        color: currentPage === totalPages ? "#555555" : "#ffffff",
                        fontSize: "13px",
                        fontWeight: "500",
                        transition: "all 0.2s",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px"
                      }}
                    >
                      Next
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </button>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>

      {/* Email Reply Modal - Works for Both */}
      {showEmailModal && (
        <EmailReplyModal
          email={selectedEmail.to}
          customerName={selectedEmail.name}
          subject={selectedEmail.subject}
          defaultMessage={selectedEmail.message}
          onClose={() => setShowEmailModal(false)}
          onSend={handleSendEmail}
        />
      )}

      {/* Edit Modal with Image Upload */}
      {editingRow && (
        <Modal
          title="Edit Record"
          onClose={() => setEditingRow(null)}
          onSubmit={handleUpdate}
        >
          {Object.keys(editingRow).map(key => {
            if (key === 'id' || key === 'created_at' || key === 'updated_at') return null;
            const isImage = isImageField(key);
            
            return (
              <div key={key} style={{ marginBottom: "20px" }}>
                <label style={{ 
                  display: "block", 
                  marginBottom: "8px", 
                  fontSize: "12px", 
                  color: "#888888",
                  fontWeight: "600",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px"
                }}>
                  {formatLabel(key)}
                </label>
                
                {isImage ? (
                  <div>
                    {editingRow[key] && (
                      <div style={{ marginBottom: "12px" }}>
                        {editingRow[key].startsWith('http') || editingRow[key].startsWith('/') || editingRow[key].startsWith('uploads/') ? (
                          <img 
                            src={editingRow[key]} 
                            alt={key}
                            style={{
                              width: "80px",
                              height: "80px",
                              objectFit: "cover",
                              borderRadius: "12px",
                              border: "2px solid #333333"
                            }}
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                        ) : (
                          <span style={{ fontSize: "48px" }}>{editingRow[key]}</span>
                        )}
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, false, key)}
                      style={{
                        width: "100%",
                        padding: "10px",
                        background: "#1a1a1a",
                        border: "1px solid #333333",
                        borderRadius: "10px",
                        color: "#ffffff",
                        fontSize: "13px",
                        marginBottom: "10px"
                      }}
                    />
                    <input
                      type="text"
                      value={editingRow[key] || ''}
                      onChange={(e) => setEditingRow({ ...editingRow, [key]: e.target.value })}
                      placeholder="Or enter image URL / emoji"
                      style={{
                        width: "100%",
                        padding: "12px 14px",
                        background: "#1a1a1a",
                        border: "1px solid #333333",
                        borderRadius: "10px",
                        fontSize: "14px",
                        color: "#ffffff",
                        outline: "none",
                        transition: "all 0.2s"
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#667eea";
                        e.target.style.background = "#222222";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "#333333";
                        e.target.style.background = "#1a1a1a";
                      }}
                    />
                  </div>
                ) : (
                  <input
                    type="text"
                    value={editingRow[key] || ''}
                    onChange={(e) => setEditingRow({ ...editingRow, [key]: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      background: "#1a1a1a",
                      border: "1px solid #333333",
                      borderRadius: "10px",
                      fontSize: "14px",
                      color: "#ffffff",
                      outline: "none",
                      transition: "all 0.2s"
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#667eea";
                      e.target.style.background = "#222222";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#333333";
                      e.target.style.background = "#1a1a1a";
                    }}
                  />
                )}
              </div>
            );
          })}
        </Modal>
      )}

      {/* Add Modal with Image Upload */}
      {addingNew && (
        <Modal
          title="Add New Record"
          onClose={() => setAddingNew(false)}
          onSubmit={handleCreate}
        >
          {Object.keys(newRecord).map(key => {
            const isImage = isImageField(key);
            
            return (
              <div key={key} style={{ marginBottom: "20px" }}>
                <label style={{ 
                  display: "block", 
                  marginBottom: "8px", 
                  fontSize: "12px", 
                  color: "#888888",
                  fontWeight: "600",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px"
                }}>
                  {formatLabel(key)}
                </label>
                
                {isImage ? (
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, true, key)}
                      style={{
                        width: "100%",
                        padding: "10px",
                        background: "#1a1a1a",
                        border: "1px solid #333333",
                        borderRadius: "10px",
                        color: "#ffffff",
                        fontSize: "13px",
                        marginBottom: "10px"
                      }}
                    />
                    <input
                      type="text"
                      value={newRecord[key] || ''}
                      onChange={(e) => setNewRecord({ ...newRecord, [key]: e.target.value })}
                      placeholder="Or enter image URL / emoji"
                      style={{
                        width: "100%",
                        padding: "12px 14px",
                        background: "#1a1a1a",
                        border: "1px solid #333333",
                        borderRadius: "10px",
                        fontSize: "14px",
                        color: "#ffffff",
                        outline: "none",
                        transition: "all 0.2s"
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#667eea";
                        e.target.style.background = "#222222";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "#333333";
                        e.target.style.background = "#1a1a1a";
                      }}
                    />
                  </div>
                ) : (
                  <input
                    type="text"
                    value={newRecord[key] || ''}
                    onChange={(e) => setNewRecord({ ...newRecord, [key]: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      background: "#1a1a1a",
                      border: "1px solid #333333",
                      borderRadius: "10px",
                      fontSize: "14px",
                      color: "#ffffff",
                      outline: "none",
                      transition: "all 0.2s"
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#667eea";
                      e.target.style.background = "#222222";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#333333";
                      e.target.style.background = "#1a1a1a";
                    }}
                  />
                )}
              </div>
            );
          })}
        </Modal>
      )}

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #111111;
        }
        ::-webkit-scrollbar-thumb {
          background: #333333;
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #444444;
        }
      `}</style>
    </div>
  );
};

// ==================== EMAIL REPLY MODAL ====================
const EmailReplyModal = ({ email, customerName, subject, defaultMessage, onClose, onSend }: any) => {
  const [emailData, setEmailData] = useState({
    to: email,
    subject: subject,
    message: defaultMessage,
    name: customerName
  });
  const [sending, setSending] = useState(false);

  const handleSubmit = async () => {
    setSending(true);
    await onSend(emailData);
    setSending(false);
  };

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0, 0, 0, 0.8)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 2000,
      backdropFilter: "blur(8px)",
      padding: "20px"
    }} onClick={onClose}>
      <div style={{
        background: "#111111",
        padding: "32px",
        borderRadius: "20px",
        width: "600px",
        maxWidth: "100%",
        maxHeight: "90vh",
        overflowY: "auto",
        border: "1px solid #222222",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.8)"
      }} onClick={(e) => e.stopPropagation()}>
        
        <div style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center", 
          marginBottom: "28px",
          paddingBottom: "20px",
          borderBottom: "1px solid #222222"
        }}>
          <div>
            <h3 style={{ 
              margin: 0, 
              fontSize: "22px", 
              fontWeight: "700", 
              color: "#ffffff",
              letterSpacing: "-0.5px"
            }}>
              Reply to Email
            </h3>
            <p style={{
              margin: "6px 0 0",
              color: "#666666",
              fontSize: "14px"
            }}>
              Sending to {customerName}
            </p>
          </div>
          <button 
            onClick={onClose}
            style={{
              background: "#1a1a1a",
              border: "1px solid #333333",
              fontSize: "18px",
              cursor: "pointer",
              color: "#888888",
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#222222";
              e.currentTarget.style.color = "#ffffff";
              e.currentTarget.style.borderColor = "#444444";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#1a1a1a";
              e.currentTarget.style.color = "#888888";
              e.currentTarget.style.borderColor = "#333333";
            }}
          >
            ✕
          </button>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ 
            display: "block", 
            marginBottom: "8px", 
            fontSize: "12px", 
            fontWeight: "600", 
            color: "#888888",
            textTransform: "uppercase",
            letterSpacing: "1px"
          }}>
            To:
          </label>
          <div style={{
            padding: "14px",
            background: "#0a0a0a",
            borderRadius: "12px",
            fontSize: "14px",
            color: "#ffffff",
            border: "1px solid #222222",
            fontWeight: "500"
          }}>
            {email}
          </div>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ 
            display: "block", 
            marginBottom: "8px", 
            fontSize: "12px", 
            fontWeight: "600", 
            color: "#888888",
            textTransform: "uppercase",
            letterSpacing: "1px"
          }}>
            Subject
          </label>
          <input
            type="text"
            value={emailData.subject}
            onChange={(e) => setEmailData({...emailData, subject: e.target.value})}
            style={{
              width: "100%",
              padding: "14px",
              background: "#1a1a1a",
              border: "1px solid #333333",
              borderRadius: "12px",
              fontSize: "14px",
              color: "#ffffff",
              outline: "none",
              transition: "all 0.2s",
              fontWeight: "500"
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#667eea";
              e.target.style.background = "#222222";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#333333";
              e.target.style.background = "#1a1a1a";
            }}
          />
        </div>

        <div style={{ marginBottom: "28px" }}>
          <label style={{ 
            display: "block", 
            marginBottom: "8px", 
            fontSize: "12px", 
            fontWeight: "600", 
            color: "#888888",
            textTransform: "uppercase",
            letterSpacing: "1px"
          }}>
            Message
          </label>
          <textarea
            rows={8}
            value={emailData.message}
            onChange={(e) => setEmailData({...emailData, message: e.target.value})}
            style={{
              width: "100%",
              padding: "14px",
              background: "#1a1a1a",
              border: "1px solid #333333",
              borderRadius: "12px",
              fontSize: "14px",
              color: "#ffffff",
              outline: "none",
              resize: "vertical",
              fontFamily: "inherit",
              lineHeight: "1.6",
              fontWeight: "400"
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#667eea";
              e.target.style.background = "#222222";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#333333";
              e.target.style.background = "#1a1a1a";
            }}
          />
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
          <button 
            onClick={onClose}
            style={{
              padding: "12px 24px",
              background: "#1a1a1a",
              border: "1px solid #333333",
              borderRadius: "12px",
              cursor: "pointer",
              fontSize: "14px",
              color: "#888888",
              fontWeight: "600",
              transition: "all 0.2s"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#222222";
              e.currentTarget.style.color = "#ffffff";
              e.currentTarget.style.borderColor = "#444444";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#1a1a1a";
              e.currentTarget.style.color = "#888888";
              e.currentTarget.style.borderColor = "#333333";
            }}
          >
            Cancel
          </button>
          <button 
            onClick={handleSubmit}
            disabled={sending}
            style={{
              padding: "12px 32px",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "#ffffff",
              border: "none",
              borderRadius: "12px",
              cursor: sending ? "not-allowed" : "pointer",
              fontSize: "14px",
              fontWeight: "600",
              opacity: sending ? 0.7 : 1,
              transition: "all 0.2s",
              boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}
            onMouseEnter={(e) => {
              if (!sending) {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(102, 126, 234, 0.6)";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 15px rgba(102, 126, 234, 0.4)";
            }}
          >
            {sending ? (
              <>
                <div style={{
                  width: "16px",
                  height: "16px",
                  border: "2px solid rgba(255,255,255,0.3)",
                  borderTop: "2px solid #ffffff",
                  borderRadius: "50%",
                  animation: "spin 0.8s linear infinite"
                }}/>
                Sending...
              </>
            ) : (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="22" y1="2" x2="11" y2="13"/>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
                Send Reply
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// ==================== MODAL COMPONENT ====================
const Modal = ({ title, children, onClose, onSubmit }: any) => (
  <div style={{
    position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
    background: "rgba(0, 0, 0, 0.8)",
    display: "flex", alignItems: "center", justifyContent: "center",
    zIndex: 1000,
    backdropFilter: "blur(8px)",
    padding: "20px"
  }} onClick={onClose}>
    <div style={{
      background: "#111111",
      padding: "32px",
      borderRadius: "20px",
      width: "520px",
      maxWidth: "100%",
      maxHeight: "85vh",
      overflowY: "auto",
      border: "1px solid #222222",
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.8)"
    }} onClick={(e) => e.stopPropagation()}>
      <h3 style={{ 
        margin: "0 0 28px", 
        fontSize: "22px", 
        fontWeight: "700", 
        color: "#ffffff",
        letterSpacing: "-0.5px",
        paddingBottom: "20px",
        borderBottom: "1px solid #222222"
      }}>{title}</h3>
      
      <div style={{ maxHeight: "50vh", overflowY: "auto", paddingRight: "8px" }}>
        {children}
      </div>
      
      <div style={{ 
        marginTop: "28px", 
        display: "flex", 
        justifyContent: "flex-end", 
        gap: "12px",
        paddingTop: "20px",
        borderTop: "1px solid #222222"
      }}>
        <button onClick={onClose} style={{
          padding: "12px 24px",
          background: "#1a1a1a",
          border: "1px solid #333333",
          borderRadius: "12px",
          cursor: "pointer",
          fontSize: "14px",
          color: "#888888",
          fontWeight: "600",
          transition: "all 0.2s"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#222222";
          e.currentTarget.style.color = "#ffffff";
          e.currentTarget.style.borderColor = "#444444";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "#1a1a1a";
          e.currentTarget.style.color = "#888888";
          e.currentTarget.style.borderColor = "#333333";
        }}>
          Cancel
        </button>
        <button onClick={onSubmit} style={{
          padding: "12px 28px",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "#ffffff",
          border: "none",
          borderRadius: "12px",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: "600",
          transition: "all 0.2s",
          boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = "0 6px 20px rgba(102, 126, 234, 0.6)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 4px 15px rgba(102, 126, 234, 0.4)";
        }}>
          Save Changes
        </button>
      </div>
    </div>
  </div>
);