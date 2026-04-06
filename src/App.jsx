import React from "react";
import { AppProvider } from "./store/AppStore.jsx";
import Layout from "./components/layout/Layout";
import MainRoutes from "./routes/MainRoutes";

function App() {
  return (
    <AppProvider>
      <Layout>
        <MainRoutes />
      </Layout>
    </AppProvider>
  );
}

export default App;