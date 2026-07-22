import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';

/**
 * Contexto de Color y Perfil de Marca para RULEC.
 * Guarda el estado global de la elección cromática y el diagnóstico inicial del microempresario.
 */
const ColorContext = createContext(null);

export function ColorProvider({ children }) {
  // Perfil del usuario obtenido o a rellenar en la vista de Diagnóstico
  const [userProfile, setUserProfile] = useState({
    rubro: '',     // e.g., 'gastronomia', 'artesania', 'tecnologia', 'belleza'
    publico: '',   // e.g., 'jovenes', 'familias', 'profesionales'
    emocion: '',   // e.g., 'energia', 'confianza', 'calma', 'elegancia'
  });

  // Color base principal en formato HEX (por defecto, nuestro naranja vibrante de bienvenida)
  const [baseColor, setBaseColor] = useState('#E84F30');

  // Función limpia para actualizar o mezclar los datos del perfil del usuario
  const updateUserProfile = useCallback((newProfileData) => {
    setUserProfile((prev) => ({
      ...prev,
      ...newProfileData,
    }));
  }, []);

  // Función para actualizar directamente el color base exacto HEX
  const updateBaseColor = useCallback((hexColor) => {
    if (!hexColor) return;
    setBaseColor(hexColor);
  }, []);

  const value = useMemo(() => ({
    userProfile,
    setUserProfile,
    updateUserProfile,
    baseColor,
    setBaseColor,
    updateBaseColor,
  }), [userProfile, updateUserProfile, baseColor, updateBaseColor]);

  return (
    <ColorContext.Provider value={value}>
      {children}
    </ColorContext.Provider>
  );
}

/**
 * Hook personalizado para acceder fácilmente y con seguridad de tipado/null-check al ColorContext.
 */
export function useColor() {
  const context = useContext(ColorContext);
  if (!context) {
    throw new Error('useColor debe ser utilizado dentro de un <ColorProvider>');
  }
  return context;
}

export default ColorContext;
