import React, { useState, useEffect } from "react";
import icone from "../images/icone.png";
import { Link } from "react-router-dom";

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
    cidade: "",
    sexo: "masculino", // Default value
    altura: "",
    imc: {
      value: null,
      classification: "",
    },
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

  // Estado para rastrear o campo em foco
  const [focusedField, setFocusedField] = useState(null);

  // Estado para o display do IMC (separado do formData)
  const [imcDisplay, setImcDisplay] = useState({
    value: null,
    classification: "",
    color: "",
  });

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

  // Novas funções para lidar com o foco
  const handleFocus = (fieldId) => {
    setFocusedField(fieldId);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  // Função para determinar a classe de estilo do campo
  const getFieldStyle = (fieldId) => {
    const baseStyle =
      "w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-600 transition-all duration-300";

    if (fieldId === focusedField) {
      return `${baseStyle} border-sky-700 bg-orange-50 shadow-md transform scale-[1.02]`;
    }

    return `${baseStyle} border-gray-300`;
  };

  // Função para determinar a classe de estilo do container do campo
  const getFieldContainerStyle = (fieldId) => {
    const baseStyle = "mb-4 transition-all duration-300";

    if (fieldId === focusedField) {
      return `${baseStyle} bg-neutral-100 p-3 rounded-lg`;
    }

    return baseStyle;
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

  // Função para calcular o IMC
  const calculateIMC = () => {
    if (formData.altura && formData.weight) {
      const heightInMeters = parseFloat(formData.altura) / 100;
      const weightInKg = parseFloat(formData.weight);

      if (heightInMeters > 0 && weightInKg > 0) {
        const imcValue = weightInKg / (heightInMeters * heightInMeters);

        let classification = "";
        let color = "";

        if (imcValue < 18.5) {
          classification = "Abaixo do peso";
          color = "text-blue-600";
        } else if (imcValue < 25) {
          classification = "Peso normal";
          color = "text-green-600";
        } else if (imcValue < 30) {
          classification = "Sobrepeso";
          color = "text-yellow-600";
        } else if (imcValue < 35) {
          classification = "Obesidade Grau I";
          color = "text-orange-600";
        } else if (imcValue < 40) {
          classification = "Obesidade Grau II";
          color = "text-red-600";
        } else {
          classification = "Obesidade Grau III";
          color = "text-red-800";
        }

        // Atualizar o display do IMC
        setImcDisplay({
          value: imcValue.toFixed(2),
          classification,
          color,
        });

        // Armazenar o IMC nos dados do formulário
        setFormData((prevData) => ({
          ...prevData,
          imc: {
            value: imcValue.toFixed(2),
            classification,
          },
        }));
      }
    }
  };

  // Calcular IMC quando altura ou peso forem atualizados
  useEffect(() => {
    calculateIMC();
  }, [formData.altura, formData.weight]);

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

    // Preparar dados para envio (removendo confirmPassword)
    const dataToSubmit = {
      ...formData,
      confirmPassword: undefined,
    };

    // Aqui você enviaria os dados para o servidor (API)
    console.log("Dados enviados:", dataToSubmit);
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
      altura: "",
      cidade: "",
      sexo: "masculino",
      imc: {
        value: null,
        classification: "",
      },
    });

    setPasswordStrength({ score: 0, color: "" });
    setImcDisplay({ value: null, classification: "", color: "" });
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
    <div className="h-full w-[90%] bg-sky-950 p-6 rounded-md mt-5">
      <div className="bg-neutral-800 rounded-lg shadow-xl p-8 w-[70%] mb-4 text-center mx-auto border-b-4 border-sky-600">
        <div className="text-center">
          <div className="flex justify-center items-center gap-3">
            <h1 className="text-3xl font-bold text-white mb-0">Fit Champs</h1>
            <img src={icone} alt="icone" className="h-10 w-10" />
          </div>
          <span className="text-blue-100 mt-2 block">
            Melhorando sua saúde e qualidade de vida
          </span>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-lg p-8 w-[70%] mx-auto border-t-4 border-sky-600">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={getFieldContainerStyle("name")}>
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
                onFocus={() => handleFocus("name")}
                onBlur={handleBlur}
                className={getFieldStyle("name")}
                required
              />
            </div>

            <div className={getFieldContainerStyle("email")}>
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
                onFocus={() => handleFocus("email")}
                onBlur={handleBlur}
                className={getFieldStyle("email")}
                required
              />
            </div>

            <div className={getFieldContainerStyle("cidade")}>
              <label
                htmlFor="cidade"
                className="block font-medium mb-2 text-gray-700"
              >
                Cidade:
              </label>
              <input
                type="text"
                id="cidade"
                value={formData.cidade}
                onChange={handleChange}
                onFocus={() => handleFocus("cidade")}
                onBlur={handleBlur}
                className={getFieldStyle("cidade")}
                required
              />
            </div>

            <div className={getFieldContainerStyle("sexo")}>
              <label
                htmlFor="sexo"
                className="block font-medium mb-2 text-gray-700"
              >
                Sexo:
              </label>
              <select
                id="sexo"
                value={formData.sexo}
                onChange={handleChange}
                onFocus={() => handleFocus("sexo")}
                onBlur={handleBlur}
                className={getFieldStyle("sexo")}
                required
              >
                <option value="masculino">Masculino</option>
                <option value="feminino">Feminino</option>
              </select>
            </div>

            <div className={getFieldContainerStyle("age")}>
              <label
                htmlFor="age"
                className="block font-medium mb-2 text-gray-700"
              >
                Idade:
              </label>
              <input
                type="number"
                id="age"
                min="12"
                max="100"
                value={formData.age}
                onChange={handleChange}
                onFocus={() => handleFocus("age")}
                onBlur={handleBlur}
                className={getFieldStyle("age")}
                required
              />
            </div>

            <div className={getFieldContainerStyle("phone")}>
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
                onFocus={() => handleFocus("phone")}
                onBlur={handleBlur}
                className={getFieldStyle("phone")}
                required
              />
            </div>

            <div className={getFieldContainerStyle("altura")}>
              <label
                htmlFor="altura"
                className="block font-medium mb-2 text-gray-700"
              >
                Altura (cm):
              </label>
              <input
                type="number"
                id="altura"
                step="1"
                min="1"
                max="220"
                value={formData.altura}
                onChange={handleChange}
                onFocus={() => handleFocus("altura")}
                onBlur={handleBlur}
                className={getFieldStyle("altura")}
                required
              />
            </div>

            <div className={getFieldContainerStyle("weight")}>
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
                onFocus={() => handleFocus("weight")}
                onBlur={handleBlur}
                className={getFieldStyle("weight")}
                required
              />
            </div>
          </div>

          {/* IMC Display Section */}
          {imcDisplay.value && (
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
              <h3 className="font-semibold text-lg text-gray-800 mb-2">
                Seu IMC:
              </h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-bold">{imcDisplay.value}</p>
                  <p className={`${imcDisplay.color} font-medium`}>
                    {imcDisplay.classification}
                  </p>
                </div>
                <div className="text-sm text-gray-600">
                  <p>IMC = peso(kg) / altura²(m)</p>
                </div>
              </div>
              <div className="mt-3 text-xs text-gray-700 bg-gray-100 p-2 rounded">
                <p className="font-medium">
                  Este valor será salvo no seu cadastro
                </p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={getFieldContainerStyle("password")}>
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
                  onFocus={() => handleFocus("password")}
                  onBlur={handleBlur}
                  className={getFieldStyle("password")}
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
                  A senha deve ter pelo menos 8 caracteres, incluindo
                  maiúsculas, números e símbolos
                </span>
              </div>
            </div>

            <div className={getFieldContainerStyle("confirmPassword")}>
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
                  onFocus={() => handleFocus("confirmPassword")}
                  onBlur={handleBlur}
                  className={getFieldStyle("confirmPassword")}
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
          </div>

          <div className="flex justify-between items-center mt-6">
            <Link
              to="/"
              className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors flex items-center"
            >
              <span className="mr-1">←</span> Login
            </Link>
            <button
              type="submit"
              className="bg-sky-600 text-white py-2 px-6 rounded-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors shadow-md"
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
