import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../configs";
import { CpuIcon, FileTextIcon, HomeIcon, LayoutIcon, MoonIcon, SunIcon } from "../index";

export function cn(...inputs) {
  return inputs
    .flat(Infinity)
    .filter(Boolean)
    .join(" ")
    .trim();
}

const Navbar = ({ currentPage, onPageChange }) => {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = React.useState(false);

  const navLinks = [
    { name: "Home", id: "home", icon: HomeIcon },
    { name: "CV Builder", id: "builder", icon: FileTextIcon },
    { name: "ATS Checker", id: "checker", icon: CpuIcon },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 w-full glass border-b px-4 md:px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => onPageChange("home")}
          className="flex items-center gap-2 group text-left"
        >
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform">
            <LayoutIcon size={24} />
          </div>
          <span className="text-xl font-bold gradient-text hidden sm:inline-block">
            Smart Resume Studio
          </span>
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center justify-center gap-3 bg-gray-100 dark:bg-gray-900 p-1 rounded-full border">
          {navLinks.map((link) => {
            const isActive = currentPage === link.id;
            const Icon = link.icon;
            return (
              <button
                key={link.id}
                onClick={() => onPageChange(link.id)}
                className={cn(
                  "px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2",
                  isActive
                    ? "bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm"
                    : "text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
                )}
              >
                <Icon size={18} />
                {link.name}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors border hidden md:block"
            aria-label="Toggle theme"
          >
            {theme === "light" ? <MoonIcon size={20} /> : <SunIcon size={20} />}
          </button>
          
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-xl bg-gray-100 dark:bg-gray-900 border text-gray-600 dark:text-gray-400"
          >
            <LayoutIcon size={24} className={isOpen ? "rotate-90" : ""} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[51] md:hidden"
            />
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="fixed top-[81px] left-4 right-4 bg-white dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 shadow-2xl z-[52] md:hidden"
            >
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => {
                  const isActive = currentPage === link.id;
                  const Icon = link.icon;
                  return (
                    <button
                      key={link.id}
                      onClick={() => {
                        onPageChange(link.id);
                        setIsOpen(false);
                      }}
                      className={cn(
                        "w-full px-5 py-4 rounded-2xl text-base font-bold flex items-center gap-3 transition-all",
                        isActive
                          ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                          : "bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400"
                      )}
                    >
                      <Icon size={22} />
                      {link.name}
                    </button>
                  );
                })}
                <hr className="my-2 border-gray-100 dark:border-gray-800" />
                <button
                  onClick={toggleTheme}
                  className="w-full px-5 py-4 rounded-2xl text-base font-bold flex items-center gap-3 bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400"
                >
                  {theme === "light" ? <MoonIcon size={22} /> : <SunIcon size={22} />}
                  {theme === "light" ? "Dark Mode" : "Light Mode"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
