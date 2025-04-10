"use client";

import { useState } from "react";
import { NavLinks } from "./NavLinks";
import { AnimatePresence, motion } from "framer-motion";

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="text-2xl z-50 relative"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="メニューを開く"
      >
        ☰
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            className="fixed top-0 left-0 w-full h-full z-40 bg-gray-200 flex flex-col items-center justify-center gap-8 text-gray-700 text-xl"
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
