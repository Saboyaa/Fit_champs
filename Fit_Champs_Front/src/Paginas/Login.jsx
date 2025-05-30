// src/Paginas/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";

// Importações dos componentes separados
import LoginHeader from "../Components/ComponentsLogin/LoginHeader";
import UsernameField from "../Components/ComponentsLogin/UsernameField";
import PasswordField from "../Components/ComponentsLogin/PasswordField";
import LoginOptions from "../Components/ComponentsLogin/LoginOptions";
import LoginButton from "../Components/ComponentsLogin/LoginButton";
import SignupSection from "../Components/ComponentsLogin/SignupSection";
import MotivationBanner from "../Components/ComponentsLogin/MotivationBanner";
import Footer from "../Components/ComponentsLogin/Footer";
import ErrorMessage from "../Components/ComponentsLogin/ErrorMessage";

export default function Login() {
  // Estados do componente
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Função para alternar visibilidade da senha
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Função de login (preparada para integração com backend)
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Preencha todos os campos");
      return;
    }

    try {
      setError("");
      setLoading(true);

      // Descomente quando o backend estiver pronto
      // await authService.login(username, password);

      if (rememberMe) {
        localStorage.setItem("rememberMe", "true");
        localStorage.setItem("savedUsername", username);
      } else {
        localStorage.removeItem("rememberMe");
        localStorage.removeItem("savedUsername");
      }

      // Simular delay para mostrar loading
      await new Promise((resolve) => setTimeout(resolve, 1000));

      navigate("/Home");
    } catch (error) {
      setError(
        error.message || "Erro ao fazer login. Verifique suas credenciais."
      );
    } finally {
      setLoading(false);
    }
  };

  // Verificar remember me no carregamento do componente
  // useState(() => {
  //   const savedUsername = localStorage.getItem("savedUsername");
  //   const rememberMe = localStorage.getItem("rememberMe") === "true";

  //   if (rememberMe && savedUsername) {
  //     setUsername(savedUsername);
  //     setRememberMe(true);
  //   }
  // }, []);

  return (
    <div className="w-[100vw] bg-gradient-to-br from-slate-950 to-slate-700 flex flex-col items-center justify-center p-6 rounded-md shadow-2xl">
      {/* Header com logo */}
      <LoginHeader />

      {/* Card principal de login */}
      <div className="w-full max-w-2xl bg-gradient-to-b from-sky-950 to-sky-950/90 rounded-2xl shadow-2xl overflow-hidden">
        {/* Barra decorativa superior */}
        <div className="h-2 bg-gradient-to-r from-blue-600 to-cyan-500"></div>

        <div className="p-10">
          <h2 className="text-3xl font-bold text-center mb-8 text-white">
            Login
          </h2>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Mensagem de erro */}
            <ErrorMessage error={error} />

            {/* Campo de usuário */}
            <UsernameField
              username={username}
              setUsername={setUsername}
              disabled={loading}
            />

            {/* Campo de senha */}
            <PasswordField
              password={password}
              setPassword={setPassword}
              showPassword={showPassword}
              togglePasswordVisibility={togglePasswordVisibility}
              disabled={loading}
            />

            {/* Opções de login (lembrar-me e esqueci senha) */}
            <LoginOptions
              rememberMe={rememberMe}
              setRememberMe={setRememberMe}
            />

            {/* Botão de login */}
            <LoginButton loading={loading} disabled={!username || !password} />

            {/* Seção de cadastro */}
            <SignupSection />
          </form>

          {/* Banner motivacional */}
          <MotivationBanner />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
