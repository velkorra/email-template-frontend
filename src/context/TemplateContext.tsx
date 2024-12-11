import React, { createContext, useContext, useState } from "react";

interface TemplateSettings {
  fontSize: number;
  fontFamily: string;
  backgroundColor: string;
  setFontSize: (size: number) => void;
  setFontFamily: (family: string) => void;
  setBackgroundColor: (color: string) => void;
}

const TemplateContext = createContext<TemplateSettings | undefined>(undefined);

export const TemplateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [fontSize, setFontSize] = useState(16);
  const [fontFamily, setFontFamily] = useState("Arial");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");

  return (
    <TemplateContext.Provider
      value={{
        fontSize,
        fontFamily,
        backgroundColor,
        setFontSize,
        setFontFamily,
        setBackgroundColor,
      }}
    >
      {children}
    </TemplateContext.Provider>
  );
};

export const useTemplateContext = () => {
  const context = useContext(TemplateContext);
  if (!context) {
    throw new Error("useTemplateContext must be used within a TemplateProvider");
  }
  return context;
};
