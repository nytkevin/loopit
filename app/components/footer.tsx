import Link from "next/link";

export default function Footer() {
  const navLinks = [
    { href: "/movies", label: "Movies" },
    { href: "/tv-shows", label: "TV Shows" },
    { href: "/search", label: "Search" },
    { href: "/genre", label: "Genre" },
  ];

  // border-zinc-800
  return (
    <footer className="border-t border-white/5 mt-auto rounded-2xl">
      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="space-y-3">
            <h2 className="text-white text-xl font-black tracking-widest uppercase">
              Loop it
            </h2>
            <p className="text-sm text-zinc-500 leading-relaxed ">
              Movies & shows details at a glance.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600 mb-4">
              Explore
            </p>
            <ul className="space-y-2">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-zinc-400 hover:text-white transition-colors duration-150"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600 mb-4">
              Info
            </p>
            <div className="space-y-2 text-sm text-zinc-500">
              <p>
                Data provided by
                <a
                  href="https://www.themoviedb.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-white transition-colors duration-150 underline underline-offset-2"
                >
                  TMDB
                </a>
              </p>
              <p>
                <a
                  href="https://github.com/yourusername/loopit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-white transition-colors duration-150 underline underline-offset-2"
                >
                  GitHub Repo
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-zinc-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs text-zinc-600">
          <span>© 2026 Loopit. All rights reserved.</span>
          <span>Looking for something? Try the search.</span>
        </div>
      </div>
    </footer>
  );
}
