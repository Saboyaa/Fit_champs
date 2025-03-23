import React from "react";
import BarraMenu from "./Components/BarraMenu";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import TopMenu from "./Components/TopMenu";
import { GlobalProvider } from "./Context/ContextoGlobal"; // Importa o contexto global
import { ExerciciosProvider } from "./Context/ExerciciosContext"; // Importa o contexto de exercícios

function Layout() {
  const location = useLocation();

  const isHomePage = location.pathname === "/";
  const isCadastroPage = location.pathname === "/Cadastro";
  return (
    <div className="bg-neutral-800 flex justify-center ">
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
      <ExerciciosProvider>
        <Router>
          <Layout />
        </Router>
      </ExerciciosProvider>
    </GlobalProvider>
  );
}
export default App;
