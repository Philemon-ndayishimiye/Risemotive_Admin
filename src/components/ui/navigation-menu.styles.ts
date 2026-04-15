import { cva } from "class-variance-authority";

export const navigationMenuTriggerStyle = cva(
  "inline-flex items-center justify-center rounded-lg px-4 py-2 text-[16px] font-medium transition-all duration-200 cursor-pointer font-family-playfair font-bold",
  {
    variants: {
      active: {
        true: " border-b text-[#1E3A8A]   ",
        false: "text-[#1E3A8A] hover:text-blue-300 hover:text-blue-300",
      },
    },
    defaultVariants: {
      active: false,
    },
  },
);
