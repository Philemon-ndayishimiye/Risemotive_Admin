import { useState } from "react";
import { Table } from "../Admin/AdminTable";
import type { Column } from "../Admin/AdminTable";
import {
  useGetAllServiceRequestsQuery,
  useDeleteServiceRequestMutation,
  useUpdateServiceRequestMutation,
} from "../../app/api/Taskspot/government"; // adjust if different path
import type { ServiceRequest } from "../../app/api/Taskspot/Application";
import { FileText, ExternalLink, X } from "lucide-react";

// ── Status Badge ─────────────────────────────────────────

const StatusBadge = ({ status }: { status?: string }) => {
  const map: Record<string, { bg: string; color: string }> = {
    PENDING: { bg: "#FEF9C3", color: "#92400E" },
    IN_PROGRESS: { bg: "#DBEAFE", color: "#1E3A8A" },
    COMPLETED: { bg: "#DCFCE7", color: "#14532D" },
    CANCELLED: { bg: "#FEE2E2", color: "#7F1D1D" },
  };

  const s = status ?? "PENDING";
  const style = map[s] ?? map["PENDING"];

  return (
    <span
      style={{
        background: style.bg,
        color: style.color,
        padding: "3px 10px",
        borderRadius: "999px",
        fontSize: "11px",
        fontWeight: 700,
      }}
    >
      {s}
    </span>
  );
};

// ── File Link ────────────────────────────────────────────

const FileLink = ({ url }: { url?: string }) => {
  if (!url) return <span style={{ color: "#9CA3AF" }}>—</span>;

  const fullUrl = url.startsWith("http")
    ? url
    : `https://risemotive.onrender.com/${url.replace(/^\/+/, "")}`;

  // ✅ must return JSX, not { fullUrl: string }
  return (
    <a
      href={fullUrl}
      target="_blank"
      rel="noreferrer"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
        color: "#1E3A8A",
        fontSize: "12px",
        fontWeight: 600,
        background: "#EFF6FF",
        border: "1px solid #BFDBFE",
        borderRadius: "6px",
        padding: "3px 8px",
        textDecoration: "none",
      }}
    >
      <FileText size={12} />
      Open
      <ExternalLink size={10} />
    </a>
  );
};

// ── Status Modal ─────────────────────────────────────────

function StatusModal({
  row,
  onClose,
  onSave,
  isLoading,
}: {
  row: ServiceRequest;
  onClose: () => void;
  onSave: (id: number | string, status: string) => void;
  isLoading: boolean;
}) {
  const [status, setStatus] = useState(row.status ?? "PENDING");

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
          maxWidth: "400px",
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
            Update Status
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

        {/* Body */}
        <div style={{ padding: "20px" }}>
          <p
            style={{ fontSize: "13px", color: "#6B7280", marginBottom: "8px" }}
          >
            Tracking Code:{" "}
            <strong style={{ color: "#1E3A8A" }}>{row.trackingCode}</strong>
          </p>
          <p
            style={{ fontSize: "13px", color: "#6B7280", marginBottom: "16px" }}
          >
            Customer:{" "}
            <strong style={{ color: "#374151" }}>{row.customerName}</strong>
          </p>

          <label
            style={{ fontSize: "13px", fontWeight: 700, color: "#374151" }}
          >
            Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            style={{
              width: "100%",
              marginTop: "6px",
              padding: "10px 12px",
              borderRadius: "10px",
              border: "1px solid #BFDBFE",
              fontSize: "13px",
              color: "#1E3A8A",
              outline: "none",
              marginBottom: "20px",
            }}
          >
            <option value="PENDING">PENDING</option>
            <option value="IN_PROGRESS">IN_PROGRESS</option>
            <option value="COMPLETED">COMPLETED</option>
            <option value="CANCELLED">CANCELLED</option>
          </select>

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
              onClick={() => onSave(row.id, status)}
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
              {isLoading ? "Saving..." : "Save Status"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── MAIN COMPONENT ──────────────────────────────────────

export default function GovernmentDashboard() {
  const { data, isLoading, isError } = useGetAllServiceRequestsQuery();

  const [deleteRequest] = useDeleteServiceRequestMutation();
  const [updateRequest, { isLoading: isUpdating }] =
    useUpdateServiceRequestMutation();

  const [editRow, setEditRow] = useState<ServiceRequest | null>(null);

  const items = data?.items ?? [];
  const total = data?.total ?? 0;

  const handleDelete = async (row: ServiceRequest) => {
    await deleteRequest(row.id).unwrap();
  };

  const handleStatusSave = async (id: string | number, status: string) => {
    await updateRequest({
      id,
      status,
    }).unwrap();
  };

  const columns: Column<ServiceRequest>[] = [
    { key: "trackingCode", label: "Tracking Code" },
    { key: "customerName", label: "Customer Name" },
    { key: "customerPhone", label: "Phone" },
    { key: "customerEmail", label: "Email" },
    { key: "service", label: "Service" },
    { key: "tasker", label: "Tasker" },
    { key: "preferredDate", label: "Preferred Date" },
    {
      key: "documentUrl",
      label: "Document",
      render: (row) => <FileLink url={row.documentUrl} />,
    },
    {
      key: "status",
      label: "Status",
      render: (row) => <StatusBadge status={row.status} />,
    },
  ];

  return (
    <div className="">
      <h1 className="text-xl font-bold text-blue-900 mb-2">
        Government Dashboard
      </h1>

      <p className="text-sm text-gray-500 mb-4">
        Total: <strong>{total}</strong> requests
      </p>

      {isError && <p className="text-red-500">Failed to load data</p>}

      <Table
        columns={columns}
        data={items}
        isLoading={isLoading}
        onEdit={(row) => setEditRow(row)}
        onDelete={handleDelete}
      />

      {editRow && (
        <StatusModal
          row={editRow}
          onClose={() => setEditRow(null)}
          onSave={handleStatusSave}
          isLoading={isUpdating}
        />
      )}
    </div>
  );
}
