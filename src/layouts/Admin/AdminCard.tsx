import React from "react";
import type { LucideIcon } from "lucide-react";

type DashboardCardProps = {
  icon: LucideIcon;
  number: number | string;
  name: string;
  backgroundColor?: string;
  className?: string;
};

export const DashboardCard: React.FC<DashboardCardProps> = ({
  icon: Icon,
  number,
  name,
  backgroundColor,
  className = "",
}) => {
  return (
    <div
      style={{ backgroundColor }}
      className={`
         rounded-xl
        flex items-center gap-4 px-5 py-6 font-family-playfair
        hover:border-gray-300 transition-colors duration-150
        ${!backgroundColor ? "bg-white" : ""}
        ${className}
      `}
    >
      {/* Icon box */}
      <div className="w-11 h-11 rounded-full bg-white/30 flex items-center justify-center shrink-0">
        <Icon size={22} className="text-[#1E3A8A]" strokeWidth={1.5} />
      </div>

      {/* Text */}
      <div className="flex flex-col gap-0.5 min-w-0">
        <span className="font-family-playfair text-[11px] font-bold tracking-widest uppercase text-gray-500 truncate">
          {name}
        </span>
        <span className="font-family-playfair text-[24px] font-bold text-[#1E3A8A] leading-none">
          {typeof number === "number" ? number.toLocaleString() : number}
        </span>
      </div>
    </div>
  );
};