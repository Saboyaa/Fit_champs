import React, { createContext, useContext, useState, ReactNode } from 'react';

// Tipo de treino (ajuste conforme a estrutura real de um treino no seu app)
type Treino = any; // Substitua `any` por um tipo mais específico se souber a estrutura

// Tipagem do contexto
type ExerciciosContextType = {
  treinos: Treino[];
  adicionarTreinos: (novosTreinos: Treino[]) => void;
};

// Criando o contexto
const ExerciciosContext = createContext<ExerciciosContextType | undefined>(undefined);

// Provedor do contexto
export const ExerciciosProvider = ({ children }: { children: ReactNode }) => {
  const [treinos, setTreinos] = useState<Treino[]>([]);

  const adicionarTreinos = (novosTreinos: Treino[]) => {
    setTreinos(novosTreinos);
  };

  return (
    <ExerciciosContext.Provider value={{ treinos, adicionarTreinos }}>
      {children}
    </ExerciciosContext.Provider>
  );
};

// Hook para consumir o contexto com segurança
export const useExercicios = (): ExerciciosContextType => {
  const context = useContext(ExerciciosContext);
  if (!context) {
    throw new Error('useExercicios deve ser usado dentro de um ExerciciosProvider');
  }
  return context;
};
