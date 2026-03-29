"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { TbMovie } from "react-icons/tb";
import { FaTv } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { BiCameraMovie } from "react-icons/bi";
import { IoMdHome } from "react-icons/io";
import { TiThMenu } from "react-icons/ti";

const navLinks = [
  { href: "/", label: "Home", icon: IoMdHome },
  { href: "/movies", label: "Movies", icon: TbMovie },
  { href: "/tv-shows", label: "TV Shows", icon: FaTv },
  { href: "/search", label: "Search", icon: FaSearch },
  { href: "/genre", label: "Genre", icon: BiCameraMovie },
];

export default function Sidebar() {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden fixed top-4 left-4 text-2xl z-50"
      >
        <TiThMenu />
      </button>

      <aside
        className={`
    fixed top-0 left-0 h-screen w-52 border-r border-white/5
    flex flex-col rounded-r-2xl bg-black p-3
    transform transition-transform duration-300
    ${open ? "translate-x-0" : "-translate-x-full"}
    md:translate-x-0 md:static
  `}
      >
        <nav className="flex-1 px-3 py-4 space-y-1">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600 px-2 mb-3">
            Browse
          </p>
          <ul className="space-y-1">
            {navLinks.map(({ href, label, icon: Icon }) => {
              const active = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors duration-150 ${
                      active
                        ? "bg-zinc-800 text-white font-medium"
                        : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
}
