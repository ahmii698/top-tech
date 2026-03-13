// src/components/admin/NewAdminPanel.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// ==================== ALL DATABASE TABLES ====================
const TABLES = [
  { name: "banners", icon: "🎯", label: "Banners" },
  { name: "blog_posts", icon: "📝", label: "Blog Posts" },
  { name: "company_info", icon: "🏢", label: "Company Info" },
  { name: "contact_messages", icon: "✉️", label: "Contact Messages" },
  { name: "cta_section", icon: "📢", label: "CTA Section" },
  { name: "faqs", icon: "❓", label: "FAQs" },
  { name: "features", icon: "⭐", label: "Features" },
  { name: "hero_section", icon: "🖼️", label: "Hero Section" },
  { name: "newsletter_subscribers", icon: "📧", label: "Newsletter" },
  { name: "pages", icon: "📄", label: "Pages" },
  { name: "portfolio", icon: "💼", label: "Portfolio" },
  { name: "portfolio_technologies", icon: "🔧", label: "Portfolio Tech" },
  { name: "pricing_features", icon: "💰", label: "Pricing Features" },
  { name: "pricing_plans", icon: "💎", label: "Pricing Plans" },
  { name: "process_steps", icon: "⚙️", label: "Process Steps" },
  { name: "services", icon: "🛠️", label: "Services" },
  { name: "service_features", icon: "✨", label: "Service Features" },
  { name: "site_settings", icon: "⚙️", label: "Site Settings" },
  { name: "statistics", icon: "📊", label: "Statistics" },
  { name: "team_members", icon: "👥", label: "Team Members" },
  { name: "technologies", icon: "💻", label: "Technologies" },
  { name: "testimonials", icon: "💬", label: "Testimonials" },
  { name: "users", icon: "👤", label: "Users" }
];

// ==================== MAIN ADMIN PANEL ====================
export default function NewAdminPanel() {
  const [activeTable, setActiveTable] = useState(TABLES[0].name);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
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
  }, []);

  const logout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    navigate("/");
  };

  const activeTableData = TABLES.find(t => t.name === activeTable);

  // Filter tables based on search
  const filteredTables = TABLES.filter(t => 
    t.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "'Inter', 'Segoe UI', Roboto, sans-serif" }}>
      {/* ==================== BROWN SIDEBAR ==================== */}
      <div style={{
        width: sidebarOpen ? "280px" : "80px",
        background: "linear-gradient(180deg, #3e2c1f 0%, #2c1e14 100%)",
        color: "#f5e6d3",
        transition: "width 0.3s ease",
        display: "flex",
        flexDirection: "column",
        boxShadow: "4px 0 20px rgba(0,0,0,0.2)",
        position: "relative",
        zIndex: 10
      }}>
        {/* Sidebar Header */}
        <div style={{
          padding: sidebarOpen ? "24px" : "20px 0",
          borderBottom: "1px solid rgba(245, 230, 211, 0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: sidebarOpen ? "space-between" : "center"
        }}>
          {sidebarOpen ? (
            <>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{
                  width: "42px",
                  height: "42px",
                  background: "#c9a87c",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px",
                  fontWeight: "600",
                  color: "#2c1e14"
                }}>A</div>
                <div>
                  <span style={{ fontSize: "18px", fontWeight: "600", color: "#f5e6d3" }}>Admin</span>
                  <p style={{ margin: "2px 0 0", fontSize: "11px", color: "#b99e7c", letterSpacing: "0.3px" }}>MANAGEMENT</p>
                </div>
              </div>
              <button 
                onClick={() => setSidebarOpen(false)} 
                style={{
                  background: "rgba(245, 230, 211, 0.1)",
                  border: "none",
                  color: "#b99e7c",
                  cursor: "pointer",
                  fontSize: "14px",
                  width: "30px",
                  height: "30px",
                  borderRadius: "6px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s"
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = "rgba(201, 168, 124, 0.2)"}
                onMouseLeave={(e) => e.currentTarget.style.background = "rgba(245, 230, 211, 0.1)"}
              >
                ◀
              </button>
            </>
          ) : (
            <button 
              onClick={() => setSidebarOpen(true)} 
              style={{
                background: "rgba(245, 230, 211, 0.1)",
                border: "none",
                color: "#f5e6d3",
                cursor: "pointer",
                fontSize: "16px",
                width: "36px",
                height: "36px",
                borderRadius: "8px",
                margin: "0 auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s"
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "rgba(201, 168, 124, 0.2)"}
            >
              ▶
            </button>
          )}
        </div>

        
        {/* Search Bar */}
        {sidebarOpen && (
          <div style={{ padding: "16px" }}>
            <div style={{ position: "relative" }}>
              <input
                type="text"
                placeholder="Search modules..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 10px 10px 36px",
                  background: "rgba(0,0,0,0.2)",
                  border: "1px solid rgba(201, 168, 124, 0.2)",
                  borderRadius: "8px",
                  color: "#f5e6d3",
                  fontSize: "13px",
                  outline: "none",
                  transition: "all 0.2s"
                }}
                onFocus={(e) => e.target.style.borderColor = "#c9a87c"}
                onBlur={(e) => e.target.style.borderColor = "rgba(201, 168, 124, 0.2)"}
              />
              <span style={{ position: "absolute", left: "12px", top: "10px", color: "#b99e7c", fontSize: "14px" }}>🔍</span>
            </div>
          </div>
        )}

        {/* Menu Items */}
        <div style={{
          flex: 1,
          overflowY: "auto",
          padding: sidebarOpen ? "0 12px" : "0 4px"
        }}>
          {sidebarOpen && (
            <div style={{
              fontSize: "11px",
              fontWeight: "600",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              color: "#b99e7c",
              margin: "16px 12px 8px"
            }}>
              MODULES
            </div>
          )}

          {filteredTables.map(table => {
            const isActive = activeTable === table.name;
            return (
              <div
                key={table.name}
                onClick={() => setActiveTable(table.name)}
                style={{
                  padding: sidebarOpen ? "10px 14px" : "12px 0",
                  marginBottom: "2px",
                  background: isActive ? "rgba(201, 168, 124, 0.15)" : "transparent",
                  borderRadius: "8px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: sidebarOpen ? "flex-start" : "center",
                  color: isActive ? "#c9a87c" : "#b99e7c",
                  borderLeft: isActive ? `3px solid #c9a87c` : "3px solid transparent",
                  transition: "all 0.2s"
                }}
                title={!sidebarOpen ? table.label : ""}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                    e.currentTarget.style.color = "#f5e6d3";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "#b99e7c";
                  }
                }}
              >
                <span style={{ 
                  fontSize: "16px", 
                  marginRight: sidebarOpen ? "12px" : 0,
                  color: isActive ? "#c9a87c" : "#b99e7c"
                }}>
                  {table.icon}
                </span>
                {sidebarOpen && (
                  <>
                    <span style={{ flex: 1, fontSize: "13px", fontWeight: isActive ? "500" : "400" }}>
                      {table.label}
                    </span>
                    {table.name === 'contact_messages' && (
                      <span style={{
                        background: "#c9a87c",
                        color: "#2c1e14",
                        fontSize: "10px",
                        padding: "2px 6px",
                        borderRadius: "10px",
                        fontWeight: "600"
                      }}>
                        3
                      </span>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* Logout Button */}
        <div style={{ padding: sidebarOpen ? "16px" : "16px 8px", borderTop: "1px solid rgba(201, 168, 124, 0.2)" }}>
          <button
            onClick={logout}
            style={{
              width: "100%",
              padding: "10px",
              background: "transparent",
              color: "#ff8a7a",
              border: "1px solid rgba(255, 138, 122, 0.3)",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: "500",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              transition: "all 0.2s"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#ff8a7a";
              e.currentTarget.style.color = "#2c1e14";
              e.currentTarget.style.borderColor = "#ff8a7a";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#ff8a7a";
              e.currentTarget.style.borderColor = "rgba(255, 138, 122, 0.3)";
            }}
          >
            <span>🚪</span>
            {sidebarOpen && "Logout"}
          </button>
        </div>
      </div>

      {/* ==================== WHITE MAIN CONTENT ==================== */}
      <div style={{ 
        flex: 1, 
        display: "flex", 
        flexDirection: "column", 
        background: "#faf7f2",
        overflow: "hidden"
      }}>
        {/* Top Bar */}
        <div style={{
          background: "#ffffff",
          padding: "16px 24px",
          borderBottom: "1px solid #e8e0d5",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 2px 8px rgba(0,0,0,0.02)"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{
              width: "4px",
              height: "36px",
              background: "#c9a87c",
              borderRadius: "2px"
            }} />
            <div>
              <h1 style={{ 
                margin: 0,
                fontSize: "22px",
                fontWeight: "600",
                color: "#2c1e14"
              }}>
                {activeTableData?.label}
              </h1>
              <p style={{
                margin: "2px 0 0",
                color: "#8b7a6b",
                fontSize: "13px"
              }}>
                Manage {activeTableData?.label.toLowerCase()}
              </p>
            </div>
          </div>

          {/* Right Side */}
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            {/* Notification */}
            <button style={{
              background: "transparent",
              border: "none",
              width: "36px",
              height: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              position: "relative",
              fontSize: "18px",
              color: "#8b7a6b",
              borderRadius: "8px",
              transition: "all 0.2s"
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = "#f0e9e0"}
            onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
            >
              🔔
              <span style={{
                position: "absolute",
                top: "8px",
                right: "8px",
                width: "6px",
                height: "6px",
                background: "#c9a87c",
                borderRadius: "50%"
              }} />
            </button>

            {/* User Profile */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "4px 4px 4px 12px",
              borderRadius: "30px",
              transition: "all 0.2s"
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = "#f0e9e0"}
            onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
            >
              <span style={{ fontSize: "14px", color: "#2c1e14" }}>{user?.name || "Admin"}</span>
              <div style={{
                width: "36px",
                height: "36px",
                background: "#c9a87c",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#2c1e14",
                fontWeight: "500",
                fontSize: "16px"
              }}>
                {user?.name?.charAt(0) || "A"}
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div style={{ flex: 1, padding: "24px", overflowY: "auto" }}>
          <DataTable table={activeTable} />
        </div>
      </div>
    </div>
  );
}

// ==================== DATA TABLE COMPONENT ====================
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
  const rowsPerPage = 10;

  const API_URL = 'http://localhost:8000/api';

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

  return (
    <div style={{ background: "#ffffff", borderRadius: "12px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
      {/* Toast Message */}
      {message && (
        <div style={{
          position: "fixed", top: "24px", right: "24px", padding: "12px 24px",
          background: message.type === 'success' ? "#c9a87c" : "#ff8a7a",
          color: message.type === 'success' ? "#2c1e14" : "#2c1e14",
          borderRadius: "8px", zIndex: 1000,
          fontSize: "13px", fontWeight: "500",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
        }}>
          {message.text}
        </div>
      )}

      {/* Toolbar */}
      <div style={{ 
        padding: "20px", 
        borderBottom: "1px solid #e8e0d5",
        display: "flex", 
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "16px"
      }}>
        <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
          {/* Search */}
          <div style={{ position: "relative" }}>
            <input
              type="text"
              placeholder="Search records..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                padding: "10px 12px 10px 38px",
                border: "1px solid #e0d5c8",
                borderRadius: "8px",
                width: "260px",
                fontSize: "13px",
                outline: "none",
                transition: "all 0.2s"
              }}
              onFocus={(e) => e.target.style.borderColor = "#c9a87c"}
              onBlur={(e) => e.target.style.borderColor = "#e0d5c8"}
            />
            <span style={{ position: "absolute", left: "12px", top: "10px", color: "#b99e7c", fontSize: "14px" }}>🔍</span>
          </div>

          {/* Bulk Delete */}
          {selectedRows.length > 0 && (
            <button
              onClick={handleBulkDelete}
              style={{
                padding: "8px 16px",
                background: "#ff8a7a",
                color: "#2c1e14",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: "500",
                transition: "all 0.2s"
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "#ff6b5a"}
              onMouseLeave={(e) => e.currentTarget.style.background = "#ff8a7a"}
            >
              Delete ({selectedRows.length})
            </button>
          )}

          {/* Refresh */}
          <button 
            onClick={fetchData}
            style={{
              padding: "8px 16px",
              background: "#f5f0e8",
              border: "1px solid #e0d5c8",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "13px",
              color: "#2c1e14",
              transition: "all 0.2s"
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = "#e8e0d5"}
            onMouseLeave={(e) => e.currentTarget.style.background = "#f5f0e8"}
          >
            ↻ Refresh
          </button>
        </div>

        {/* Add Button */}
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
            padding: "10px 24px",
            background: "#c9a87c",
            color: "#2c1e14",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "13px",
            fontWeight: "600",
            transition: "all 0.2s"
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = "#b89464"}
          onMouseLeave={(e) => e.currentTarget.style.background = "#c9a87c"}
        >
          + Add New Record
        </button>
      </div>

      {/* Table */}
      <div style={{ overflowX: "auto", padding: "0 20px 20px" }}>
        {loading ? (
          <div style={{ textAlign: "center", padding: "60px" }}>
            <div style={{
              display: "inline-block",
              width: "36px",
              height: "36px",
              border: "3px solid #f0e9e0",
              borderTop: "3px solid #c9a87c",
              borderRadius: "50%",
              animation: "spin 1s linear infinite"
            }} />
            <p style={{ marginTop: "12px", color: "#b99e7c", fontSize: "13px" }}>Loading data...</p>
          </div>
        ) : (
          <>
            {paginatedData.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px", color: "#b99e7c" }}>
                <div style={{ fontSize: "48px", marginBottom: "12px", opacity: 0.5 }}>📭</div>
                <p style={{ color: "#2c1e14" }}>No records found</p>
              </div>
            ) : (
              <>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ background: "#faf7f2", borderBottom: "2px solid #e8e0d5" }}>
                      <th style={{ padding: "14px", width: "40px" }}>
                        <input
                          type="checkbox"
                          checked={selectedRows.length === paginatedData.length}
                          onChange={toggleAllRows}
                          style={{ width: "16px", height: "16px", cursor: "pointer" }}
                        />
                      </th>
                      {data[0] && Object.keys(data[0]).map(key => (
                        <th key={key} style={{ 
                          padding: "14px 12px", 
                          textAlign: "left", 
                          fontWeight: "600", 
                          color: "#2c1e14",
                          fontSize: "12px",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px"
                        }}>
                          {formatLabel(key)}
                        </th>
                      ))}
                      <th style={{ padding: "14px", textAlign: "center", width: "140px" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.map((row, index) => (
                      <tr key={row.id} style={{ 
                        borderBottom: "1px solid #f0e9e0",
                        background: selectedRows.includes(row.id) ? '#f5efe8' : '#ffffff',
                        transition: "background 0.2s"
                      }}
                      onMouseEnter={(e) => {
                        if (!selectedRows.includes(row.id)) {
                          e.currentTarget.style.background = '#faf7f2';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!selectedRows.includes(row.id)) {
                          e.currentTarget.style.background = '#ffffff';
                        }
                      }}>
                        <td style={{ padding: "14px", textAlign: "center" }}>
                          <input
                            type="checkbox"
                            checked={selectedRows.includes(row.id)}
                            onChange={() => toggleRowSelection(row.id)}
                            style={{ width: "16px", height: "16px", cursor: "pointer" }}
                          />
                        </td>
                        {Object.entries(row).map(([key, val], i) => (
                          <td key={i} style={{ padding: "14px 12px", color: "#2c1e14", fontSize: "13px" }}>
                            {val !== null && val !== undefined ? String(val).substring(0, 50) : '-'}
                            {String(val).length > 50 && '...'}
                          </td>
                        ))}
                        <td style={{ padding: "14px", textAlign: "center" }}>
                          <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
                            <button
                              onClick={() => setEditingRow(row)}
                              style={{
                                padding: "6px 14px",
                                background: "#f5f0e8",
                                color: "#2c1e14",
                                border: "1px solid #e0d5c8",
                                borderRadius: "6px",
                                cursor: "pointer",
                                fontSize: "12px",
                                transition: "all 0.2s"
                              }}
                              onMouseEnter={(e) => e.currentTarget.style.background = "#e8e0d5"}
                              onMouseLeave={(e) => e.currentTarget.style.background = "#f5f0e8"}
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(row.id)}
                              style={{
                                padding: "6px 14px",
                                background: "#fff1ef",
                                color: "#ff6b5a",
                                border: "1px solid #ffdbd6",
                                borderRadius: "6px",
                                cursor: "pointer",
                                fontSize: "12px",
                                transition: "all 0.2s"
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = "#ffe1dc";
                                e.currentTarget.style.borderColor = "#ffb5aa";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = "#fff1ef";
                                e.currentTarget.style.borderColor = "#ffdbd6";
                              }}
                            >
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
                    padding: "20px",
                    borderTop: "1px solid #f0e9e0"
                  }}>
                    <button
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      style={{
                        padding: "6px 14px",
                        background: "#f5f0e8",
                        border: "1px solid #e0d5c8",
                        borderRadius: "6px",
                        cursor: currentPage === 1 ? "not-allowed" : "pointer",
                        color: currentPage === 1 ? "#b99e7c" : "#2c1e14",
                        fontSize: "12px",
                        transition: "all 0.2s"
                      }}
                      onMouseEnter={(e) => {
                        if (currentPage !== 1) {
                          e.currentTarget.style.background = "#e8e0d5";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (currentPage !== 1) {
                          e.currentTarget.style.background = "#f5f0e8";
                        }
                      }}
                    >
                      Previous
                    </button>
                    <span style={{ fontSize: "13px", color: "#2c1e14", padding: "0 12px" }}>
                      Page {currentPage} of {totalPages}
                    </span>
                    <button
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      style={{
                        padding: "6px 14px",
                        background: "#f5f0e8",
                        border: "1px solid #e0d5c8",
                        borderRadius: "6px",
                        cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                        color: currentPage === totalPages ? "#b99e7c" : "#2c1e14",
                        fontSize: "12px",
                        transition: "all 0.2s"
                      }}
                      onMouseEnter={(e) => {
                        if (currentPage !== totalPages) {
                          e.currentTarget.style.background = "#e8e0d5";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (currentPage !== totalPages) {
                          e.currentTarget.style.background = "#f5f0e8";
                        }
                      }}
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>

      {/* Edit Modal */}
      {editingRow && (
        <Modal
          title="Edit Record"
          onClose={() => setEditingRow(null)}
          onSubmit={handleUpdate}
        >
          {Object.keys(editingRow).map(key => {
            if (key === 'id' || key === 'created_at' || key === 'updated_at') return null;
            return (
              <div key={key} style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", marginBottom: "6px", fontSize: "13px", color: "#2c1e14" }}>
                  {formatLabel(key)}
                </label>
                <input
                  type="text"
                  value={editingRow[key] || ''}
                  onChange={(e) => setEditingRow({ ...editingRow, [key]: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #e0d5c8",
                    borderRadius: "6px",
                    fontSize: "13px",
                    outline: "none",
                    transition: "all 0.2s"
                  }}
                  onFocus={(e) => e.target.style.borderColor = "#c9a87c"}
                  onBlur={(e) => e.target.style.borderColor = "#e0d5c8"}
                />
              </div>
            );
          })}
        </Modal>
      )}

      {/* Add Modal */}
      {addingNew && (
        <Modal
          title="Add New Record"
          onClose={() => setAddingNew(false)}
          onSubmit={handleCreate}
        >
          {Object.keys(newRecord).map(key => (
            <div key={key} style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", marginBottom: "6px", fontSize: "13px", color: "#2c1e14" }}>
                {formatLabel(key)}
              </label>
              <input
                type="text"
                value={newRecord[key] || ''}
                onChange={(e) => setNewRecord({ ...newRecord, [key]: e.target.value })}
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #e0d5c8",
                  borderRadius: "6px",
                  fontSize: "13px",
                  outline: "none",
                  transition: "all 0.2s"
                }}
                onFocus={(e) => e.target.style.borderColor = "#c9a87c"}
                onBlur={(e) => e.target.style.borderColor = "#e0d5c8"}
              />
            </div>
          ))}
        </Modal>
      )}

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

// ==================== MODAL COMPONENT ====================
const Modal = ({ title, children, onClose, onSubmit }: any) => (
  <div style={{
    position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
    background: "rgba(44, 30, 20, 0.5)",
    display: "flex", alignItems: "center", justifyContent: "center",
    zIndex: 1000,
    backdropFilter: "blur(4px)"
  }} onClick={onClose}>
    <div style={{
      background: "#ffffff",
      padding: "28px",
      borderRadius: "12px",
      width: "480px",
      maxWidth: "90%",
      boxShadow: "0 20px 40px rgba(44, 30, 20, 0.2)"
    }} onClick={(e) => e.stopPropagation()}>
      <h3 style={{ margin: "0 0 20px", fontSize: "18px", fontWeight: "600", color: "#2c1e14" }}>{title}</h3>
      {children}
      <div style={{ marginTop: "24px", display: "flex", justifyContent: "flex-end", gap: "12px" }}>
        <button onClick={onClose} style={{
          padding: "8px 20px",
          background: "#f5f0e8",
          border: "1px solid #e0d5c8",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "13px",
          color: "#2c1e14",
          transition: "all 0.2s"
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = "#e8e0d5"}
        onMouseLeave={(e) => e.currentTarget.style.background = "#f5f0e8"}
        >
          Cancel
        </button>
        <button onClick={onSubmit} style={{
          padding: "8px 24px",
          background: "#c9a87c",
          color: "#2c1e14",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "13px",
          fontWeight: "500",
          transition: "all 0.2s"
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = "#b89464"}
        onMouseLeave={(e) => e.currentTarget.style.background = "#c9a87c"}
        >
          Save
        </button>
      </div>
    </div>
  </div>
);