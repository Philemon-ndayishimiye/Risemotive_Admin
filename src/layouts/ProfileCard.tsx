import * as React from "react";

// ─── Types ────────────────────────────────────────────────────
export interface ProfileCardProps {
  photo: string; // image URL or import
  name: string;
  title: string;
  email: string;
  phone: string;
  onClick?: () => void;
}

// ─── Icons ────────────────────────────────────────────────────
const PhoneIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#2563EB"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
  </svg>
);

const EmailIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#2563EB"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M2 7l10 7 10-7" />
  </svg>
);

// ─── ProfileCard Component ────────────────────────────────────
const ProfileCard: React.FC<ProfileCardProps> = ({
  photo,
  name,
  title,
  email,
  phone,
  onClick,
}) => {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#ffffff",
        borderRadius: "20px",
        padding: "32px 28px 28px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "6px",
        cursor: onClick ? "pointer" : "default",
        border: `1.5px solid ${hovered ? "rgba(37,99,235,0.25)" : "rgba(0,0,0,0.07)"}`,
        boxShadow: hovered
          ? "0 16px 40px rgba(37,99,235,0.12)"
          : "0 2px 16px rgba(0,0,0,0.07)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition:
          "transform 0.22s cubic-bezier(.34,1.56,.64,1), box-shadow 0.22s ease, border-color 0.22s ease",
        width: "100%",
        maxWidth: "280px",
        boxSizing: "border-box",
      }}
    >
      {/* ── Avatar ── */}
      <div
        style={{
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          overflow: "hidden",
          border: "3px solid #EEF2FF",
          boxShadow: "0 4px 14px rgba(37,99,235,0.18)",
          marginBottom: "10px",
          flexShrink: 0,
          transition:
            "transform 0.22s cubic-bezier(.34,1.56,.64,1), box-shadow 0.22s ease",
          transform: hovered ? "scale(1.06)" : "scale(1)",
        }}
      >
        <img
          src={photo}
          alt={name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>

      {/* ── Name ── */}
      <p
        style={{
          margin: 0,
          fontSize: "15px",
          fontWeight: 600,
          fontFamily: "font-family-playfair",
          color: "#374151",
          textAlign: "center",
        }}
      >
        {name}
      </p>

      {/* ── Title ── */}
      <p
        style={{
          margin: "0 0 10px",
          fontSize: "13px",
          fontWeight: 400,
          color: "#60A5FA",
          textAlign: "center",
          fontFamily: "font-family-playfair"
        }}
      >
        {title}
      </p>

      {/* ── Divider ── */}
      <div
        style={{
          width: "100%",
          height: "1px",
          background: "rgba(0,0,0,0.06)",
          fontFamily: "font-family-playfair",
          margin: "4px 0",
        }}
      />

      {/* ── Phone ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          fontFamily: "font-family-playfair",
          gap: "8px",
          marginTop: "10px",
        }}
      >
        <PhoneIcon />
        <span style={{ fontSize: "13px", color: "#475569", fontWeight: 500 }}>
          {phone}
        </span>
      </div>

      {/* ── Email ── */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <EmailIcon />
        <span style={{ fontSize: "13px", color: "#475569", fontWeight: 500 }}>
          {email}
        </span>
      </div>
    </div>
  );
};

export default ProfileCard;
