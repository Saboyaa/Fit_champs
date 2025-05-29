import React from "react";

const InputField = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  onFocus,
  onBlur,
  focusedField,
  placeholder,
  required = false,
  icon: Icon,
  min,
  max,
  step,
  options = null,
}) => {
  const getFieldStyle = (fieldId) => {
    const baseStyle =
      "w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 bg-slate-700 text-white border";

    if (fieldId === focusedField) {
      return `${baseStyle} border-blue-500 ring-blue-500/50 shadow-lg transform scale-[1.02]`;
    }

    return `${baseStyle} border-slate-600 hover:border-slate-500 focus:border-blue-500`;
  };

  const renderInput = () => {
    if (type === "select") {
      return (
        <select
          id={id}
          value={value}
          onChange={onChange}
          onFocus={() => onFocus(id)}
          onBlur={onBlur}
          className={getFieldStyle(id)}
          required={required}
        >
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    }

    return (
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        onFocus={() => onFocus(id)}
        onBlur={onBlur}
        className={getFieldStyle(id)}
        placeholder={placeholder}
        required={required}
        min={min}
        max={max}
        step={step}
      />
    );
  };

  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block font-medium text-blue-200 flex items-center"
      >
        {Icon && <Icon className="mr-2 text-blue-300" size={16} />}
        {label}
      </label>
      {renderInput()}
    </div>
  );
};

export default InputField;
