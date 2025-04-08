"use client";

import HamburgerMenu from "./HamburgerMenu";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 h-12 px-4 flex items-center justify-between border-b">
      <h1 className="text-lg font-bold">My Portfolio</h1>
      <HamburgerMenu />
    </header>
  );
}
