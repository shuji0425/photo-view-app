"use client";

import HamburgerMenu from "./HamburgerMenu";

export default function Header() {
  return (
    <header className="h-12 px-4 flex items-center justify-between border-b">
      <h1 className="text-lg font-bold">My Portfolio</h1>
      <HamburgerMenu />
    </header>
  );
}
