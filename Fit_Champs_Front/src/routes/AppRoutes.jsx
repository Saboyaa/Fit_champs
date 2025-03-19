import { Routes, Route } from "react-router-dom";
import Home from "../Paginas/Home";
import TreinosSemanais from "../Paginas/TreinosSemanais";
import ListadeExercicios from "../Paginas/ListadeExercicios";
import GraficodeEvolucao from "../Paginas/GraficodeEvolucao";
import Rank from "../Paginas/Rank";
import Cadastro from "../Paginas/Cadastro";
import Login from "../Paginas/Login";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/Home" element={<Home />} />
      <Route path="/TreinosSemanais" element={<TreinosSemanais />} />
      <Route path="/ListadeExercicios" element={<ListadeExercicios />} />
      <Route path="/GraficodeEvolucao" element={<GraficodeEvolucao />} />
      <Route path="/" element={<Login />} />
      <Route path="/Rank" element={<Rank />} />
      <Route path="/Cadastro" element={<Cadastro />} />
    </Routes>
  );
};

export default AppRoutes;
