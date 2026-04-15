import { useState } from "react";
import { Table } from "../Admin/AdminTable";
import type { Column } from "../Admin/AdminTable";

import {
  useGetAllTrainingRequestsQuery,
  useDeleteTrainingRequestMutation,
  useUpdateTrainingRequestMutation,
} from "../../app/api/Taskspot/training";

import type { TrainingRequest } from "../../app/api/Taskspot/training";

import { X } from "lucide-react";

// ── Status Badge (optional if you add status later) ───────────────

// ── Modal ─────────────────────────────────────────────

function TrainingModal({
  row,
  onClose,
  onSave,
  isLoading,
}: {
  row: TrainingRequest;
  onClose: () => void;
  onSave: (data: TrainingRequest) => void;
  isLoading: boolean;
}) {
  const [form, setForm] = useState({
    fullName: row.fullName,
    phone: row.phone,
    email: row.email,
    selectedCourse: row.selectedCourse,
    preferredSchedule: row.preferredSchedule,
    experienceLevel: row.experienceLevel,
  });

  const handleChange = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
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
          maxWidth: "500px",
          backgroundColor: "#fff",
          borderRadius: "16px",
          border: "1px solid #DBEAFE",
          overflow: "hidden",
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
          <span style={{ fontWeight: 700, color: "#1E3A8A" }}>
            Edit Training Request
          </span>

          <button
            onClick={onClose}
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              border: "1px solid #DBEAFE",
              background: "#fff",
              cursor: "pointer",
            }}
          >
            <X size={13} />
          </button>
        </div>

        {/* Body */}
        <div
          style={{
            padding: "18px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <input
            value={form.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            placeholder="Full Name"
            className="border border-gray-100 rounded-[15px] text-[13px] text-gray-600 py-2 px-3"
          />

          <input
            value={form.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="Phone"
             className="border border-gray-100 rounded-[15px] text-[13px] text-gray-600 py-2 px-3"
          />

          <input
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="Email"
             className="border border-gray-100 rounded-[15px] text-[13px] text-gray-600 py-2 px-3"
          />

          <input
            value={form.selectedCourse}
            onChange={(e) => handleChange("selectedCourse", e.target.value)}
            placeholder="Course"
             className="border border-gray-100 rounded-[15px] text-[13px] text-gray-600 py-2 px-3"
          />

          <input
            value={form.preferredSchedule}
            onChange={(e) => handleChange("preferredSchedule", e.target.value)}
            placeholder="Preferred Schedule"
             className="border border-gray-100 rounded-[15px] text-[13px] text-gray-600 py-2 px-3"
          />

          <input
            value={form.experienceLevel}
            onChange={(e) => handleChange("experienceLevel", e.target.value)}
            placeholder="Experience Level"
             className="border border-gray-100 rounded-[15px] text-[13px] text-gray-600 py-2 px-3"
          />

          {/* Buttons */}
          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <button
              onClick={onClose}
              style={{
                flex: 1,
                padding: "10px",
                borderRadius: "10px",
                cursor :"pointer",
                border: "1px solid #E5E7EB",
              }}
            >
              Cancel
            </button>

            <button
              onClick={() => onSave({ ...row, ...form })}
              disabled={isLoading}
              style={{
                flex: 1,
                padding: "10px",
                cursor :"pointer",
                borderRadius: "10px",
                background: "#1E3A8A",
                color: "#fff",
                fontWeight: 700,
                opacity: isLoading ? 0.6 : 1,
              }}
            >
              {isLoading ? "Updating..." : "Update"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── PAGE ─────────────────────────────────────────────

export default function Training() {
  const { data, isLoading, isError } = useGetAllTrainingRequestsQuery();

  const [deleteRequest] = useDeleteTrainingRequestMutation();
  const [updateRequest, { isLoading: isUpdating }] =
    useUpdateTrainingRequestMutation();

  const [selectedRow, setSelectedRow] = useState<TrainingRequest | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const items = data?.items ?? [];
  const total = data?.total ?? 0;

  const handleDelete = async (row: TrainingRequest) => {
    setDeleteError(null);
    try {
      await deleteRequest(row.id).unwrap();
    } catch {
      setDeleteError("Failed to delete training request.");
    }
  };

  const handleUpdate = async (data: TrainingRequest) => {
    await updateRequest({
      id: data.id,
      fullName: data.fullName,
      phone: data.phone,
      email: data.email,
      selectedCourse: data.selectedCourse,
      preferredSchedule: data.preferredSchedule,
      experienceLevel: data.experienceLevel,
    }).unwrap();

    setSelectedRow(null);
  };

  const handleView = (row: TrainingRequest) => {
    setSelectedRow(row);
  };

  const columns: Column<TrainingRequest>[] = [
    { key: "fullName", label: "Full Name" },
    { key: "phone", label: "Phone" },
    { key: "email", label: "Email" },

    {
      key: "selectedCourse",
      label: "Course",
      render: (row) => (
        <span style={{ fontSize: "13px", color: "#1E3A8A", fontWeight: 600 }}>
          {row.selectedCourse}
        </span>
      ),
    },

    { key: "preferredSchedule", label: "Schedule" },
    { key: "experienceLevel", label: "Level" },

    {
      key: "createdAt",
      label: "Date",
      render: (row) => (
        <span style={{ fontSize: "13px", color: "#6B7280" }}>
          {row.createdAt ? new Date(row.createdAt).toLocaleDateString() : "—"}
        </span>
      ),
    },
  ];

  return (
    <div className="w-full min-w-0">
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-family-playfair font-bold text-[#1E3A8A] text-[20px]">
          Training Requests
        </h1>
        <p className="font-family-playfair text-gray-500 text-[13px] mt-1">
          Total: <span className="font-bold text-[#1E3A8A]">{total}</span>{" "}
          requests
        </p>
      </div>

      {/* Error */}
      {isError && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-5 py-4 mb-5">
          <p className="text-red-600 text-[13px]">
            Failed to load training requests.
          </p>
        </div>
      )}

      {deleteError && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-5 py-4 mb-5">
          <p className="text-red-600 text-[13px]">{deleteError}</p>
        </div>
      )}

      {/* Table */}
      <Table
        columns={columns}
        data={items}
        itemsPerPage={13}
        isLoading={isLoading}
        onEdit={handleView}
        onDelete={handleDelete}
      />

      {/* Modal */}
      {selectedRow && (
        <TrainingModal
          row={selectedRow}
          onClose={() => setSelectedRow(null)}
          onSave={handleUpdate}
          isLoading={isUpdating}
        />
      )}
    </div>
  );
}
