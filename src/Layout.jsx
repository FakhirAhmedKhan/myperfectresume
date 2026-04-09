import { Suspense, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { LazyMotion } from "framer-motion";
import { HomePage, BuilderPage, CheckerPage, NavBar } from "./components";
import "./index.css";

const pages = { builder: <BuilderPage />, checker: <CheckerPage /> };

const App = () => {
  const [page, setPage] = useState(() => localStorage.getItem("cv-app-page") || "home");
  useEffect(() => { localStorage.setItem("cv-app-page", page) }, [page]);

  return (
    <LazyMotion features={() => import("framer-motion").then(res => res.domAnimation)}>
      <div className="h-screen overflow-y-scroll scrollbar-hide">
        <NavBar currentPage={page} onPageChange={setPage} />
        <main className="container mx-auto p-4 md:p-8">
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            {page === "home" ? <HomePage onPageChange={setPage} /> : pages[page]}
          </Suspense>
        </main>
        <footer className="py-12 border-t mt-auto text-center dark:border-gray-800">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            &copy; 2026 Smart Resume Studio. All rights reserved.
          </p>
        </footer>
      </div>
    </LazyMotion>
  );
};
createRoot(document.getElementById("root")).render(<App />);