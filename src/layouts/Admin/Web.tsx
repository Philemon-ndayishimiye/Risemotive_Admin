import { useState } from "react";
import { Table } from "../Admin/AdminTable";
import type { Column } from "../Admin/AdminTable";
import {
  useGetAllWebRequestsQuery,
  useDeleteWebRequestMutation,
  useUpdateWebRequestMutation,
} from "../../app/api/Taskspot/Web";
import type { ServiceRequest } from "../../app/api/Taskspot/Web";
import { FileText, ExternalLink, X } from "lucide-react";

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

const FileLink = ({ url }: { url?: string }) => {
  if (!url) return <span style={{ color: "#9CA3AF" }}>—</span>;
  const fullUrl = url.startsWith("http")
    ? url
    : `https://risemotive.onrender.com/${url.replace(/^\/+/, "")}`;
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

export default function WebAdmin() {
  const { data, isLoading, isError } = useGetAllWebRequestsQuery();
  const [deleteRequest] = useDeleteWebRequestMutation();
  const [updateRequest, { isLoading: isUpdating }] =
    useUpdateWebRequestMutation();

  const [editRow, setEditRow] = useState<ServiceRequest | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const items = data?.items ?? [];
  const total = data?.total ?? 0;

  const handleEdit = (row: ServiceRequest) => setEditRow(row);

  const handleDelete = async (row: ServiceRequest) => {
    setDeleteError(null);
    try {
      await deleteRequest(row.id).unwrap();
    } catch {
      setDeleteError("Failed to delete request. Please try again.");
    }
  };

  const handleStatusSave = async (id: number | string, status: string) => {
    await updateRequest({ id, status }).unwrap();
    setEditRow(null);
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
    {
      key: "createdAt",
      label: "Date Created",
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
      <div className="mb-6">
        <h1 className="font-family-playfair font-bold text-[#1E3A8A] text-[20px]">
          Web and Digital Solution
        </h1>
        <p className="font-family-playfair text-gray-500 text-[13px] mt-1">
          Total: <span className="font-bold text-[#1E3A8A]">{total}</span>{" "}
          requests
        </p>
      </div>

      {isError && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-5 py-4 mb-5">
          <p className="font-family-playfair text-red-600 text-[13px]">
            Failed to load requests. Please try again.
          </p>
        </div>
      )}

      {deleteError && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-5 py-4 mb-5">
          <p className="text-red-600 text-[13px]">{deleteError}</p>
        </div>
      )}

      <Table
        columns={columns}
        data={items}
        itemsPerPage={13}
        isLoading={isLoading}
        onEdit={handleEdit}
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
