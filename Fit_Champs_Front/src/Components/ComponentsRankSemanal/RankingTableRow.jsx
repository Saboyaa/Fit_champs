import React from "react";
import { User, ArrowUp, ArrowDown, Minus } from "lucide-react";
import { Medal } from "lucide-react";

const RankingTableRow = ({ user, index, isCurrentUser }) => {
  // Função para renderizar medalha baseada na posição
  const renderMedal = (position) => {
    if (position === 1) {
      return <Medal size={24} className="text-yellow-500" />;
    } else if (position === 2) {
      return <Medal size={24} className="text-gray-400" />;
    } else if (position === 3) {
      return <Medal size={24} className="text-amber-700" />;
    }
    return (
      <span className="text-lg font-bold ml-2 w-6 text-center">{position}</span>
    );
  };

  // Função para obter ícone de mudança de posição
  const getPositionChangeIcon = (current, previous) => {
    const diff = previous - current;
    if (diff > 0) {
      return <ArrowUp className="text-green-500" size={16} />;
    } else if (diff < 0) {
      return <ArrowDown className="text-red-500" size={16} />;
    } else {
      return <Minus className="text-gray-500" size={16} />;
    }
  };

  // Função para formatar a mudança de posição
  const formatPositionChange = (current, previous) => {
    const diff = previous - current;
    if (diff > 0) {
      return `+${diff}`;
    } else if (diff < 0) {
      return `${diff}`;
    } else {
      return "=";
    }
  };

  return (
    <tr
      className={`transition-colors ${
        isCurrentUser
          ? "bg-blue-900/50"
          : index % 2 === 0
          ? "bg-sky-900/30"
          : "bg-sky-900/10"
      } hover:bg-sky-800/30`}
    >
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">{renderMedal(index + 1)}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            {user.foto ? (
              <img
                className="h-10 w-10 rounded-full object-cover"
                src={user.foto}
                alt={user.nome}
              />
            ) : (
              <div className="h-10 w-10 rounded-full bg-blue-800/50 flex items-center justify-center">
                <User className="h-6 w-6 text-blue-300" />
              </div>
            )}
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-white flex items-center">
              {user.nome}
              {isCurrentUser && (
                <span className="ml-2 inline-block bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
                  Você
                </span>
              )}
            </div>
            <div className="text-xs text-blue-300">{user.idade} anos</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-white bg-sky-800/50 rounded-full px-3 py-1 inline-block text-center">
          {user.pontos} pts
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          {getPositionChangeIcon(index + 1, user.posicaoAnterior)}
          <span
            className={`ml-1 ${
              user.posicaoAnterior > index + 1
                ? "text-green-400"
                : user.posicaoAnterior < index + 1
                ? "text-red-400"
                : "text-gray-400"
            }`}
          >
            {formatPositionChange(index + 1, user.posicaoAnterior)}
          </span>
        </div>
      </td>
    </tr>
  );
};

export default RankingTableRow;
