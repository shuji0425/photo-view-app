"use client";

import { useState } from "react";
import { NavLinks } from "./NavLinks";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* ハンバーガーボタン */}
      <button
        className="relative w-8 h-8 z-50 flex items-center justify-center cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="メニューを開く"
      >
        {/* 3本線 / × */}
        <div className="relative w-6 h-[18px]">
          <span
            className={cn(
              "absolute left-0 w-full h-[2px] bg-white transform transition-transform duration-300",
              isOpen ? "rotate-45 top-[8px]" : "top-0"
            )}
          />
          <span
            className={cn(
              "absolute left-0 w-full h-[2px] bg-white transition-opacity duration-300",
              isOpen ? "opacity-0" : "opacity-100 top-[8px]"
            )}
          />
          <span
            className={cn(
              "absolute left-0 w-full h-[2px] bg-white transform transition-transform duration-300",
              isOpen ? "-rotate-45 top-[8px]" : "top-[16px]"
            )}
          />
        </div>{" "}
      </button>

      {/* メニュー表示 */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            className="fixed top-0 left-0 w-full h-full z-40 bg-gray-700 flex flex-col items-center justify-center gap-8 text-gray-100 text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <NavLinks onClickLink={() => setIsOpen(false)} />
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
