// CharacterContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define a type for the character data
interface CharacterData {
  bgImage: string;
  bg: string;
  name: string;
  title: string;
  description: string;
  txtImage: string;
}

// Define a type for the context, including the selected character and an update function
interface CharacterContextType {
  selectedCharacter: CharacterData | null;
  setSelectedCharacter: (character: CharacterData) => void;
}

// Create the context with a default value
const CharacterContext = createContext<CharacterContextType | undefined>(undefined);

// Custom hook for easy access to the context
export const useCharacter = () => {
  const context = useContext(CharacterContext);
  if (!context) {
    throw new Error('useCharacter must be used within a CharacterProvider');
  }
  return context;
};

// Create the provider component
export const CharacterProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterData | null>(null);

  return (
    <CharacterContext.Provider value={{ selectedCharacter, setSelectedCharacter }}>
      {children}
    </CharacterContext.Provider>
  );
};
