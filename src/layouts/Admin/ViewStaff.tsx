import { useState } from "react";
import { Component, type ReactNode } from "react";
import { Table } from "../Admin/AdminTable";
import type { Column } from "../Admin/AdminTable";
import {
  useGetAllAdminsQuery,
  useCreateAdminMutation,
  useDeleteAdminMutation,
  useActivateAdminMutation,
  useDeactivateAdminMutation,
} from "../../app/api/Auth/Admin";
import {
  useGetAllTaskersQuery,
  useCreateTaskerMutation,
  useDeleteTaskerMutation,
  useToggleActivateTaskerMutation,
} from "../../app/api/Auth/Tasker";
import type { Admin, CreateAdminRequest } from "../../app/api/Auth/Admin";
import type { Tasker, CreateTaskerRequest } from "../../app/api/Auth/Tasker";
import { Plus, X, ToggleLeft, ToggleRight, Users, Shield } from "lucide-react";

interface ApiError {
  status: number;
  data: { message?: string };
}

// check error

class ErrorBoundary extends Component<
  { children: ReactNode },
  { error: Error | null }
> {
  state = { error: null };
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 24, background: "#FEE2E2", borderRadius: 12 }}>
          <p style={{ color: "#7F1D1D", fontWeight: 700 }}>💥 Crash:</p>
          <pre
            style={{ fontSize: 12, color: "#991B1B", whiteSpace: "pre-wrap" }}
          >
            {(this.state.error as Error).message}
            {"\n"}
            {(this.state.error as Error).stack}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}
// ── Badge ──────────────────────────────────────────────────────────────────

function ActiveBadge({ active }: { active?: boolean }) {
  return (
    <span
      style={{
        background: active ? "#DCFCE7" : "#FEE2E2",
        color: active ? "#14532D" : "#7F1D1D",
        padding: "3px 10px",
        borderRadius: "999px",
        fontSize: "11px",
        fontWeight: 700,
      }}
    >
      {active ? "Active" : "Inactive"}
    </span>
  );
}

function RoleBadge({ role }: { role: string }) {
  return (
    <span
      style={{
        background: role === "SUPER_ADMIN" ? "#EDE9FE" : "#DBEAFE",
        color: role === "SUPER_ADMIN" ? "#4C1D95" : "#1E3A8A",
        padding: "3px 10px",
        borderRadius: "999px",
        fontSize: "11px",
        fontWeight: 700,
      }}
    >
      {role}
    </span>
  );
}

// ── Add Admin Modal ────────────────────────────────────────────────────────

function AddAdminModal({
  onClose,
  onSave,
  isLoading,
}: {
  onClose: () => void;
  onSave: (d: CreateAdminRequest) => void;
  isLoading: boolean;
}) {
  const [form, setForm] = useState<CreateAdminRequest>({
    fullName: "",
    email: "",
    password: "",
    role: "ADMIN",
  });

  const set = (k: keyof CreateAdminRequest, v: string) =>
    setForm((p) => ({ ...p, [k]: v }));

  const inputStyle = {
    width: "100%",
    padding: "9px 12px",
    borderRadius: "9px",
    border: "1px solid #BFDBFE",
    fontSize: "13px",
    color: "#1E3A8A",
    outline: "none",
    boxSizing: "border-box" as const,
    marginTop: "5px",
  };
  const labelStyle = {
    fontSize: "13px",
    fontWeight: 700,
    color: "#374151",
    display: "block",
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.35)",
        padding: "0 16px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "440px",
          backgroundColor: "#fff",
          borderRadius: "16px",
          overflow: "hidden",
          border: "1px solid #DBEAFE",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "16px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#EFF6FF",
            borderBottom: "1px solid #BFDBFE",
          }}
        >
          <span style={{ fontWeight: 700, fontSize: "15px", color: "#1E3A8A" }}>
            Add Admin
          </span>
          <button
            onClick={onClose}
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              border: "1px solid #DBEAFE",
              background: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <X size={13} color="#6B7280" />
          </button>
        </div>

        {/* Body — only ONE padding div */}
        <div style={{ padding: "20px" }}>
          <div style={{ marginBottom: "12px" }}>
            <label style={labelStyle}>Full Name</label>
            <input
              type="text"
              style={inputStyle}
              value={form.fullName}
              onChange={(e) => set("fullName", e.target.value)}
              placeholder="John Doe"
            />
          </div>
          <div style={{ marginBottom: "12px" }}>
            <label style={labelStyle}>Email</label>
            <input
              type="email"
              style={inputStyle}
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              placeholder="admin@example.com"
            />
          </div>
          <div style={{ marginBottom: "12px" }}>
            <label style={labelStyle}>Password</label>
            <input
              type="password"
              style={inputStyle}
              value={form.password}
              onChange={(e) => set("password", e.target.value)}
              placeholder="••••••••"
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label style={labelStyle}>Role</label>
            <select
              style={inputStyle}
              value={form.role}
              onChange={(e) =>
                set("role", e.target.value as "ADMIN" | "SUPER_ADMIN")
              }
            >
              <option value="ADMIN">ADMIN</option>
              <option value="SUPER_ADMIN">SUPER_ADMIN</option>
            </select>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={onClose}
              style={{
                flex: 1,
                padding: "10px",
                borderRadius: "10px",
                border: "1px solid #E5E7EB",
                background: "#fff",
                fontSize: "13px",
                fontWeight: 700,
                color: "#6B7280",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (!form.fullName.trim()) {
                  alert("Full name is required.");
                  return;
                }
                if (!form.email.trim()) {
                  alert("Email is required.");
                  return;
                }
                if (!form.password.trim()) {
                  alert("Password is required.");
                  return;
                }
                onSave(form);
              }}
              disabled={isLoading}
              style={{
                flex: 1,
                padding: "10px",
                borderRadius: "10px",
                border: "none",
                background: "#1E3A8A",
                fontSize: "13px",
                fontWeight: 700,
                color: "#fff",
                cursor: "pointer",
                opacity: isLoading ? 0.6 : 1,
              }}
            >
              {isLoading ? "Creating..." : "Create Admin"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Add Tasker Modal ───────────────────────────────────────────────────────

function AddTaskerModal({
  onClose,
  onSave,
  isLoading,
}: {
  onClose: () => void;
  onSave: (d: CreateTaskerRequest) => void;
  isLoading: boolean;
}) {
  const [form, setForm] = useState<CreateTaskerRequest>({
    name: "",
    phone: "",
    email: "",
    specialties: "",
    isActive: true,
  });
  const set = (k: keyof CreateTaskerRequest, v: string | boolean) =>
    setForm((p) => ({ ...p, [k]: v }));
  const inputStyle = {
    width: "100%",
    padding: "9px 12px",
    borderRadius: "9px",
    border: "1px solid #BFDBFE",
    fontSize: "13px",
    color: "#1E3A8A",
    outline: "none",
    boxSizing: "border-box" as const,
    marginTop: "5px",
  };
  const labelStyle = {
    fontSize: "13px",
    fontWeight: 700,
    color: "#374151",
    display: "block",
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.35)",
        padding: "0 16px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "440px",
          backgroundColor: "#fff",
          borderRadius: "16px",
          overflow: "hidden",
          border: "1px solid #DBEAFE",
        }}
      >
        <div
          style={{
            padding: "16px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#EFF6FF",
            borderBottom: "1px solid #BFDBFE",
          }}
        >
          <span style={{ fontWeight: 700, fontSize: "15px", color: "#1E3A8A" }}>
            Add Tasker
          </span>
          <button
            onClick={onClose}
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              border: "1px solid #DBEAFE",
              background: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <X size={13} color="#6B7280" />
          </button>
        </div>
        <div style={{ padding: "20px" }}>
          <div style={{ marginBottom: "12px" }}>
            <label style={labelStyle}>Full Name</label>
            <input
              type="text"
              style={inputStyle}
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="Jane Doe"
            />
          </div>
          <div style={{ marginBottom: "12px" }}>
            <label style={labelStyle}>Phone</label>
            <input
              type="tel"
              style={inputStyle}
              value={form.phone}
              onChange={(e) => set("phone", e.target.value)}
              placeholder="+250 7xx xxx xxx"
            />
          </div>
          <div style={{ marginBottom: "12px" }}>
            <label style={labelStyle}>Email</label>
            <input
              type="email"
              style={inputStyle}
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              placeholder="tasker@example.com"
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label style={labelStyle}>Specialties</label>
            <input
              type="text"
              style={inputStyle}
              value={form.specialties}
              onChange={(e) => set("specialties", e.target.value)}
              placeholder="e.g. Web, Design, Legal"
            />
          </div>
          <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
            <button
              onClick={onClose}
              style={{
                flex: 1,
                padding: "10px",
                borderRadius: "10px",
                border: "1px solid #E5E7EB",
                background: "#fff",
                fontSize: "13px",
                fontWeight: 700,
                color: "#6B7280",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
            <button
              onClick={() => onSave(form)}
              disabled={isLoading}
              style={{
                flex: 1,
                padding: "10px",
                borderRadius: "10px",
                border: "none",
                background: "#1E3A8A",
                fontSize: "13px",
                fontWeight: 700,
                color: "#fff",
                cursor: "pointer",
                opacity: isLoading ? 0.6 : 1,
              }}
            >
              {isLoading ? "Creating..." : "Create Tasker"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Tab ────────────────────────────────────────────────────────────────────

function Tab({
  label,
  icon,
  active,
  count,
  onClick,
}: {
  label: string;
  icon: React.ReactNode;
  active: boolean;
  count: number;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        padding: "10px 20px",
        borderRadius: "10px",
        border: "none",
        cursor: "pointer",
        background: active ? "#1E3A8A" : "#EFF6FF",
        color: active ? "#fff" : "#1E3A8A",
        fontSize: "13px",
        fontWeight: 700,
        transition: "all 0.15s",
      }}
    >
      {icon}
      {label}
      <span
        style={{
          background: active ? "rgba(255,255,255,0.25)" : "#BFDBFE",
          color: active ? "#fff" : "#1E3A8A",
          borderRadius: "999px",
          padding: "1px 8px",
          fontSize: "11px",
          fontWeight: 700,
        }}
      >
        {count}
      </span>
    </button>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────

export default function Staff() {
  const [activeTab, setActiveTab] = useState<"admins" | "taskers">("admins");
  const [showAddAdmin, setShowAddAdmin] = useState(false);
  const [showAddTasker, setShowAddTasker] = useState(false);

  const {
    data: adminsData,
    isLoading: adminsLoading,
    isError: adminsError,
  } = useGetAllAdminsQuery();
  const {
    data: taskersData,
    isLoading: taskersLoading,
    isError: taskersError,
  } = useGetAllTaskersQuery();

  const [createAdmin, { isLoading: isCreatingAdmin }] =
    useCreateAdminMutation();
  const [deleteAdmin] = useDeleteAdminMutation();
  const [activateAdmin] = useActivateAdminMutation();
  const [deactivateAdmin] = useDeactivateAdminMutation();

  const [createTasker, { isLoading: isCreatingTasker }] =
    useCreateTaskerMutation();
  const [deleteTasker] = useDeleteTaskerMutation();
  const [toggleTasker] = useToggleActivateTaskerMutation();

  const admins = adminsData ?? [];
  const taskers = taskersData ?? [];

  // Add these two lines temporarily right below the hooks
  // console.error(" Taskers error:", taskersErrorDetails);

  const handleCreateAdmin = async (data: CreateAdminRequest) => {
    try {
      await createAdmin(data).unwrap();
      setShowAddAdmin(false);
    } catch (err: unknown) {
      const e = err as ApiError;
      console.log("error is this", e);
      console.log(e?.data?.message ?? "Failed to create admin.");
      alert(e?.data?.message ?? "Failed to create admin.");
    }
  };

  const handleCreateTasker = async (data: CreateTaskerRequest) => {
    try {
      await createTasker(data).unwrap();
      console.log("tasker created",data)
      setShowAddTasker(false);
    } catch (err: unknown) {
      const e = err as ApiError;
      alert(e?.data?.message ?? "Failed to create tasker.");
    }
  };

  const handleToggleAdmin = async (row: Admin) => {
    try {
      if (row.isActive) await deactivateAdmin(row.id).unwrap();
      else await activateAdmin(row.id).unwrap();
    } catch {
      alert("Failed to toggle admin status.");
    }
  };

  const handleToggleTasker = async (id: number) => {
    try {
      await toggleTasker(id).unwrap();
    } catch {
      alert("Failed to toggle tasker status.");
    }
  };

  const adminColumns: Column<Admin>[] = [
    { key: "fullName", label: "Full Name" },
    { key: "email", label: "Email" },
    {
      key: "role",
      label: "Role",
      render: (row) => <RoleBadge role={row.role} />,
    },
    {
      key: "isActive",
      label: "Status",
      render: (row) => (
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <ActiveBadge active={row.isActive} />
          <button
            onClick={() => handleToggleAdmin(row)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
            }}
          >
            {row.isActive ? (
              <ToggleRight size={20} color="#1E3A8A" />
            ) : (
              <ToggleLeft size={20} color="#9CA3AF" />
            )}
          </button>
        </div>
      ),
    },
    {
      key: "createdAt",
      label: "Created",
      render: (row) => (
        <span style={{ fontSize: "13px", color: "#6B7280" }}>
          {row.createdAt
            ? new Date(row.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })
            : "—"}
        </span>
      ),
    },
  ];

  const taskerColumns: Column<Tasker>[] = [
    { key: "name", label: "Full Name" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "specialties", label: "Specialties" },
    {
      key: "isActive",
      label: "Status",
      render: (row) => (
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <ActiveBadge active={row.isActive} />
          <button
            onClick={() => handleToggleTasker(row.id)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
            }}
          >
            {row.isActive ? (
              <ToggleRight size={20} color="#1E3A8A" />
            ) : (
              <ToggleLeft size={20} color="#9CA3AF" />
            )}
          </button>
        </div>
      ),
    },
    {
      key: "createdAt",
      label: "Created",
      render: (row) => (
        <span style={{ fontSize: "13px", color: "#6B7280" }}>
          {row.createdAt
            ? new Date(row.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })
            : "—"}
        </span>
      ),
    },
  ];

  return (
    <div className="w-full min-w-0">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-family-playfair font-bold text-[#1E3A8A] text-[20px]">
            Staff Management
          </h1>
          <p className="font-family-playfair text-gray-500 text-[13px] mt-1">
            Manage admins and taskers
          </p>
        </div>
        <button
          onClick={() =>
            activeTab === "admins"
              ? setShowAddAdmin(true)
              : setShowAddTasker(true)
          }
          style={{
            display: "flex",
            alignItems: "center",
            gap: "7px",
            padding: "10px 18px",
            background: "#1E3A8A",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            fontSize: "13px",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          <Plus size={15} />
          {activeTab === "admins" ? "Add Admin" : "Add Tasker"}
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <Tab
          label="Admins"
          icon={<Shield size={14} />}
          active={activeTab === "admins"}
          count={admins.length}
          onClick={() => setActiveTab("admins")}
        />
        <Tab
          label="Taskers"
          icon={<Users size={14} />}
          active={activeTab === "taskers"}
          count={taskers.length}
          onClick={() => setActiveTab("taskers")}
        />
      </div>

      {/* Error */}
      {(adminsError || taskersError) && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-5 py-4 mb-5">
          <p className="font-family-playfair text-red-600 text-[13px]">
            Failed to load staff. Please try again.
          </p>
        </div>
      )}

      {/* Table */}
      <ErrorBoundary>
        {activeTab === "admins" ? (
          <Table
            columns={adminColumns}
            data={admins}
            itemsPerPage={13}
            isLoading={adminsLoading}
            onDelete={(row) => deleteAdmin(row.id)}
          />
        ) : (
          <Table
            columns={taskerColumns}
            data={taskers}
            itemsPerPage={13}
            isLoading={taskersLoading}
            onDelete={(row) => deleteTasker(row.id)}
          />
        )}
      </ErrorBoundary>

      {showAddAdmin && (
        <AddAdminModal
          onClose={() => setShowAddAdmin(false)}
          onSave={handleCreateAdmin}
          isLoading={isCreatingAdmin}
        />
      )}
      {showAddTasker && (
        <AddTaskerModal
          onClose={() => setShowAddTasker(false)}
          onSave={handleCreateTasker}
          isLoading={isCreatingTasker}
        />
      )}
    </div>
  );
}
