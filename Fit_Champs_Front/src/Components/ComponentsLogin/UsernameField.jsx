import React from "react";

const UsernameField = ({ username, setUsername, disabled = false }) => {
  return (
    <div>
      <label className="block text-blue-200 font-medium mb-2">Usuário</label>
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"
            />
          </svg>
        </span>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={disabled}
          className="w-full pl-10 pr-4 py-3 bg-sky-900/30 border border-sky-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400 disabled:opacity-50"
          placeholder="Digite seu nome de usuário"
        />
      </div>
    </div>
  );
};

export default UsernameField;
