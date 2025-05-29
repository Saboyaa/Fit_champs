import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNotificationState } from "../Hooks/notification";
import Header from "../Components/ComponentsCadastro/Header";
import SuccessModal from "../Components/ComponentsCadastro/SuccessModal";
import CadastroForm from "../Components/ComponentsCadastro/CadastroForm";

const Cadastro = () => {
  const { notification, showNotification } = useNotificationState();
  const navigate = useNavigate();

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
  });

  // Estado para a força da senha
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    color: "",
  });

  // Estados para mostrar/esconder senha
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Estado para rastrear o campo em foco
  const [focusedField, setFocusedField] = useState(null);

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

  // Função para validar e enviar o formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validação das senhas
    if (formData.password !== formData.confirmPassword) {
      showNotification("As senhas não coincidem!", "error");
      setIsLoading(false);
      return;
    }

    // Validação da força da senha
    if (formData.password.length < 8) {
      showNotification("A senha deve ter pelo menos 8 caracteres!", "error");
      setIsLoading(false);
      return;
    }

    // Preparar dados para envio (removendo confirmPassword)
    try {
      const dataToSubmit = {
        ...formData,
        confirmPassword: undefined,
      };

      // Aqui você enviaria os dados para o servidor (API)
      // const response = await authService.register(dataToSubmit);
      console.log("Dados enviados:", dataToSubmit);

      setIsSuccess(true);
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
      });

      setPasswordStrength({ score: 0, color: "" });

      setTimeout(() => {
        navigate("/Home");
      }, 2000);
    } catch (error) {
      console.error("Erro no cadastro:", error);
      showNotification(error.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle para mostrar/esconder senha
  const togglePasswordVisibility = (field) => {
    if (field === "password") {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  if (isSuccess) {
    return <SuccessModal />;
  }

  return (
    <div className="min-h-screen w-screen bg-gradient-to-b from-slate-900 via-sky-900 to-slate-900 p-6 overflow-y-auto">
      <Header />
      <CadastroForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        notification={notification}
        passwordStrength={passwordStrength}
        showPassword={showPassword}
        showConfirmPassword={showConfirmPassword}
        togglePasswordVisibility={togglePasswordVisibility}
        focusedField={focusedField}
        handleFocus={handleFocus}
        handleBlur={handleBlur}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Cadastro;
