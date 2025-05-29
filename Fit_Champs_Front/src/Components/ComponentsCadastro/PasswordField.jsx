import React from "react";
import { Lock, Info } from "lucide-react";

const PasswordField = ({
  id,
  label,
  value,
  onChange,
  onFocus,
  onBlur,
  focusedField,
  placeholder,
  showPassword,
  togglePasswordVisibility,
  showStrengthIndicator = false,
  passwordStrength = null,
}) => {
  const getFieldStyle = (fieldId) => {
    const baseStyle =
      "w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 bg-slate-700 text-white border";

    if (fieldId === focusedField) {
      return `${baseStyle} border-blue-500 ring-blue-500/50 shadow-lg transform scale-[1.02]`;
    }

    return `${baseStyle} border-slate-600 hover:border-slate-500 focus:border-blue-500`;
  };

  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block font-medium text-blue-200 flex items-center"
      >
        <Lock className="mr-2 text-blue-300" size={16} />
        {label}
      </label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          id={id}
          value={value}
          onChange={onChange}
          onFocus={() => onFocus(id)}
          onBlur={onBlur}
          className={getFieldStyle(id)}
          placeholder={placeholder}
          required
        />
        <button
          type="button"
          onClick={() => togglePasswordVisibility(id)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-blue-400 transition-colors"
        >
          {showPassword ? "👁️" : "👁️‍🗨️"}
        </button>
      </div>

      {/* Indicador de força da senha */}
      {showStrengthIndicator && passwordStrength && (
        <>
          <div className="h-1 mt-2 rounded-full bg-slate-600">
            <div
              className={`h-1 rounded-full transition-all duration-300 ${passwordStrength.color}`}
              style={{ width: `${passwordStrength.score}%` }}
            ></div>
          </div>
          {/* Tooltip com dicas de senha */}
          <div className="mt-1 text-xs text-slate-400 flex items-center bg-slate-800/50 p-2 rounded-lg">
            <Info className="text-blue-300 mr-1" size={14} />
            <span>
              A senha deve ter pelo menos 8 caracteres, incluindo maiúsculas,
              números e símbolos
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default PasswordField;
