import React, { useState } from "react";
import Tasks from "./Components/Tasks";
import BarraMenu from "./Components/BarraMenu";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import TopMenu from "./Components/TopMenu";
import { GlobalProvider } from "./Context/ContextoGlobal"; // Importa o contexto

function Layout() {
  const location = useLocation();

  const isHomePage = location.pathname === "/";
  const isCadastroPage = location.pathname === "/Cadastro";
  return (
    <div className="bg-neutral-800 flex justify-center">
      <AppRoutes />
      {!isHomePage && !isCadastroPage && (
        <>
          <BarraMenu />
          <TopMenu />
        </>
      )}
    </div>
  );
}

function App() {
  return (
    <GlobalProvider>
      <Router>
        <Layout />
      </Router>
    </GlobalProvider>
  );
}
export default App;
