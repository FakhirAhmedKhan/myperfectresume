import { Link, useLocation } from "react-router-dom";
import { useAppStore } from "../store/AppStore.jsx";

import { CpuIcon, FileTextIcon, HomeIcon, LayoutIcon, MoonIcon, SunIcon } from "../index";

export function cn(...inputs) {
  return inputs
    .flat(Infinity)
    .filter(Boolean)
    .join(" ")
    .trim();
}

const Navbar = () => {
  const { theme, toggleTheme } = useAppStore();
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/", icon: HomeIcon },
    { name: "CV Builder", path: "/builder", icon: FileTextIcon },
    { name: "ATS Checker", path: "/checker", icon: CpuIcon },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full glass border-b px-6 py-4 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2 group">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform">
          <LayoutIcon size={24} />
        </div>
        <span className="text-xl font-bold gradient-text hidden sm:inline-block">
          Smart Resume Studio
        </span>
      </Link>

      <div className="hidden md:flex items-center gap-2 bg-gray-100 dark:bg-gray-900 p-1 rounded-full border">
        {navLinks.map((link) => {
          const isActive = location.pathname === link.path;
          const Icon = link.icon;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2",
                isActive
                  ? "bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm"
                  : "text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
              )}
            >
              <Icon size={18} />
              {link.name}
            </Link>
          );
        })}
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors border"
          aria-label="Toggle theme"
        >
          {theme === "light" ? <MoonIcon size={20} /> : <SunIcon size={20} />}
        </button>
        <button className="md:hidden p-2 rounded-xl bg-gray-100 dark:bg-gray-900 border">
          <LayoutIcon size={20} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
