import React, { createContext, useContext, useState, ReactNode } from 'react';

// Definindo os tipos do contexto
type GlobalContextType = {
  isMenuOpen: boolean;
  setIsMenuOpen: (value: boolean) => void;
};

// Criando o contexto com valor inicial undefined
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

// Provedor do contexto
export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <GlobalContext.Provider value={{ isMenuOpen, setIsMenuOpen }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Hook personalizado para usar o contexto
export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalContext deve ser usado dentro de um GlobalProvider');
  }
  return context;
};
