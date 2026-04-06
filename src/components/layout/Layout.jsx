import Navbar from "./Navbar";
import { motion } from "framer-motion";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <Navbar />
      <main className="container mx-auto p-4 md:p-8">
        <motion.div
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.4 }}
        >
          {children}
        </motion.div>
      </main>
      <footer className="py-12 border-t mt-auto text-center dark:border-gray-800">
         <p className="text-gray-500 dark:text-gray-400 text-sm">
             &copy; 2026 Smart Resume Studio. All rights reserved.
         </p>
      </footer>
    </div>
  );
};

export default Layout;
