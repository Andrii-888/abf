"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

type ToastProps = {
  open: boolean;
  message: string;
  onClose: () => void;
  /** мс до авто-закрытия */
  duration?: number;
  /** позиция тоаста */
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
};

const posMap: Record<NonNullable<ToastProps["position"]>, string> = {
  "bottom-right": "bottom-6 right-6",
  "bottom-left": "bottom-6 left-6",
  "top-right": "top-6 right-6",
  "top-left": "top-6 left-6",
};

export default function Toast({
  open,
  message,
  onClose,
  duration = 1500,
  position = "bottom-right",
}: ToastProps) {
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(onClose, duration);
    return () => clearTimeout(t);
  }, [open, duration, onClose]);

  return (
    <div className={`pointer-events-none fixed z-[9999] ${posMap[position]}`}>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 24,
              duration: 0.18,
            }}
            className="pointer-events-auto select-none rounded-md bg-emerald-500 px-3 py-2 text-sm font-medium text-white shadow-lg"
            role="status"
            aria-live="polite"
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
