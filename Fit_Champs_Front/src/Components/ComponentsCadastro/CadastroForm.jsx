import React from "react";
import { UserCheck } from "lucide-react";
import { User, Mail, Phone, MapPin, Info } from "lucide-react";
import InputField from "./InputField";
import PasswordField from "./PasswordField";
import FormButtons from "./FormButtons";
import Notification from "./Notification";

const CadastroForm = ({
  formData,
  handleChange,
  handleSubmit,
  notification,
  passwordStrength,
  showPassword,
  showConfirmPassword,
  togglePasswordVisibility,
  focusedField,
  handleFocus,
  handleBlur,
  isLoading,
}) => {
  return (
    <div className="bg-gradient-to-br from-slate-800/90 to-indigo-900/20 backdrop-blur-sm rounded-xl shadow-xl p-8 w-full max-w-4xl mx-auto border border-indigo-500/20">
      <h1 className="text-2xl font-bold text-center bg-gradient-to-r from-blue-100 to-blue-300 bg-clip-text text-transparent mb-6 flex items-center justify-center">
        <UserCheck className="mr-2 text-blue-400" size={28} />
        Cadastro de Usuário
      </h1>

      <Notification notification={notification} />

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            id="username"
            label="Nome Completo"
            type="text"
            value={formData.username}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            focusedField={focusedField}
            placeholder="Seu nome completo"
            required
            icon={User}
          />

          <InputField
            id="email"
            label="E-mail"
            type="email"
            value={formData.email}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            focusedField={focusedField}
            placeholder="seu.email@exemplo.com"
            required
            icon={Mail}
          />

          <InputField
            id="city"
            label="Cidade"
            type="text"
            value={formData.city}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            focusedField={focusedField}
            placeholder="Sua cidade"
            required
            icon={MapPin}
          />

          <InputField
            id="sex"
            label="Sexo"
            type="select"
            value={formData.sex}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            focusedField={focusedField}
            required
            icon={User}
            options={[
              { value: "masculino", label: "Masculino" },
              { value: "feminino", label: "Feminino" },
            ]}
          />

          <InputField
            id="age"
            label="Idade"
            type="number"
            value={formData.age}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            focusedField={focusedField}
            placeholder="Sua idade"
            required
            icon={Info}
            min="12"
            max="100"
          />

          <InputField
            id="phone"
            label="Telefone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            focusedField={focusedField}
            placeholder="(00) 00000-0000"
            required
            icon={Phone}
          />

          <InputField
            id="height"
            label="Altura (cm)"
            type="number"
            value={formData.height}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            focusedField={focusedField}
            placeholder="Sua altura em cm"
            required
            icon={Info}
            min="1"
            max="220"
            step="1"
          />

          <InputField
            id="weight"
            label="Peso (kg)"
            type="number"
            value={formData.weight}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            focusedField={focusedField}
            placeholder="Seu peso em kg"
            required
            icon={Info}
            min="1"
            max="300"
            step="0.1"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <PasswordField
            id="password"
            label="Senha"
            value={formData.password}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            focusedField={focusedField}
            placeholder="Crie uma senha forte"
            showPassword={showPassword}
            togglePasswordVisibility={togglePasswordVisibility}
            showStrengthIndicator={true}
            passwordStrength={passwordStrength}
          />

          <PasswordField
            id="confirm_password"
            label="Confirmar Senha"
            value={formData.confirm_password}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            focusedField={focusedField}
            placeholder="Confirme sua senha"
            showPassword={showConfirmPassword}
            togglePasswordVisibility={togglePasswordVisibility}
          />
        </div>

        <FormButtons onSubmit={handleSubmit} isLoading={isLoading} />
      </form>
    </div>
  );
};

export default CadastroForm;
