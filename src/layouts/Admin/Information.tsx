import { useState } from "react";
import { Table } from "../Admin/AdminTable";
import type { Column } from "../Admin/AdminTable";
import {
  useGetAllInfoPostsQuery,
  useCreateInfoPostMutation,
  useUpdateInfoPostMutation,
  useDeleteInfoPostMutation,
  useToggleActivateInfoPostMutation,
} from "../../app/api/Infospot/Infospot";
import type {
  InfoPost,
  CreateInfoPostRequest,
} from "../../app/api/Infospot/Infospot";
import { Plus, X, ToggleLeft, ToggleRight } from "lucide-react";

// ── Helpers ────────────────────────────────────────────────────────────────

interface ApiError {
  status: number;
  data: { message?: string };
}

function Badge({ active }: { active: boolean }) {
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

function CategoryBadge({ cat }: { cat: string }) {
  const map: Record<string, { bg: string; color: string }> = {
    JOB: { bg: "#DBEAFE", color: "#1E3A8A" },
    SCHOLARSHIP: { bg: "#FEF9C3", color: "#92400E" },
    ADVISORY: { bg: "#DCFCE7", color: "#14532D" },
    COMPETITION: { bg: "#ECFCE9", color: "#14525D" },
    COMMUNITY: { bg: "#DCFCD4", color: "#145353" },
  };
  const s = map[cat] ?? { bg: "#F3F4F6", color: "#374151" };
  return (
    <span
      style={{
        background: s.bg,
        color: s.color,
        padding: "3px 10px",
        borderRadius: "999px",
        fontSize: "11px",
        fontWeight: 700,
      }}
    >
      {cat}
    </span>
  );
}

// ── Form Modal ─────────────────────────────────────────────────────────────

function InfoPostModal({
  onClose,
  onSave,
  isLoading,
  initial,
}: {
  onClose: () => void;
  onSave: (data: CreateInfoPostRequest) => void;
  isLoading: boolean;
  initial?: InfoPost;
}) {
  const [form, setForm] = useState<CreateInfoPostRequest>({
    title: initial?.title ?? "",
    description: initial?.description ?? "",
    category: initial?.category ?? "JOB",
    deadline: initial?.deadline ?? "",
    location: initial?.location ?? "",
    applyLink: initial?.applyLink ?? "",
    contactInfo: initial?.contactInfo ?? "",
    isActive: initial?.isActive ?? true,
  });

  const set = (k: keyof CreateInfoPostRequest, v: string | boolean) =>
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
          maxWidth: "540px",
          backgroundColor: "#fff",
          borderRadius: "16px",
          overflow: "hidden",
          border: "1px solid #DBEAFE",
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
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
            flexShrink: 0,
          }}
        >
          <span style={{ fontWeight: 700, fontSize: "15px", color: "#1E3A8A" }}>
            {initial ? "Edit Info Post" : "Add Info Post"}
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

        <div style={{ padding: "20px", overflowY: "auto", flex: 1 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
              marginBottom: "12px",
            }}
          >
            <div>
              <label style={labelStyle}>Title</label>
              <input
                style={inputStyle}
                value={form.title}
                onChange={(e) => set("title", e.target.value)}
                placeholder="Post title"
              />
            </div>
            <div>
              <label style={labelStyle}>Category</label>
              <select
                style={inputStyle}
                value={form.category}
                onChange={(e) => set("category", e.target.value)}
              >
                <option value="JOB">JOB</option>
                <option value="COMPETITION">COMPETITION</option>
                <option value="COMMUNITY">COMMUNITY</option>
                <option value="SCHOLARSHIP">SCHOLARSHIP</option>
                <option value="ADVISORY">ADVISORY</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>Deadline</label>
              <input
                type="date"
                style={inputStyle}
                value={form.deadline}
                onChange={(e) => set("deadline", e.target.value)}
              />
            </div>
            <div>
              <label style={labelStyle}>Location</label>
              <input
                style={inputStyle}
                value={form.location}
                onChange={(e) => set("location", e.target.value)}
                placeholder="Location"
              />
            </div>
            <div>
              <label style={labelStyle}>Apply Link</label>
              <input
                style={inputStyle}
                value={form.applyLink}
                onChange={(e) => set("applyLink", e.target.value)}
                placeholder="https://..."
              />
            </div>
            <div>
              <label style={labelStyle}>Contact Info</label>
              <input
                style={inputStyle}
                value={form.contactInfo}
                onChange={(e) => set("contactInfo", e.target.value)}
                placeholder="Email or phone"
              />
            </div>
          </div>
          <div style={{ marginBottom: "12px" }}>
            <label style={labelStyle}>Description</label>
            <textarea
              style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }}
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder="Describe this opportunity..."
            />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "20px",
            }}
          >
            <label style={labelStyle}>Active</label>
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={(e) => set("isActive", e.target.checked)}
              style={{ width: "16px", height: "16px", cursor: "pointer" }}
            />
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
                if (!form.title.trim()) {
                  alert("Title is required.");
                  return;
                }
                if (!form.description.trim()) {
                  alert("Description is required.");
                  return;
                }
                if (!form.deadline.trim()) {
                  alert("Deadline is required.");
                  return;
                }
                if (!form.location.trim()) {
                  alert("Location is required.");
                  return;
                }
                if (!form.applyLink.trim()) {
                  alert("Apply link is required.");
                  return;
                }
                if (!form.contactInfo.trim()) {
                  alert("Contact info is required.");
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
              {isLoading ? "Saving..." : initial ? "Update" : "Create"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────

export default function InfoPostAdmin() {
  const { data, isLoading, isError } = useGetAllInfoPostsQuery();
  const [createPost, { isLoading: isCreating }] = useCreateInfoPostMutation();
  const [updatePost, { isLoading: isUpdating }] = useUpdateInfoPostMutation();
  const [deletePost] = useDeleteInfoPostMutation();
  const [toggleActivate] = useToggleActivateInfoPostMutation();

  const [showModal, setShowModal] = useState(false);
  const [editRow, setEditRow] = useState<InfoPost | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const items = data?.items ?? [];
  const total = data?.total ?? 0;

  const handleCreate = async (form: CreateInfoPostRequest) => {
    try {
       console.log("📦 Sending payload:", JSON.stringify(form, null, 2));
      await createPost(form).unwrap();
      setShowModal(false);
    } catch (err: unknown) {
      const e = err as ApiError;
      console.error(" Full error:", e);
      console.log("error message:", e?.data?.message);
    }
  };

  const handleUpdate = async (form: CreateInfoPostRequest) => {
    if (!editRow) return;
    try {
      await updatePost({ id: editRow.id, ...form }).unwrap();
      setEditRow(null);
    } catch (err: unknown) {
      const e = err as ApiError;
      alert(e?.data?.message ?? "Failed to update post.");
    }
  };

  const handleDelete = async (row: InfoPost) => {
    setDeleteError(null);
    try {
      await deletePost(row.id).unwrap();
    } catch {
      setDeleteError("Failed to delete post. Please try again.");
    }
  };

  const handleToggle = async (id: number) => {
    try {
      await toggleActivate(id).unwrap();
    } catch {
      alert("Failed to toggle status.");
    }
  };

  const columns: Column<InfoPost>[] = [
    { key: "title", label: "Title" },
    {
      key: "category",
      label: "Category",
      render: (row) => <CategoryBadge cat={row.category} />,
    },
    { key: "location", label: "Location" },
    { key: "deadline", label: "Deadline" },
    { key: "contactInfo", label: "Contact" },
    {
      key: "applyLink",
      label: "Apply Link",
      render: (row) =>
        row.applyLink ? (
          <a
            href={row.applyLink}
            target="_blank"
            rel="noreferrer"
            style={{
              color: "#1E3A8A",
              fontSize: "12px",
              fontWeight: 600,
              textDecoration: "underline",
            }}
          >
            Open
          </a>
        ) : (
          <span style={{ color: "#9CA3AF" }}>—</span>
        ),
    },
    {
      key: "isActive",
      label: "Status",
      render: (row) => (
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <Badge active={row.isActive} />
          <button
            onClick={() => handleToggle(row.id)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
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
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-family-playfair font-bold text-[#1E3A8A] text-[20px]">
            Info Posts
          </h1>
          <p className="font-family-playfair text-gray-500 text-[13px] mt-1">
            Total: <span className="font-bold text-[#1E3A8A]">{total}</span>{" "}
            posts
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
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
          <Plus size={15} /> Add Info Post
        </button>
      </div>

      {isError && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-5 py-4 mb-5">
          <p className="font-family-playfair text-red-600 text-[13px]">
            Failed to load posts. Please try again.
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
        onEdit={(row) => setEditRow(row)}
        onDelete={handleDelete}
      />

      {showModal && (
        <InfoPostModal
          onClose={() => setShowModal(false)}
          onSave={handleCreate}
          isLoading={isCreating}
        />
      )}
      {editRow && (
        <InfoPostModal
          onClose={() => setEditRow(null)}
          onSave={handleUpdate}
          isLoading={isUpdating}
          initial={editRow}
        />
      )}
    </div>
  );
}
