import { useEffect, useState } from "react";
import { getTable, deleteRecord, updateRecord, createRecord } from "../../services/api";

interface Props {
  table: string;
}

interface Record {
  id: number;
  [key: string]: any;
}

export default function AdminTables({ table }: Props) {
  const [data, setData] = useState<Record[]>([]);
  const [editingRow, setEditingRow] = useState<Record | null>(null);
  const [addingNew, setAddingNew] = useState<boolean>(false);
  const [newRecord, setNewRecord] = useState<Partial<Record>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error'} | null>(null);

  const loadData = async (): Promise<void> => {
    setLoading(true);
    try {
      const res = await getTable(table);
      setData(res.data);
    } catch (error) {
      console.error("Error loading data:", error);
      showNotification("Failed to load data! Please refresh the page.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [table]);

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const remove = async (id: number): Promise<void> => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;
    
    try {
      await deleteRecord(table, id);
      await loadData();
      showNotification("Record deleted successfully!", "success");
    } catch (error) {
      console.error("Error deleting record:", error);
      showNotification("Delete failed! Please try again.", "error");
    }
  };

  const handleUpdate = async (): Promise<void> => {
    if (!editingRow) return;
    
    try {
      await updateRecord(table, editingRow.id, editingRow);
      setEditingRow(null);
      await loadData();
      showNotification("Record updated successfully!", "success");
    } catch (error) {
      console.error("Error updating record:", error);
      showNotification("Update failed! Please try again.", "error");
    }
  };

  const handleCreate = async (): Promise<void> => {
    try {
      await createRecord(table, newRecord);
      setAddingNew(false);
      setNewRecord({});
      await loadData();
      showNotification("Record created successfully!", "success");
    } catch (error) {
      console.error("Error creating record:", error);
      showNotification("Create failed! Please try again.", "error");
    }
  };

  const handleInputChange = (key: string, value: string, isNew: boolean = false): void => {
    if (isNew) {
      setNewRecord({
        ...newRecord,
        [key]: value
      });
    } else if (editingRow) {
      setEditingRow({
        ...editingRow,
        [key]: value
      });
    }
  };

  const formatKey = (key: string): string => {
    return key
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const getColumnType = (key: string, value: any): string => {
    if (key.includes('image') || key.includes('img') || key.includes('photo')) return 'file';
    if (key.includes('date') || key.includes('created_at') || key.includes('updated_at')) return 'datetime-local';
    if (key.includes('email')) return 'email';
    if (key.includes('password')) return 'password';
    if (key.includes('url') || key.includes('link')) return 'url';
    if (key.includes('phone') || key.includes('mobile')) return 'tel';
    if (key.includes('order') || key.includes('sort')) return 'number';
    if (typeof value === 'number') return 'number';
    return 'text';
  };

  const filteredData = data.filter(row => {
    if (!searchTerm) return true;
    return Object.values(row).some(val => 
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const toggleRowSelection = (id: number) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  const toggleAllRows = () => {
    if (selectedRows.length === filteredData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredData.map(row => row.id));
    }
  };

  const bulkDelete = async () => {
    if (selectedRows.length === 0) return;
    if (!window.confirm(`Are you sure you want to delete ${selectedRows.length} records?`)) return;
    
    try {
      await Promise.all(selectedRows.map(id => deleteRecord(table, id)));
      setSelectedRows([]);
      await loadData();
      showNotification(`${selectedRows.length} records deleted successfully!`, "success");
    } catch (error) {
      console.error("Error bulk deleting:", error);
      showNotification("Bulk delete failed! Please try again.", "error");
    }
  };

  return (
    <div style={{ position: "relative" }}>
      {/* Notification */}
      {notification && (
        <div style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          padding: "12px 24px",
          backgroundColor: notification.type === 'success' ? '#10b981' : '#ef4444',
          color: 'white',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          zIndex: 2000,
          animation: 'slideIn 0.3s ease'
        }}>
          {notification.message}
        </div>
      )}

      {/* Header with Search and Add Button */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "25px",
        flexWrap: "wrap",
        gap: "15px"
      }}>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <div style={{ position: "relative", width: "300px" }}>
            <input
              type="text"
              placeholder="Search records..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 15px 10px 40px",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                fontSize: "14px",
                outline: "none",
                transition: "border-color 0.3s"
              }}
              onFocus={(e) => e.target.style.borderColor = "#3b82f6"}
              onBlur={(e) => e.target.style.borderColor = "#e2e8f0"}
            />
            <span style={{
              position: "absolute",
              left: "12px",
              top: "10px",
              color: "#94a3b8"
            }}>🔍</span>
          </div>
          
          {selectedRows.length > 0 && (
            <button
              onClick={bulkDelete}
              style={{
                padding: "10px 20px",
                backgroundColor: "#ef4444",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "500",
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}
            >
              <span>🗑️</span> Delete Selected ({selectedRows.length})
            </button>
          )}
        </div>
        
        <button
          onClick={() => {
            setAddingNew(true);
            // Initialize with empty values based on first record
            if (data[0]) {
              const emptyRecord: Partial<Record> = {};
              Object.keys(data[0]).forEach(key => {
                if (key !== 'id' && key !== 'created_at' && key !== 'updated_at') {
                  emptyRecord[key] = '';
                }
              });
              setNewRecord(emptyRecord);
            }
          }}
          style={{
            padding: "10px 20px",
            backgroundColor: "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "500",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            transition: "all 0.3s"
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#2563eb"}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#3b82f6"}
        >
          <span style={{ fontSize: "18px" }}>+</span> Add New Record
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div style={{ textAlign: "center", padding: "60px" }}>
          <div style={{
            display: "inline-block",
            width: "40px",
            height: "40px",
            border: "3px solid #f3f3f3",
            borderTop: "3px solid #3b82f6",
            borderRadius: "50%",
            animation: "spin 1s linear infinite"
          }} />
          <p style={{ marginTop: "15px", color: "#64748b" }}>Loading data...</p>
        </div>
      )}

      {/* Table */}
      {!loading && filteredData.length === 0 ? (
        <div style={{
          textAlign: "center",
          padding: "80px 20px",
          backgroundColor: "#f8fafc",
          borderRadius: "12px",
          border: "2px dashed #e2e8f0"
        }}>
          <span style={{ fontSize: "56px", display: "block", marginBottom: "20px" }}>📊</span>
          <h3 style={{ color: "#1e293b", marginBottom: "10px", fontSize: "20px" }}>No Records Found</h3>
          <p style={{ color: "#64748b", marginBottom: "20px" }}>
            {searchTerm ? "No matching records found. Try a different search term." : "No records in this table yet."}
          </p>
          <button
            onClick={() => setAddingNew(true)}
            style={{
              padding: "10px 24px",
              backgroundColor: "#3b82f6",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "500"
            }}
          >
            + Add Your First Record
          </button>
        </div>
      ) : (
        <div style={{
          overflowX: "auto",
          borderRadius: "12px",
          border: "1px solid #e2e8f0",
          boxShadow: "0 4px 6px rgba(0,0,0,0.02)"
        }}>
          <table style={{ 
            width: "100%", 
            borderCollapse: "collapse",
            backgroundColor: "white",
            fontSize: "14px"
          }}>
            <thead>
              <tr style={{ 
                backgroundColor: "#f8fafc",
                borderBottom: "2px solid #e2e8f0"
              }}>
                <th style={{ padding: "15px", width: "40px" }}>
                  <input
                    type="checkbox"
                    checked={selectedRows.length === filteredData.length && filteredData.length > 0}
                    onChange={toggleAllRows}
                    style={{
                      width: "18px",
                      height: "18px",
                      cursor: "pointer"
                    }}
                  />
                </th>
                {data[0] &&
                  Object.keys(data[0]).map((key) => (
                    <th 
                      key={key}
                      style={{ 
                        padding: "15px",
                        textAlign: "left",
                        color: "#475569",
                        fontWeight: "600",
                        fontSize: "13px",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px"
                      }}
                    >
                      {formatKey(key)}
                    </th>
                  ))}
                <th style={{ 
                  padding: "15px", 
                  textAlign: "center",
                  color: "#475569",
                  fontWeight: "600",
                  fontSize: "13px",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  width: "140px"
                }}>
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredData.map((row, index) => (
                <tr 
                  key={row.id}
                  style={{ 
                    borderBottom: "1px solid #e2e8f0",
                    backgroundColor: selectedRows.includes(row.id) ? '#eff6ff' : (index % 2 === 0 ? "white" : "#fafbfc"),
                    transition: "background-color 0.2s"
                  }}
                >
                  <td style={{ padding: "15px", textAlign: "center" }}>
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(row.id)}
                      onChange={() => toggleRowSelection(row.id)}
                      style={{
                        width: "18px",
                        height: "18px",
                        cursor: "pointer"
                      }}
                    />
                  </td>
                  {Object.entries(row).map(([key, val], i) => {
                    const isImage = key.includes('image') || key.includes('img') || key.includes('photo');
                    const isLongText = String(val).length > 50;
                    
                    return (
                      <td 
                        key={i}
                        style={{ 
                          padding: "15px",
                          color: "#1e293b",
                          maxWidth: isImage ? "100px" : "300px"
                        }}
                      >
                        {isImage && val ? (
                          <img 
                            src={val} 
                            alt={key}
                            style={{
                              width: "50px",
                              height: "50px",
                              objectFit: "cover",
                              borderRadius: "6px",
                              border: "1px solid #e2e8f0"
                            }}
                          />
                        ) : isLongText ? (
                          <span title={String(val)}>
                            {String(val).substring(0, 50)}...
                          </span>
                        ) : (
                          <span title={String(val)}>
                            {val !== null && val !== undefined ? 
                              (typeof val === 'boolean' ? (val ? '✓' : '✗') : String(val)) 
                              : '-'}
                          </span>
                        )}
                      </td>
                    );
                  })}

                  <td style={{ padding: "15px", textAlign: "center" }}>
                    <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
                      <button
                        onClick={() => setEditingRow(row)}
                        style={{
                          padding: "8px 16px",
                          backgroundColor: "#3b82f6",
                          color: "white",
                          border: "none",
                          borderRadius: "6px",
                          cursor: "pointer",
                          fontSize: "13px",
                          fontWeight: "500",
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          transition: "all 0.2s"
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#2563eb"}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#3b82f6"}
                      >
                        <span></span> Edit
                      </button>

                      <button
                        onClick={() => remove(row.id)}
                        style={{
                          padding: "8px 16px",
                          backgroundColor: "#ef4444",
                          color: "white",
                          border: "none",
                          borderRadius: "6px",
                          cursor: "pointer",
                          fontSize: "13px",
                          fontWeight: "500",
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          transition: "all 0.2s"
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#dc2626"}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#ef4444"}
                      >
                        <span></span> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Modal */}
      {editingRow && (
        <Modal
          title="Edit Record"
          onClose={() => setEditingRow(null)}
          onSubmit={handleUpdate}
          submitText="Update Changes"
        >
          {Object.keys(editingRow).map((key) => {
            if (key === "id" || key === "created_at" || key === "updated_at") return null;

            return (
              <FormField
                key={key}
                label={formatKey(key)}
                type={getColumnType(key, editingRow[key])}
                value={editingRow[key]}
                onChange={(value) => handleInputChange(key, value, false)}
              />
            );
          })}
        </Modal>
      )}

      {/* Add New Modal */}
      {addingNew && (
        <Modal
          title={`Add New ${formatKey(table)} Record`}
          onClose={() => {
            setAddingNew(false);
            setNewRecord({});
          }}
          onSubmit={handleCreate}
          submitText="Create Record"
        >
          {Object.keys(newRecord).map((key) => (
            <FormField
              key={key}
              label={formatKey(key)}
              type={getColumnType(key, newRecord[key])}
              value={newRecord[key]}
              onChange={(value) => handleInputChange(key, value, true)}
            />
          ))}
        </Modal>
      )}

      {/* Styles */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

// Modal Component
const Modal = ({ title, children, onClose, onSubmit, submitText }: any) => (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
      backdropFilter: "blur(4px)"
    }}
    onClick={onClose}
  >
    <div
      style={{
        background: "white",
        padding: "30px",
        width: "550px",
        maxHeight: "85vh",
        overflowY: "auto",
        borderRadius: "16px",
        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)"
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "25px",
        borderBottom: "1px solid #e2e8f0",
        paddingBottom: "15px"
      }}>
        <h3 style={{ 
          margin: 0,
          color: "#1e293b",
          fontSize: "20px",
          fontWeight: "600"
        }}>
          {title}
        </h3>
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            fontSize: "24px",
            cursor: "pointer",
            color: "#64748b",
            width: "32px",
            height: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "6px",
            transition: "all 0.2s"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#f1f5f9";
            e.currentTarget.style.color = "#1e293b";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = "#64748b";
          }}
        >
          ✕
        </button>
      </div>

      {children}

      <div style={{ 
        marginTop: "30px", 
        display: "flex",
        justifyContent: "flex-end",
        gap: "12px",
        borderTop: "1px solid #e2e8f0",
        paddingTop: "20px"
      }}>
        <button
          onClick={onClose}
          style={{
            padding: "10px 20px",
            backgroundColor: "white",
            color: "#64748b",
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "500",
            transition: "all 0.2s"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#f1f5f9";
            e.currentTarget.style.borderColor = "#cbd5e0";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "white";
            e.currentTarget.style.borderColor = "#e2e8f0";
          }}
        >
          Cancel
        </button>

        <button
          onClick={onSubmit}
          style={{
            padding: "10px 24px",
            backgroundColor: "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "500",
            transition: "all 0.2s"
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#2563eb"}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#3b82f6"}
        >
          {submitText}
        </button>
      </div>
    </div>
  </div>
);

// FormField Component
const FormField = ({ label, type, value, onChange }: any) => (
  <div style={{ marginBottom: "20px" }}>
    <label 
      style={{ 
        display: "block", 
        marginBottom: "8px",
        color: "#475569",
        fontWeight: "500",
        fontSize: "14px"
      }}
    >
      {label}
    </label>

    {type === 'boolean' ? (
      <select
        value={value ? "true" : "false"}
        onChange={(e) => onChange(e.target.value === "true")}
        style={{
          width: "100%",
          padding: "10px",
          border: "1px solid #e2e8f0",
          borderRadius: "8px",
          fontSize: "14px",
          outline: "none",
          backgroundColor: "white"
        }}
      >
        <option value="true">True</option>
        <option value="false">False</option>
      </select>
    ) : type === 'textarea' ? (
      <textarea
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        style={{
          width: "100%",
          padding: "10px",
          border: "1px solid #e2e8f0",
          borderRadius: "8px",
          fontSize: "14px",
          outline: "none",
          fontFamily: "inherit",
          resize: "vertical"
        }}
      />
    ) : (
      <input
        type={type}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          border: "1px solid #e2e8f0",
          borderRadius: "8px",
          fontSize: "14px",
          outline: "none",
          transition: "border-color 0.2s"
        }}
        onFocus={(e) => e.target.style.borderColor = "#3b82f6"}
        onBlur={(e) => e.target.style.borderColor = "#e2e8f0"}
      />
    )}
  </div>
);