// components/ui/Modal.tsx
import React, { useEffect } from "react";
import { X } from "lucide-react";

type WithTitle = {
  title?: string;
};

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactElement<WithTitle>;
};

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
}) => {
  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white/5 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        className="
          relative w-full max-w-[70vw] max-h-[90vh]
          bg-white rounded-2xl shadow-sm
          flex flex-col overflow-hidden
          animate-in fade-in zoom-in-95 duration-200
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Header ── */}
        <div className="flex items-start justify-between px-8 py-4 border-b border-gray-100 bg-linear-to-r from-blue-900 to-blue-300">
          <div>
            <p className="text-blue-200 font-family-playfair text-[11px] tracking-widest uppercase mb-1">
              Service Request
            </p>
            <h2 className="text-white font-family-playfair font-bold text-[20px] leading-snug">
              {title}
            </h2>
            {subtitle && (
              <p className="text-blue-100 font-family-playfair text-[13px] mt-1">
                {subtitle}
              </p>
            )}
          </div>

          <button
            onClick={onClose}
            className="
              ml-6 mt-1 flex items-center justify-center
              w-8 h-8 rounded-full
              cursor-pointer
              bg-white/10 hover:bg-white/25
              text-white transition-colors duration-150
              focus:outline-none focus:ring-2 focus:ring-white/50
            "
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* ── Scrollable Body ── */}
        <div className="overflow-y-auto flex-1 px-8 py-7">{children}</div>
      </div>
    </div>
  );
};
