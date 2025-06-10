import { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of your context
interface GlobalContextType {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}

// Create context with initial undefined value but specify the type
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

// Define props for the provider
interface GlobalProviderProps {
  children: ReactNode;
}

// Context provider component
export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Menu starts closed

  return (
    <GlobalContext.Provider value={{ isMenuOpen, setIsMenuOpen }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook to use the context
export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};
