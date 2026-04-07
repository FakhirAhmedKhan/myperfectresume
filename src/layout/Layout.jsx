import { m } from "framer-motion";
import { Routes, Route } from "react-router-dom";
import { HomePage, BuilderPage, CheckerPage, NavBar } from "../index";
import { AppProvider } from "../store/AppStore";

const Layout = () => {
  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
        <NavBar />
        <main className="container mx-auto p-4 md:p-8">
          <m.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >

            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/builder" element={<BuilderPage />} />
              <Route path="/checker" element={<CheckerPage />} />
            </Routes>

          </m.div>
        </main>
        <footer className="py-12 border-t mt-auto text-center dark:border-gray-800">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            &copy; 2026 Smart Resume Studio. All rights reserved.
          </p>
        </footer>
      </div>
    </AppProvider>
  );
};

export default Layout;
