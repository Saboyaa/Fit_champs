import React, { useState } from "react";
import icone from "../images/icone.png";

const Cadastro = () => {
  // Estados para os campos do formulário
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    weight: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  // Estado para notificações
  const [notification, setNotification] = useState({
    message: "",
    type: "",
    visible: false,
  });

  // Estado para a força da senha
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    color: "",
  });

  // Estados para mostrar/esconder senha
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Função para atualizar os dados do formulário
  const handleChange = (e) => {
    const { id, value } = e.target;

    // Formatar telefone
    if (id === "phone") {
      let formattedPhone = value.replace(/\D/g, "");
      if (formattedPhone.length > 0) {
        formattedPhone = "(" + formattedPhone;
        if (formattedPhone.length > 3) {
          formattedPhone =
            formattedPhone.substring(0, 3) + ") " + formattedPhone.substring(3);
        }
        if (formattedPhone.length > 10) {
          formattedPhone =
            formattedPhone.substring(0, 10) +
            "-" +
            formattedPhone.substring(10);
        }
        if (formattedPhone.length > 15) {
          formattedPhone = formattedPhone.substring(0, 15);
        }
      }

      setFormData({ ...formData, [id]: formattedPhone });
    } else {
      setFormData({ ...formData, [id]: value });
    }

    // Calcular força da senha se o campo for password
    if (id === "password") {
      calculatePasswordStrength(value);
    }
  };

  // Função para calcular a força da senha
  const calculatePasswordStrength = (password) => {
    let score = 0;
    if (password.length >= 8) score += 25;
    if (/[A-Z]/.test(password)) score += 25;
    if (/[0-9]/.test(password)) score += 25;
    if (/[^A-Za-z0-9]/.test(password)) score += 25;

    let color = "";
    if (score <= 25) color = "bg-red-500";
    else if (score <= 50) color = "bg-yellow-500";
    else if (score <= 75) color = "bg-green-500";
    else color = "bg-blue-500";

    setPasswordStrength({ score, color });
  };

  // Função para mostrar notificação
  const showNotification = (message, type) => {
    setNotification({
      message,
      type,
      visible: true,
    });

    // Esconder notificação após 5 segundos
    setTimeout(() => {
      setNotification((prev) => ({ ...prev, visible: false }));
    }, 5000);
  };

  // Função para validar e enviar o formulário
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validação das senhas
    if (formData.password !== formData.confirmPassword) {
      showNotification("As senhas não coincidem!", "error");
      return;
    }

    // Validação da força da senha
    if (formData.password.length < 8) {
      showNotification("A senha deve ter pelo menos 8 caracteres!", "error");
      return;
    }

    // Aqui você enviaria os dados para o servidor (API)
    console.log("Dados enviados:", formData);
    showNotification("Cadastro realizado com sucesso!", "success");

    // Limpar formulário
    setFormData({
      name: "",
      email: "",
      age: "",
      weight: "",
      phone: "",
      password: "",
      confirmPassword: "",
    });

    setPasswordStrength({ score: 0, color: "" });
  };

  // Toggle para mostrar/esconder senha
  const togglePasswordVisibility = (field) => {
    if (field === "password") {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  return (
    <div className="h-full w-[90%] bg-orange-400 p-4 rounded-md mt-5">
      <div className="bg-neutral-800 rounded-lg shadow-lg p-8 w-[70%] mb-2 text-center mx-auto">
        <div className="text-center">
          <div className="flex justify-center items-center gap-2">
            <h1 className="text-2xl font-bold text-white mb-0">Fit Champs</h1>
            <img src={icone} alt="icone" className="h-8 w-8" />
          </div>
          <p className="text-blue-100 mt-2">Junte-se a nós você também!</p>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-lg p-8 w-[70%] mx-auto">
        <h1 className="text-2xl font-bold text-center text-neutral-800 mb-6">
          Cadastro de Usuário
        </h1>

        {notification.visible && (
          <div
            className={`p-3 mb-4 text-center rounded-md ${
              notification.type === "error"
                ? "bg-red-500 text-white"
                : "bg-green-500 text-white"
            }`}
          >
            {notification.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block font-medium mb-2 text-gray-700"
            >
              Nome Completo:
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block font-medium mb-2 text-gray-700"
            >
              E-mail:
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="age"
              className="block font-medium mb-2 text-gray-700"
            >
              Idade:
            </label>
            <input
              type="number"
              id="age"
              min="1"
              max="120"
              value={formData.age}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="weight"
              className="block font-medium mb-2 text-gray-700"
            >
              Peso (kg):
            </label>
            <input
              type="number"
              id="weight"
              step="0.1"
              min="1"
              max="300"
              value={formData.weight}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block font-medium mb-2 text-gray-700"
            >
              Telefone:
            </label>
            <input
              type="tel"
              id="phone"
              placeholder="(00) 00000-0000"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block font-medium mb-2 text-gray-700"
            >
              Senha:
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("password")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
            {/* Indicador de força da senha */}
            <div className="h-1 mt-2 rounded-full bg-gray-200">
              <div
                className={`h-1 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                style={{ width: `${passwordStrength.score}%` }}
              ></div>
            </div>
            {/* Tooltip com dicas de senha */}
            <div className="mt-1 text-xs text-gray-500 flex items-center">
              <span className="mr-1">?</span>
              <span>
                A senha deve ter pelo menos 8 caracteres, incluindo maiúsculas,
                números e símbolos
              </span>
            </div>
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block font-medium mb-2 text-gray-700"
            >
              Confirmar Senha:
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("confirmPassword")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className=" bg-orange-400 text-white py-2 px-4 rounded-md hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors"
            >
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Cadastro;
