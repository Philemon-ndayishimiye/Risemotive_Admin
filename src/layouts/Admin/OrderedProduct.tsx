import { useState } from "react";
import { Table } from "../Admin/AdminTable";
import type { Column } from "../Admin/AdminTable";

import {
  useGetAllOrdersQuery,
  useDeleteOrderMutation,
  useUpdateOrderMutation,
} from "../../app/api/ProductSpot/Order";

import type { Order } from "../../app/api/ProductSpot/Order";

import { X } from "lucide-react";

// ── Status Badge ───────────────────────────────────────────────────────────

const StatusBadge = ({ status }: { status?: string }) => {
  const map: Record<string, { bg: string; color: string }> = {
    PENDING: { bg: "#FEF9C3", color: "#92400E" },
    PROCESSING: { bg: "#DBEAFE", color: "#1E3A8A" },
    SHIPPED: { bg: "#DCFCE7", color: "#14532D" },
    DELIVERED: { bg: "#D1FAE5", color: "#065F46" },
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

// ── Product Preview ────────────────────────────────────────────────────────

const ProductCell = ({ product }: { product?: Order["product"] }) => {
  if (!product) return <span style={{ color: "#9CA3AF" }}>—</span>;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <img
        src={product.imageUrl}
        alt={product.name}
        style={{
          width: 30,
          height: 30,
          borderRadius: 6,
          objectFit: "cover",
        }}
      />
      <span style={{ fontSize: "12px", fontWeight: 600 }}>{product.name}</span>
    </div>
  );
};

// ── Status Modal ───────────────────────────────────────────────────────────

function StatusModal({
  row,
  onClose,
  onSave,
  isLoading,
}: {
  row: Order;
  onClose: () => void;
  onSave: (id: number, status: string) => void;
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
            justifyContent: "space-between",
            backgroundColor: "#EFF6FF",
            borderBottom: "1px solid #BFDBFE",
          }}
        >
          <span style={{ fontWeight: 700, fontSize: "15px", color: "#1E3A8A" }}>
            Update Order Status
          </span>

          <button onClick={onClose}>
            <X size={14} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: "20px" }}>
          <p style={{ fontSize: "13px" }}>
            Tracking: <b>{row.trackingCode}</b>
          </p>

          <label style={{ fontSize: "13px", fontWeight: 700 }}>Status</label>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            style={{
              width: "100%",
              marginTop: "8px",
              padding: "10px",
              borderRadius: "10px",
              border: "1px solid #BFDBFE",
            }}
          >
            <option value="PENDING">PENDING</option>
            <option value="CONFIRMED">CONFIRMED</option>
            <option value="OUT_FOR_DELIVERY">OUT FOR DELIVERY</option>
            <option value="DELIVERED">DELIVERED</option>
            <option value="CANCELLED">CANCELLED</option>
          </select>

          <div style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
            <button onClick={onClose} style={{ flex: 1 }}>
              Cancel
            </button>

            <button
              onClick={() => onSave(row.id, status)}
              disabled={isLoading}
              style={{
                flex: 1,
                background: "#1E3A8A",
                color: "#fff",
                borderRadius: "10px",
              }}
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── MAIN COMPONENT ─────────────────────────────────────────────────────────

export default function OrderAdmin() {
  const { data, isLoading, isError } = useGetAllOrdersQuery();

  const [deleteOrder] = useDeleteOrderMutation();
  const [updateOrder, { isLoading: isUpdating }] = useUpdateOrderMutation();

  const [editRow, setEditRow] = useState<Order | null>(null);

  const items = data?.items ?? [];
  const total = data?.total ?? 0;

  const handleDelete = async (row: Order) => {
    await deleteOrder(row.id).unwrap();
  };

  const handleStatusSave = async (id: number, status: string) => {
    try {
      const res = await updateOrder({ id, status }).unwrap();
      console.log(" SUCCESS:", res);
    } catch (err) {
      console.error(" UPDATE ERROR:", err);
    }
  };

  const columns: Column<Order>[] = [
    { key: "trackingCode", label: "Tracking Code" },
    { key: "customerName", label: "Name" },
    { key: "customerEmail", label: "Email" },
    { key: "customerPhone", label: "Phone" },
    { key: "paymentMethod", label: "Payment" },
    {
      key: "product",
      label: "Product",
      render: (row) => <ProductCell product={row.product} />,
    },
    { key: "totalPrice", label: "totalPrice" },
    { key: "quantity", label: "Qty" },
    {
      key: "status",
      label: "Status",
      render: (row) => <StatusBadge status={row.status} />,
    },
    {
      key: "createdAt",
      label: "Date",
      render: (row) => (
        <span style={{ fontSize: "12px", color: "#6B7280" }}>
          {new Date(row.createdAt).toLocaleDateString()}
        </span>
      ),
    },
  ];

  return (
    <div className="w-full min-w-0">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-[20px] font-bold text-[#1E3A8A]">
          Orders Management
        </h1>
        <p className="text-[13px] text-gray-500">
          Total: <b className="text-[#1E3A8A]">{total}</b> orders
        </p>
      </div>

      {/* Error */}
      {isError && (
        <div className="bg-red-50 p-4 rounded-xl text-red-600 mb-4">
          Failed to load orders
        </div>
      )}

      {/* Table */}
      <Table
        columns={columns}
        data={items}
        itemsPerPage={10}
        isLoading={isLoading}
        onEdit={(row) => setEditRow(row)}
        onDelete={handleDelete}
      />

      {/* Modal */}
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
