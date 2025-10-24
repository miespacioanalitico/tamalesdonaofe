// src/hooks/useNavigation.js
import { useState, useEffect } from 'react';
import { NAVS } from '../data/constants';

// Hook personalizado para manejar la navegación por secciones y el hash de la URL
export function useNavigation() {
  const [section, setSection] = useState('hero');

  // 1. Determina la sección inicial desde el hash de la URL
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    const initialSection = NAVS.find(nav => nav.key === hash)?.key || 'hero';
    setSection(initialSection);
  }, []);

  // 2. Función para cambiar de sección
  const navigateTo = (newSectionKey) => {
    // Busca si la clave de la sección existe en NAVS para obtener el target (el hash)
    const navItem = NAVS.find(nav => nav.key === newSectionKey);
    
    if (navItem) {
      setSection(newSectionKey);
      // Actualiza la URL sin recargar la página
      window.history.pushState(null, '', navItem.target);
    } else {
      console.warn(`Sección de navegación no encontrada para la clave: ${newSectionKey}`);
    }
  };

  return [section, navigateTo];
}
