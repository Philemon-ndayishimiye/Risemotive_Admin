import { useState } from "react";
import {
  Plus,
  X,
  Loader2,
  Globe,
  FileText,
  Scale,
  Palette,
  Building2,
} from "lucide-react";
import { Table, Column } from "../Admin/AdminTable"; // adjust path as needed
import {
  ServiceItem,
  CreateServiceRequest,
  UpdateServiceRequest,
  // E-Government
  useGetAllEGovernmentServicesQuery,
  useCreateEGovernmentServiceMutation,
  useUpdateEGovernmentServiceMutation,
  useDeleteEGovernmentServiceMutation,
  // Web
  useGetAllWebServicesQuery,
  useCreateWebServiceMutation,
  useUpdateWebServiceMutation,
  useDeleteWebServiceMutation,
  // App & Doc
  useGetAllAppDocServicesQuery,
  useCreateAppDocServiceMutation,
  useUpdateAppDocServiceMutation,
  useDeleteAppDocServiceMutation,
  // Legal
  useGetAllLegalServicesQuery,
  useCreateLegalServiceMutation,
  useUpdateLegalServiceMutation,
  useDeleteLegalServiceMutation,
  // Creative & Media
  useGetAllCreativeMediaServicesQuery,
  useCreateCreativeMediaServiceMutation,
  useUpdateCreativeMediaServiceMutation,
  useDeleteCreativeMediaServiceMutation,
} from "../../app/api/spotService/spotService"; // adjust path as needed

// ── Types ──────────────────────────────────────────────────────────────────

type TabKey = "e-government" | "web" | "app-doc" | "legal" | "creative-media";

interface TabConfig {
  key: TabKey;
  label: string;
  shortLabel: string;
  icon: React.ReactNode;
  color: string;
  bgLight: string;
}

// ── Tab Config ─────────────────────────────────────────────────────────────

const TABS: TabConfig[] = [
  {
    key: "e-government",
    label: "E-Government Services",
    shortLabel: "E-Government",
    icon: <Building2 size={15} />,
    color: "#1E3A8A",
    bgLight: "#EFF6FF",
  },
  {
    key: "web",
    label: "Web Services",
    shortLabel: "Web",
    icon: <Globe size={15} />,
    color: "#0369A1",
    bgLight: "#E0F2FE",
  },
  {
    key: "app-doc",
    label: "Application & Documentation",
    shortLabel: "App & Doc",
    icon: <FileText size={15} />,
    color: "#065F46",
    bgLight: "#ECFDF5",
  },
  {
    key: "legal",
    label: "Legal Services",
    shortLabel: "Legal",
    icon: <Scale size={15} />,
    color: "#7C2D12",
    bgLight: "#FFF7ED",
  },
  {
    key: "creative-media",
    label: "Creative & Media Services",
    shortLabel: "Creative & Media",
    icon: <Palette size={15} />,
    color: "#581C87",
    bgLight: "#FAF5FF",
  },
];

// ── Table Columns ──────────────────────────────────────────────────────────

const SERVICE_COLUMNS: Column<ServiceItem>[] = [
  {
    key: "id",
    label: "#",
    width: "60px",
    render: (row: ServiceItem) => (
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "26px",
          height: "26px",
          borderRadius: "6px",
          background: "#EFF6FF",
          border: "1px solid #BFDBFE",
          fontSize: "11px",
          fontWeight: 700,
          color: "#1E3A8A",
        }}
      >
        {row.id}
      </span>
    ),
  },
  {
    key: "name",
    label: "Service Name",
    render: (row: ServiceItem) => (
      <span style={{ fontWeight: 500, color: "#1F2937" }}>{row.name}</span>
    ),
  },
  {
    key: "price",
    label: "Price",
    width: "160px",
    render: (row: ServiceItem) => (
      <span
        style={{
          display: "inline-block",
          padding: "3px 10px",
          borderRadius: "20px",
          background: "#ECFDF5",
          border: "1px solid #6EE7B7",
          fontSize: "12px",
          fontWeight: 700,
          color: "#065F46",
          letterSpacing: "0.02em",
        }}
      >
        {row.price}
      </span>
    ),
  },
];

// ── Service Form Modal ─────────────────────────────────────────────────────

interface ServiceFormModalProps {
  mode: "create" | "edit";
  tab: TabConfig;
  initial?: ServiceItem;
  onClose: () => void;
  onSubmit: (data: { name: string; price: string }) => Promise<void>;
  isLoading: boolean;
}

function ServiceFormModal({
  mode,
  tab,
  initial,
  onClose,
  onSubmit,
  isLoading,
}: ServiceFormModalProps) {
  const [name, setName] = useState(initial?.name ?? "");
  const [price, setPrice] = useState(initial?.price ?? "");
  const [errors, setErrors] = useState<{ name?: string; price?: string }>({});

  const validate = () => {
    const e: typeof errors = {};
    if (!name.trim()) e.name = "Service name is required.";
    if (!price.trim()) e.price = "Price is required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    await onSubmit({ name: name.trim(), price: price.trim() });
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
        backgroundColor: "rgba(0,0,0,0.4)",
        padding: "0 16px",
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          backgroundColor: "#fff",
          borderRadius: "16px",
          overflow: "hidden",
          border: "1px solid #DBEAFE",
          boxShadow: "0 20px 60px rgba(30,58,138,0.15)",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "18px 22px",
            background: `linear-gradient(135deg, ${tab.bgLight} 0%, #fff 100%)`,
            borderBottom: "1px solid #DBEAFE",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "34px",
                height: "34px",
                borderRadius: "9px",
                background: tab.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
              }}
            >
              {tab.icon}
            </div>
            <div>
              <p
                style={{
                  margin: 0,
                  fontSize: "15px",
                  fontWeight: 700,
                  fontFamily: "Playfair Display, serif",
                  color: "#111827",
                }}
              >
                {mode === "create" ? "Add New Service" : "Edit Service"}
              </p>
              <p style={{ margin: 0, fontSize: "11px", color: "#6B7280" }}>
                {tab.label}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              border: "1px solid #E5E7EB",
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
        <div style={{ padding: "22px" }}>
          {/* Name field */}
          <div style={{ marginBottom: "16px" }}>
            <label
              style={{
                display: "block",
                fontSize: "12px",
                fontWeight: 600,
                color: "#374151",
                marginBottom: "6px",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Service Name <span style={{ color: "#EF4444" }}>*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors((p) => ({ ...p, name: undefined }));
              }}
              placeholder="e.g. Business Registration"
              style={{
                width: "100%",
                height: "42px",
                padding: "0 14px",
                border: `1px solid ${errors.name ? "#FCA5A5" : "#DBEAFE"}`,
                borderRadius: "10px",
                fontSize: "13px",
                color: "#111827",
                outline: "none",
                background: errors.name ? "#FFF5F5" : "#FAFCFF",
                boxSizing: "border-box",
                transition: "border-color 0.15s",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = tab.color)}
              onBlur={(e) =>
                (e.currentTarget.style.borderColor = errors.name
                  ? "#FCA5A5"
                  : "#DBEAFE")
              }
            />
            {errors.name && (
              <p
                style={{
                  margin: "5px 0 0",
                  fontSize: "11px",
                  color: "#EF4444",
                }}
              >
                {errors.name}
              </p>
            )}
          </div>

          {/* Price field */}
          <div style={{ marginBottom: "24px" }}>
            <label
              style={{
                display: "block",
                fontSize: "12px",
                fontWeight: 600,
                color: "#374151",
                marginBottom: "6px",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Price <span style={{ color: "#EF4444" }}>*</span>
            </label>
            <input
              type="text"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
                if (errors.price)
                  setErrors((p) => ({ ...p, price: undefined }));
              }}
              placeholder="e.g. 5,000 RWF or Free"
              style={{
                width: "100%",
                height: "42px",
                padding: "0 14px",
                border: `1px solid ${errors.price ? "#FCA5A5" : "#DBEAFE"}`,
                borderRadius: "10px",
                fontSize: "13px",
                color: "#111827",
                outline: "none",
                background: errors.price ? "#FFF5F5" : "#FAFCFF",
                boxSizing: "border-box",
                transition: "border-color 0.15s",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = tab.color)}
              onBlur={(e) =>
                (e.currentTarget.style.borderColor = errors.price
                  ? "#FCA5A5"
                  : "#DBEAFE")
              }
            />
            {errors.price && (
              <p
                style={{
                  margin: "5px 0 0",
                  fontSize: "11px",
                  color: "#EF4444",
                }}
              >
                {errors.price}
              </p>
            )}
          </div>

          {/* Actions */}
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={onClose}
              style={{
                flex: 1,
                height: "42px",
                borderRadius: "10px",
                border: "1px solid #E5E7EB",
                background: "#fff",
                fontSize: "13px",
                fontWeight: 700,
                fontFamily: "Playfair Display, serif",
                color: "#6B7280",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              style={{
                flex: 2,
                height: "42px",
                borderRadius: "10px",
                border: "none",
                background: isLoading ? "#93C5FD" : tab.color,
                fontSize: "13px",
                fontWeight: 700,
                fontFamily: "Playfair Display, serif",
                color: "#fff",
                cursor: isLoading ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                transition: "background 0.2s",
              }}
            >
              {isLoading ? (
                <>
                  <Loader2
                    size={14}
                    style={{ animation: "spin 1s linear infinite" }}
                  />
                  Saving…
                </>
              ) : mode === "create" ? (
                <>
                  <Plus size={14} />
                  Add Service
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </div>
      </div>
      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}

// ── Per-Tab Panel ──────────────────────────────────────────────────────────

interface TabPanelProps {
  tab: TabConfig;
  data: ServiceItem[];
  isLoading: boolean;
  onCreate: (data: CreateServiceRequest) => Promise<unknown>;
  onUpdate: (data: UpdateServiceRequest) => Promise<unknown>;
  onDelete: (id: number) => Promise<unknown>;
}

function TabPanel({
  tab,
  data,
  isLoading,
  onCreate,
  onUpdate,
  onDelete,
}: TabPanelProps) {
  const [modal, setModal] = useState<
    { mode: "create" } | { mode: "edit"; row: ServiceItem } | null
  >(null);
  const [saving, setSaving] = useState(false);

  const handleCreate = async (values: { name: string; price: string }) => {
    setSaving(true);
    try {
      await onCreate(values);
      setModal(null);
    } finally {
      setSaving(false);
    }
  };

  const handleUpdate = async (values: { name: string; price: string }) => {
    if (modal?.mode !== "edit") return;
    setSaving(true);
    try {
      await onUpdate({ id: modal.row.id, ...values });
      setModal(null);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      {/* Panel header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "16px",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <div>
          <h2
            style={{
              margin: 0,
              fontSize: "16px",
              fontWeight: 700,
              fontFamily: "Playfair Display, serif",
              color: "#111827",
            }}
          >
            {tab.label}
          </h2>
          <p style={{ margin: "2px 0 0", fontSize: "12px", color: "#6B7280" }}>
            {isLoading
              ? "Loading…"
              : `${data.length} service${data.length !== 1 ? "s" : ""} listed`}
          </p>
        </div>

        <button
          onClick={() => setModal({ mode: "create" })}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "7px",
            padding: "9px 16px",
            borderRadius: "10px",
            border: "none",
            background: tab.color,
            color: "#fff",
            fontSize: "13px",
            fontWeight: 700,
            fontFamily: "Playfair Display, serif",
            cursor: "pointer",
            boxShadow: `0 4px 14px ${tab.color}40`,
            transition: "opacity 0.15s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          <Plus size={14} />
          Add Service
        </button>
      </div>

      {/* Table */}
      <Table<ServiceItem>
        columns={SERVICE_COLUMNS}
        data={data}
        isLoading={isLoading}
        onEdit={(row: ServiceItem) => setModal({ mode: "edit", row })}
        onDelete={(row: ServiceItem) => onDelete(row.id)}
      />

      {/* Modal */}
      {modal && (
        <ServiceFormModal
          mode={modal.mode}
          tab={tab}
          initial={modal.mode === "edit" ? modal.row : undefined}
          onClose={() => setModal(null)}
          onSubmit={modal.mode === "create" ? handleCreate : handleUpdate}
          isLoading={saving}
        />
      )}
    </>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────

export default function SpotService() {
  const [activeTab, setActiveTab] = useState<TabKey>("e-government");

  // ── Queries ──
  const { data: eGovData, isLoading: eGovLoading } =
    useGetAllEGovernmentServicesQuery();
  const { data: webData, isLoading: webLoading } = useGetAllWebServicesQuery();
  const { data: appDocData, isLoading: appDocLoading } =
    useGetAllAppDocServicesQuery();
  const { data: legalData, isLoading: legalLoading } =
    useGetAllLegalServicesQuery();
  const { data: creativeData, isLoading: creativeLoading } =
    useGetAllCreativeMediaServicesQuery();

  // ── Mutations ──
  const [createEGov] = useCreateEGovernmentServiceMutation();
  const [updateEGov] = useUpdateEGovernmentServiceMutation();
  const [deleteEGov] = useDeleteEGovernmentServiceMutation();

  const [createWeb] = useCreateWebServiceMutation();
  const [updateWeb] = useUpdateWebServiceMutation();
  const [deleteWeb] = useDeleteWebServiceMutation();

  const [createAppDoc] = useCreateAppDocServiceMutation();
  const [updateAppDoc] = useUpdateAppDocServiceMutation();
  const [deleteAppDoc] = useDeleteAppDocServiceMutation();

  const [createLegal] = useCreateLegalServiceMutation();
  const [updateLegal] = useUpdateLegalServiceMutation();
  const [deleteLegal] = useDeleteLegalServiceMutation();

  const [createCreative] = useCreateCreativeMediaServiceMutation();
  const [updateCreative] = useUpdateCreativeMediaServiceMutation();
  const [deleteCreative] = useDeleteCreativeMediaServiceMutation();

  // ── Tab data map ──
  const tabPanelProps: Record<TabKey, Omit<TabPanelProps, "tab">> = {
    "e-government": {
      data: eGovData?.items ?? [],
      isLoading: eGovLoading,
      onCreate: (d) => createEGov(d).unwrap(),
      onUpdate: (d) => updateEGov(d).unwrap(),
      onDelete: (id) => deleteEGov(id).unwrap(),
    },
    web: {
      data: webData?.items ?? [],
      isLoading: webLoading,
      onCreate: (d) => createWeb(d).unwrap(),
      onUpdate: (d) => updateWeb(d).unwrap(),
      onDelete: (id) => deleteWeb(id).unwrap(),
    },
    "app-doc": {
      data: appDocData?.items ?? [],
      isLoading: appDocLoading,
      onCreate: (d) => createAppDoc(d).unwrap(),
      onUpdate: (d) => updateAppDoc(d).unwrap(),
      onDelete: (id) => deleteAppDoc(id).unwrap(),
    },
    legal: {
      data: legalData?.items ?? [],
      isLoading: legalLoading,
      onCreate: (d) => createLegal(d).unwrap(),
      onUpdate: (d) => updateLegal(d).unwrap(),
      onDelete: (id) => deleteLegal(id).unwrap(),
    },
    "creative-media": {
      data: creativeData?.items ?? [],
      isLoading: creativeLoading,
      onCreate: (d) => createCreative(d).unwrap(),
      onUpdate: (d) => updateCreative(d).unwrap(),
      onDelete: (id) => deleteCreative(id).unwrap(),
    },
  };

  const activeConfig = TABS.find((t) => t.key === activeTab)!;

  return (
    <div
      style={{
        padding: "24px",
        minHeight: "100vh",
        background: "#F8FAFF",
        fontFamily: "sans-serif",
      }}
    >
      {/* ── Page header ── */}
      <div style={{ marginBottom: "24px" }}>
        <h1
          style={{
            margin: 0,
            fontSize: "22px",
            fontWeight: 700,
            fontFamily: "Playfair Display, serif",
            color: "#1E3A8A",
          }}
        >
          Spot Services
        </h1>
        <p style={{ margin: "4px 0 0", fontSize: "13px", color: "#6B7280" }}>
          Manage all service categories and their pricing.
        </p>
      </div>

      {/* ── Tabs ── */}
      <div
        style={{
          display: "flex",
          gap: "6px",
          marginBottom: "20px",
          overflowX: "auto",
          paddingBottom: "4px",
        }}
      >
        {TABS.map((tab) => {
          const isActive = activeTab === tab.key;
          const count = tabPanelProps[tab.key].data.length;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "7px",
                padding: "9px 16px",
                borderRadius: "10px",
                border: isActive
                  ? `1.5px solid ${tab.color}`
                  : "1.5px solid #DBEAFE",
                background: isActive ? tab.color : "#fff",
                color: isActive ? "#fff" : "#6B7280",
                fontSize: "13px",
                fontWeight: isActive ? 700 : 500,
                fontFamily: "Playfair Display, serif",
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all 0.18s",
                boxShadow: isActive ? `0 4px 14px ${tab.color}35` : "none",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = tab.bgLight;
                  e.currentTarget.style.color = tab.color;
                  e.currentTarget.style.borderColor = tab.color;
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "#fff";
                  e.currentTarget.style.color = "#6B7280";
                  e.currentTarget.style.borderColor = "#DBEAFE";
                }
              }}
            >
              {tab.icon}
              {tab.shortLabel}
              {count > 0 && (
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minWidth: "18px",
                    height: "18px",
                    padding: "0 5px",
                    borderRadius: "9px",
                    background: isActive
                      ? "rgba(255,255,255,0.25)"
                      : tab.bgLight,
                    color: isActive ? "#fff" : tab.color,
                    fontSize: "10px",
                    fontWeight: 700,
                  }}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ── Active panel ── */}
      <div
        style={{
          background: "#fff",
          borderRadius: "14px",
          border: "1px solid #DBEAFE",
          padding: "20px",
          boxShadow: "0 2px 12px rgba(30,58,138,0.06)",
        }}
      >
        {/* Accent bar */}
        <div
          style={{
            height: "3px",
            width: "48px",
            borderRadius: "2px",
            background: activeConfig.color,
            marginBottom: "16px",
          }}
        />

        <TabPanel
          key={activeTab}
          tab={activeConfig}
          {...tabPanelProps[activeTab]}
        />
      </div>
    </div>
  );
}
