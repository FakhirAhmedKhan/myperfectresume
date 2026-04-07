import { Suspense, useState } from "react";
import { createRoot } from "react-dom/client";
import { LazyMotion } from "framer-motion";
import { HomePage, BuilderPage, CheckerPage, NavBar } from "../index";
import { AppProvider } from "../store/AppStore";
import "../index.css";

const pages = {
  home: <HomePage />,
  builder: <BuilderPage />,
  checker: <CheckerPage />,
};

const App = () => {
  const [page, setPage] = useState("home");

  return (
    <LazyMotion features={() => import("framer-motion").then(res => res.domAnimation)}>
      <AppProvider>
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
            <NavBar currentPage={page} onPageChange={setPage} />
            <main className="container mx-auto p-4 md:p-8">
              {pages[page]}
            </main>
            <footer className="py-12 border-t mt-auto text-center dark:border-gray-800">
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                &copy; 2026 Smart Resume Studio. All rights reserved.
              </p>
            </footer>
          </div>
        </Suspense>
      </AppProvider>
    </LazyMotion>
  );
};
createRoot(document.getElementById("root")).render(<App />);