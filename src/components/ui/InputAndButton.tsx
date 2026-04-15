import React, { useState, InputHTMLAttributes } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type InputVariant = "default" | "danger" | "success" | "warning";
type InputType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "tel"
  | "url"
  | "date"
  | "time"
  | "datetime-local"
  | "search"
  | "textarea"
  | "select"
  | "file";

interface BaseInputProps {
  label: string;
  variant?: InputVariant;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
  type?: InputType;
  options?: { value: string; label: string }[]; // for select
}

type InputProps = BaseInputProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
    type?: InputType;
    onChange?: (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => void;
    value?: string | number;
  };

interface ButtonProps {
  label: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  className?: string;
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
}

// ─── Variant Styles ───────────────────────────────────────────────────────────

const variantStyles: Record<
  InputVariant,
  {
    border: string;
    focus: string;
    label: string;
    helper: string;
    ring: string;
    icon: string;
    badge: string;
  }
> = {
  default: {
    border: "border-blue-800",
    focus: "focus:ring-blue-800/20 focus:border-blue-800",
    label: "text-gray-700",
    helper: "text-gray-400",
    ring: "ring-blue-800/20",
    icon: "text-blue-800",
    badge: "bg-blue-50 text-blue-800 border-blue-200",
  },
  danger: {
    border: "border-red-500",
    focus: "focus:ring-red-500/20 focus:border-red-500",
    label: "text-red-600",
    helper: "text-red-400",
    ring: "ring-red-500/20",
    icon: "text-red-500",
    badge: "bg-red-50 text-red-600 border-red-200",
  },
  success: {
    border: "border-emerald-500",
    focus: "focus:ring-emerald-500/20 focus:border-emerald-500",
    label: "text-emerald-700",
    helper: "text-emerald-400",
    ring: "ring-emerald-500/20",
    icon: "text-emerald-500",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  warning: {
    border: "border-amber-500",
    focus: "focus:ring-amber-500/20 focus:border-amber-500",
    label: "text-amber-700",
    helper: "text-amber-400",
    ring: "ring-amber-500/20",
    icon: "text-amber-500",
    badge: "bg-amber-50 text-amber-700 border-amber-200",
  },
};

// ─── Variant Icons ────────────────────────────────────────────────────────────

const VariantIcon = ({ variant }: { variant: InputVariant }) => {
  if (variant === "danger")
    return (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M18 10A8 8 0 11 2 10a8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
          clipRule="evenodd"
        />
      </svg>
    );
  if (variant === "success")
    return (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      </svg>
    );
  if (variant === "warning")
    return (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
          clipRule="evenodd"
        />
      </svg>
    );
  return null;
};

// ─── Input Component ──────────────────────────────────────────────────────────

export const Input: React.FC<InputProps> = ({
  label,
  variant = "default",
  helperText,
  required = false,
  disabled = false,
  className = "",
  icon,
  type = "text",
  options = [],
  value,
  onChange,
  placeholder,
  ...rest
}) => {
  const isFile = type === "file";
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const v = variantStyles[variant];
  const isTextarea = type === "textarea";
  const isSelect = type === "select";
  const isPassword = type === "password";
  const inputType = isPassword
    ? showPassword
      ? "text"
      : "password"
    : (type as string);

  const baseInput = `
    w-full bg-white text-gray-800 placeholder-gray-300
    border rounded-xl transition-all duration-100 outline-none
    focus:ring-2 disabled:opacity-30 disabled:cursor-not-allowed
    ${v.border} ${v.focus}
    font-family-playfair text-[14px]
    ${icon ? "pl-11" : "pl-4"} ${isPassword ? "pr-12" : "pr-4"}
    py-3
  `;

  return (
    <div className={`group relative w-full ${className}`}>
      {/* Label */}
      <div className="flex items-center gap-2 font-family-playfair mb-2">
        <label
          className={`
            font-playfair text-gray-700 font-semibold text-[15px] tracking-wide
            transition-colors duration-200 ${v.label}
          `}
        >
          {label}
          {required && (
            <span
              className={`ml-1 ${variant === "danger" ? "text-red-500" : "text-blue-800"}`}
            >
              *
            </span>
          )}
        </label>

        {variant !== "default" && (
          <span
            className={`
            inline-flex items-center gap-1 px-2 py-0.5
            text-[11px] font-semibold uppercase tracking-wider
            border rounded-full font-playfair ${v.badge}
          `}
          >
            <VariantIcon variant={variant} />
            {variant}
          </span>
        )}
      </div>

      {/* Input Wrapper */}
      <div className="relative">
        {/* Leading Icon */}
        {icon && (
          <div
            className={`
            absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none
            transition-colors duration-200 ${v.icon}
            ${isTextarea ? "top-4 translate-y-0" : ""}
          `}
          >
            {icon}
          </div>
        )}

        {/* Glow Ring */}
        <div
          className={`
          absolute inset-0 rounded-xl transition-all duration-300 pointer-events-none
          ${focused ? `ring-4 ${v.ring}` : "ring-0"}
        `}
        />

        {/* Textarea */}
        {isTextarea ? (
          <textarea
            className={`${baseInput} resize-none min-h-30 pr-4`}
            placeholder={placeholder}
            disabled={disabled}
            value={value as string}
            onChange={onChange as React.ChangeEventHandler<HTMLTextAreaElement>}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
        ) : isSelect ? (
          /* Select */
          <select
            className={`${baseInput} cursor-pointer appearance-none`}
            disabled={disabled}
            value={value as string}
            onChange={onChange as React.ChangeEventHandler<HTMLSelectElement>}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          >
            <option value="" disabled>
              {placeholder || "Select an option…"}
            </option>
            {options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        ) : (
          /* Standard Input */
          <input
            {...(rest as InputHTMLAttributes<HTMLInputElement>)}
            type={inputType}
            className={baseInput}
            placeholder={isFile ? undefined : placeholder}
            disabled={disabled}
            value={isFile ? undefined : (value as string | number)}
            onChange={(e) => {
              if (onChange) onChange(e);
            }}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
        )}

        {/* Password Toggle */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={`
              absolute right-3.5 top-1/2 -translate-y-1/2
              transition-colors duration-200 ${v.icon}
              hover:opacity-70 focus:outline-none
            `}
          >
            {showPassword ? (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 4.411m0 0L21 21"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            )}
          </button>
        )}

        {/* Select Arrow */}
        {isSelect && (
          <div
            className={`absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none ${v.icon}`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Helper Text */}
      {helperText && (
        <p
          className={`mt-1.5 text-[12px] font-playfair flex items-center gap-1.5 ${v.helper}`}
        >
          {variant === "danger" && <VariantIcon variant="danger" />}
          {helperText}
        </p>
      )}
    </div>
  );
};

// ─── Button Component ─────────────────────────────────────────────────────────

export const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  icon,
  iconPosition = "left",
  className = "",
  type = "button",
  fullWidth = false,
}) => {
  const [ripple, setRipple] = useState<{
    x: number;
    y: number;
    id: number;
  } | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const id = Date.now();
    setRipple({ x: e.clientX - rect.left, y: e.clientY - rect.top, id });
    setTimeout(() => setRipple(null), 600);
    if (!disabled && !loading && onClick) onClick(e);
  };

  const sizeStyles = {
    sm: "px-4 py-2 text-[12px] gap-1.5 rounded-lg",
    md: "px-6 py-3 text-[14px] gap-2   rounded-xl",
    lg: "px-8 py-4 text-[16px] gap-2.5 rounded-2xl",
  };

  const variantMap = {
    primary: `
      bg-linear-to-r from-blue-900 to-blue-300 text-white
      hover:bg-blue-500 active:bg-blue-600
      shadow-lg shadow-blue-400/30 hover:shadow-blue-500/40
      border border-transparent
    `,
    outline: `
      bg-transparent text-blue-800
      border border-blue-800
      hover:bg-blue-50 active:bg-blue-100
    `,
    ghost: `
      bg-transparent text-blue-700
      border-2 border-transparent
      hover:bg-blue-50 active:bg-blue-100
    `,
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled || loading}
      className={`
        relative overflow-hidden inline-flex items-center justify-center
        font-playfair font-bold tracking-wide w-[98%]
        transition-all duration-200 ease-out font-family-playfair text-[15px]
        focus:outline-none focus:ring-1 focus:ring-blue-400/40 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none
        select-none cursor-pointer
        ${sizeStyles[size]}
        ${variantMap[variant]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
    >
      {/* Ripple */}
      {ripple && (
        <span
          key={ripple.id}
          className="absolute rounded-full bg-white/30 animate-ping pointer-events-none"
          style={{
            left: ripple.x - 12,
            top: ripple.y - 12,
            width: 24,
            height: 24,
          }}
        />
      )}

      {/* Shimmer on hover */}
      <span className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
        <span
          className="
          absolute inset-0 -translate-x-full
          bg-linear-to-r from-transparent via-white/10 to-transparent
          group-hover:translate-x-full transition-transform duration-700
        "
        />
      </span>

      {/* Loading Spinner */}
      {loading ? (
        <span className="flex items-center gap-2">
          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          Loading…
        </span>
      ) : (
        <>
          {icon && iconPosition === "left" && (
            <span className="shrink-0">{icon}</span>
          )}
          <span>{label}</span>
          {icon && iconPosition === "right" && (
            <span className="shrink-0">{icon}</span>
          )}
        </>
      )}
    </button>
  );
};

// ─── Demo / Showcase ──────────────────────────────────────────────────────────

const MailIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);
const UserIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);
const SendIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
    />
  </svg>
);
const PlusIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 4v16m8-8H4"
    />
  </svg>
);

export default function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    birthday: "",
    message: "",
    role: "",
  });
  const [loading, setLoading] = useState(false);

  const handle =
    (field: string) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) =>
      setFormData((p) => ({ ...p, [field]: e.target.value }));

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div
      className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50/30 to-slate-100 p-4 sm:p-8 lg:p-12"
      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
    >
      {/* Google Font Import */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');
        .font-playfair { font-family: 'Playfair Display', Georgia, serif; }
        * { font-family: 'Playfair Display', Georgia, serif; }
      `}</style>

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-800/10 border border-blue-800/20 rounded-full text-blue-800 text-[12px] font-semibold tracking-widest uppercase mb-4">
            ✦ Design System
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-gray-800 leading-tight">
            Input & Button
            <span className="block text-blue-800 italic mt-1">Components</span>
          </h1>
          <p className="mt-3 text-gray-500 text-[14px] max-w-md mx-auto">
            Elegant, accessible, fully-typed React components with Playfair
            Display.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl shadow-blue-900/5 border border-blue-100/60 overflow-hidden">
          {/* Card Header Strip */}
          <div className="bg-linear-to-r from-blue-800 to-blue-600 px-8 py-5 flex items-center justify-between">
            <div>
              <h2 className="text-white font-bold text-xl tracking-wide">
                Registration Form
              </h2>
              <p className="text-blue-200 text-[12px] mt-0.5">
                All variants demonstrated below
              </p>
            </div>
            <div className="flex gap-2 opacity-60">
              <span className="w-3 h-3 rounded-full bg-red-400" />
              <span className="w-3 h-3 rounded-full bg-yellow-400" />
              <span className="w-3 h-3 rounded-full bg-green-400" />
            </div>
          </div>

          <div className="p-6 sm:p-10">
            {/* ── Inputs Grid ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-7">
              {/* Default */}
              <Input
                label="Full Name"
                type="text"
                placeholder="John Doe"
                icon={<UserIcon />}
                value={formData.name}
                onChange={handle("name")}
                helperText="As it appears on your ID"
                required
              />

              {/* Default */}
              <Input
                label="Email Address"
                type="email"
                placeholder="john@example.com"
                icon={<MailIcon />}
                value={formData.email}
                onChange={handle("email")}
                helperText="We'll never share your email"
                required
              />

              {/* Danger */}
              <Input
                label="Phone Number"
                type="tel"
                placeholder="+250 700 000 000"
                variant="danger"
                value={formData.phone}
                onChange={handle("phone")}
                helperText="Invalid phone number format"
                required
              />

              {/* Warning */}
              <Input
                label="Date of Birth"
                type="date"
                variant="warning"
                value={formData.birthday}
                onChange={handle("birthday")}
                helperText="Must be 18 years or older"
              />

              {/* Password */}
              <Input
                label="Password"
                type="password"
                placeholder="Min. 8 characters"
                value={formData.password}
                onChange={handle("password")}
                helperText="Use letters, numbers & symbols"
                required
              />

              {/* Success + Select */}
              <Input
                label="Your Role"
                type="select"
                variant="success"
                value={formData.role}
                onChange={handle("role")}
                placeholder="Choose your role"
                helperText="Great! Role confirmed."
                options={[
                  { value: "dev", label: "Developer" },
                  { value: "design", label: "Designer" },
                  { value: "pm", label: "Product Manager" },
                  { value: "other", label: "Other" },
                ]}
              />

              {/* Textarea – full width */}
              <div className="sm:col-span-2">
                <Input
                  label="Message / Bio"
                  type="textarea"
                  placeholder="Tell us a little about yourself…"
                  value={formData.message}
                  onChange={handle("message")}
                  helperText="Optional. Max 500 characters."
                />
              </div>
            </div>

            {/* ── Divider ── */}
            <div className="flex items-center gap-4 my-8">
              <div className="flex-1 h-px bg-blue-100" />
              <span className="text-[12px] text-gray-400 tracking-widest uppercase">
                Buttons
              </span>
              <div className="flex-1 h-px bg-blue-100" />
            </div>

            {/* ── Buttons Showcase ── */}
            <div className="space-y-6">
              {/* Row 1 */}
              <div className="flex flex-wrap gap-3">
                <Button
                  label="Submit Form"
                  onClick={handleSubmit}
                  loading={loading}
                  icon={<SendIcon />}
                  iconPosition="right"
                />
                <Button label="Add New" variant="outline" icon={<PlusIcon />} />
                <Button label="Cancel" variant="ghost" />
              </div>

              {/* Row 2 – sizes */}
              <div className="flex flex-wrap items-center gap-3">
                <Button label="Small" size="sm" />
                <Button label="Medium" size="md" />
                <Button label="Large" size="lg" />
                <Button label="Disabled" disabled />
              </div>

              {/* Row 3 – full width */}
              <Button
                label="Create Account — Get Started"
                onClick={() => alert("Account created! 🎉")}
                fullWidth
                icon={<SendIcon />}
                iconPosition="right"
              />
            </div>
          </div>
        </div>

        {/* Footer note */}
        <p className="text-center text-gray-400 text-[12px] mt-8">
          Input · Button · TypeScript · Tailwind CSS · Playfair Display
        </p>
      </div>
    </div>
  );
}
