// src/components/FloatingButtons.jsx
import React, { useContext } from 'react';
import { NavContext } from '../hooks/useNavigation'; // Importamos el contexto de navegación

export default function FloatingButtons() {
  const { setSection } = useContext(NavContext);

  // Mueve la vista al inicio ('hero') al hacer clic
  const handleGoHome = () => {
    setSection('hero');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div aria-label="Botones sociales y de navegación rápida" className="fixed right-4 bottom-4 flex flex-col gap-4 z-40">
      
      {/* Botón Flotante para ir a Inicio/Top */}
      <button 
        onClick={handleGoHome}
        className="btn-animate bg-primary text-white p-4 rounded-full shadow-xl hover:bg-accent focus:bg-accent transition-all duration-300 transform hover:scale-110" 
        aria-label="Ir al inicio de la página"
        title="Inicio rápido"
      >
        {/* Icono de flecha arriba */}
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18"/></svg>
      </button>

      {/* Botón de YouTube */}
      <a href="https://youtube.com" target="_blank" rel="noopener" className="btn-animate bg-primary text-white p-3 rounded-full shadow-lg hover:bg-accent focus:bg-accent transition-all duration-300 transform hover:scale-110" aria-label="YouTube" title="Nuestro canal de YouTube">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a2.986 2.986 0 00-2.102-2.111C19.104 3.529 12 3.529 12 3.529s-7.104 0-9.396.546A2.986 2.986 0 00.502 6.186C0 8.396 0 12 0 12s0 3.604.502 5.814a2.986 2.986 0 002.102 2.111c2.292.546 9.396.546 9.396.546s7.104 0 9.396-.546a2.986 2.986 0 002.102-2.111C24 15.604 24 12 24 12s0-3.604-.502-5.814z"/><path fill="#FFF" d="M9.73 15.424V8.576L15.656 12z"/></svg>
      </a>
      
      {/* Botón de Instagram */}
      <a href="https://instagram.com" target="_blank" rel="noopener" className="btn-animate bg-primary text-white p-3 rounded-full shadow-lg hover:bg-accent focus:bg-accent transition-all duration-300 transform hover:scale-110" aria-label="Instagram" title="Síguenos en Instagram">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M16.5 2h-9A4.5 4.5 0 003 6.5v9A4.5 4.5 0 007.5 20h9a4.5 4.5 0 004.5-4.5v-9A4.5 4.5 0 0016.5 2zM12 17a5 5 0 110-10 5 5 0 010 10zm7-11a1 1 0 10-2 0 1 1 0 002 0z"/></svg>
      </a>

      {/* Botón de Facebook */}
      <a href="https://facebook.com" target="_blank" rel="noopener" className="btn-animate bg-primary text-white p-3 rounded-full shadow-lg hover:bg-accent focus:bg-accent transition-all duration-300 transform hover:scale-110" aria-label="Facebook" title="Encuéntranos en Facebook">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.59 0 0 .59 0 1.326v21.348C0 23.41.59 24 1.326 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.92.001c-1.504 0-1.797.716-1.797 1.765v2.317h3.587l-.467 3.622h-3.12V24h6.116c.736 0 1.326-.59 1.326-1.326V1.326C24 .59 23.41 0 22.675 0"/></svg>
      </a>
      
      {/* Botón de WhatsApp (Se deja abajo por ser el más importante) */}
      <a href="https://wa.me/527226540066" target="_blank" rel="noopener" className="btn-animate bg-accent text-white p-4 rounded-full shadow-xl hover:bg-primary focus:bg-primary transition-all duration-300 transform hover:scale-110" aria-label="WhatsApp para pedidos" title="Pedir por WhatsApp">
        {/* Ícono de WhatsApp ligeramente más grande y destacado */}
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.028-.967-.271-.099-.469-.149-.668.15-.197.297-.767.967-.941 1.164-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.447-.52.149-.173.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.668-1.611-.916-2.207-.242-.58-.487-.5-.668-.51-.173-.007-.372-.009-.571-.009-.198 0-.52.074-.792.372-.272.298-1.044 1.02-1.044 2.479 0 1.459 1.07 2.871 1.219 3.069.149.198 2.109 3.229 5.105 4.521.714.308 1.27.492 1.704.629.715.228 1.366.196 1.88.119.574-.085 1.758-.719 2.008-1.413.248-.694.248-1.288.174-1.413-.074-.124-.272-.198-.57-.347z"/></svg>
      </a>
    </div>
  )
}
