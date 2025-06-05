// src/Paginas/Login.jsx
import { useEffect, useState } from "react";
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
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Preencha todos os campos");
      return;
    }

    try {
      setLoading(true);

      await authService.login(username, password);

      if (rememberMe) {
        localStorage.setItem("rememberMe", "true");
        localStorage.setItem("savedUsername", username);
      } else {
        localStorage.removeItem("rememberMe");
        localStorage.removeItem("savedUsername");
      }

      navigate("/Home");
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Erro ao fazer login. Verifique suas credenciais.";
      localStorage.setItem("loginError", message);
    } finally {
      setLoading(false);
    }
  };

  // Restaurar nome de usuário se "lembrar-me" estiver ativado
  useEffect(() => {
    const savedUsername = localStorage.getItem("savedUsername");
    const remember = localStorage.getItem("rememberMe") === "true";
    const savedError = localStorage.getItem("loginError");

    if (remember && savedUsername) {
      setUsername(savedUsername);
      setRememberMe(true);
    }
    if (savedError) {
      setError(savedError);
      localStorage.removeItem("loginError");
    }
  }, []);

  return (
    <div className="w-[100vw] bg-gradient-to-br from-slate-950 to-slate-700 flex flex-col items-center justify-center p-6 rounded-md shadow-2xl">
      <LoginHeader />

      <div className="w-full max-w-2xl bg-gradient-to-b from-sky-950 to-sky-950/90 rounded-2xl shadow-2xl overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-blue-600 to-cyan-500"></div>

        <div className="p-10">
          <h2 className="text-3xl font-bold text-center mb-8 text-white">
            Login
          </h2>

          <form onSubmit={handleLogin} className="space-y-6">
            <ErrorMessage error={error} />

            <UsernameField
              username={username}
              setUsername={setUsername}
              disabled={loading}
            />

            <PasswordField
              password={password}
              setPassword={setPassword}
              showPassword={showPassword}
              togglePasswordVisibility={togglePasswordVisibility}
              disabled={loading}
            />

            <LoginOptions
              rememberMe={rememberMe}
              setRememberMe={setRememberMe}
            />

            <LoginButton loading={loading} disabled={!username || !password} />

            <SignupSection />
          </form>

          <MotivationBanner />
        </div>
      </div>

      <Footer />
    </div>
  );
}
