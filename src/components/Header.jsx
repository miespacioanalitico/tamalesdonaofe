// src/components/Header.jsx
import React, { useState } from 'react'
import { NAVS } from '../data/constants' // Importamos las constantes

export default function Header({ setSection, section }) {
  const [open, setOpen] = useState(false)
  
  // Función para cerrar el menú y navegar
  const handleNavClick = (key) => {
    setSection(key);
    setOpen(false);
  };

  return (
    <header className="bg-primary text-white sticky top-0 z-30 shadow-lg" id="inicio">
      <nav className="flex items-center justify-between max-w-7xl mx-auto py-2 px-4">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Logo Tamales Doña Ofe" className="h-10 w-10 rounded-full shadow-lg" />
          <span className="font-bold text-xl tracking-wide whitespace-nowrap">Tamales Caseros Doña Ofe</span>
        </div>
        
        {/* Navegación de Escritorio */}
        <div className="hidden md:flex gap-4">
          {NAVS.map(nav => (
            <button
              key={nav.key}
              className={`btn-animate px-3 py-2 rounded hover:bg-secondary focus:bg-secondary transition font-semibold ${section === nav.key ? 'bg-secondary text-primary shadow-md scale-105' : ''}`}
              aria-current={section === nav.key ? 'page' : undefined}
              onClick={() => handleNavClick(nav.key)}
            >
              {nav.label}
            </button>
          ))}
        </div>
        
        {/* Botón de Menú Móvil */}
        <div className="md:hidden">
          <button aria-label="Abrir menú" className="btn-animate p-2" onClick={() => setOpen(o => !o)}>
            <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
          </button>
        </div>
      </nav>
      
      {/* Menú móvil desplegable */}
      {open &&
        <nav aria-label="Menú móvil" className="md:hidden bg-primary text-white px-4 py-2 space-y-1 fade-in">
          {NAVS.map(nav => (
            <button
              key={nav.key}
              className={`block w-full text-left px-4 py-2 rounded btn-animate ${section === nav.key ? 'bg-secondary text-primary' : 'hover:bg-accent/50'}`}
              aria-current={section === nav.key ? 'page' : undefined}
              onClick={() => handleNavClick(nav.key)}
            >
              {nav.label}
            </button>
          ))}
        </nav>
      }
    </header>
  )
}
