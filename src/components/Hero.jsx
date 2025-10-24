// src/components/Hero.jsx
import React, { useState } from 'react'

export default function Hero() {
  const [logoOpen, setLogoOpen] = useState(false)

  // Función para desplazar a la sección de Contacto
  const scrollToContact = () => {
    const contactSection = document.getElementById('contacto');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section aria-labelledby="hero-title" className="w-full bg-secondary/80 backdrop-blur-sm rounded-3xl shadow-2xl p-6 mt-4 flex flex-col items-center justify-center border-b-8 border-accent">
      
      {/* Contenedor Principal: Título y Logo */}
      <div className="flex flex-col items-center mb-6">
        <div className="flex items-center justify-center mb-3 relative">
          {/* Logo animado y expandible */}
          <img 
            src="/logo.png"
            alt="Logo Tamales Doña Ofe"
            className="rounded-full shadow-2xl border-6 border-accent cursor-pointer transition-all duration-300 h-32 w-32 md:h-40 md:w-40 hover:scale-105 ring-4 ring-primary ring-offset-4 ring-offset-secondary"
            style={{ objectFit: "contain", background: "white" }}
            onClick={() => setLogoOpen(true)}
            title="Haz clic para ver el logo en detalle"
          />
        </div>
        
        <h1 id="hero-title" className="text-5xl md:text-6xl font-extrabold text-primary mb-2 text-center drop-shadow-lg leading-tight">
          Tamales Caseros Doña Ofe
        </h1>
      </div>

      <p className="text-xl md:text-2xl mb-8 text-primary font-bold text-center italic max-w-2xl">
        "¡El auténtico **sabor casero** de México! Tradición, calidad y alegría en cada bocado de atole y tamal."
      </p>
      
      {/* CTA principal */}
      <button
        onClick={scrollToContact}
        className="btn-animate inline-flex items-center gap-3 bg-accent text-white px-10 py-5 rounded-full shadow-2xl font-bold text-2xl md:text-3xl hover:bg-primary focus:bg-primary transition-all duration-300 transform hover:scale-105 ring-4 ring-accent/50 mb-8"
        aria-label="Ir a la sección para ordenar ahora por WhatsApp"
      >
        <span>¡ORDENA TUS TAMALES AHORA!</span>
        {/* Icono de pedido (bolsa de compra) */}
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
      </button>


      {/* Misión y Visión (Estilo de tarjeta) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl w-full mb-8">
        <MissionVisionCard 
            title="Nuestra Misión" 
            text="Ofrecer tamales y atoles tradicionales con ingredientes frescos y el sabor cálido de la receta familiar, haciendo que cada cliente se sienta como en casa." 
            icon="Misión"
        />
        <MissionVisionCard 
            title="Nuestra Visión" 
            text="Ser reconocidos como el referente de tamales y antojitos mexicanos auténticos, expandiendo nuestra tradición y calidad a más rincones de la CDMX." 
            icon="Visión"
        />
      </div>

      {/* Video destacado y audio con créditos */}
      <div className="flex flex-col items-center my-6 w-full max-w-xl">
        <h3 className="text-2xl font-bold text-accent mb-4 text-center">Conoce Nuestra Tradición</h3>
        <video
          className="rounded-xl shadow-2xl w-full mb-3 border-4 border-primary"
          controls
          poster="/video-poster.jpg"
          src="/video-tamales.mp4"
          aria-label="Video promocional de Tamales Doña Ofe"
        >
          Tu navegador no soporta el video.
        </video>
        
        <audio
          controls
          src="/audio-camionero.mp3"
          className="w-full mt-4 rounded-lg shadow-md"
          aria-label="Audio del vendedor de tamales"
        >
          Tu navegador no soporta el audio.
        </audio>
        <span className="text-xs text-gray-700 mt-1 text-center">Créditos audio: <b>Virtual Camionero Ofi</b></span>
      </div>

      {/* Modal del logo expandido (se mantiene la funcionalidad) */}
      {logoOpen && (
        <div
          className="fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center"
          onClick={() => setLogoOpen(false)}
          aria-modal="true"
          role="dialog"
        >
          <div
            className="relative flex items-center justify-center"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 bg-red-600 hover:bg-red-800 text-white rounded-full p-3 shadow-lg text-2xl font-bold z-[10000]"
              onClick={() => setLogoOpen(false)}
              aria-label="Cerrar logo expandido"
              style={{transform: "translate(50%, -50%)"}}
            >
              ✖
            </button>
            <img
              src="/logo.png"
              alt="Logo Tamales Doña Ofe expandido"
              className="rounded-full border-4 border-accent shadow-2xl"
              style={{
                width: "min(90vw, 380px)",
                height: "min(90vw, 380px)",
                objectFit: "contain",
                background: "white"
              }}
            />
          </div>
        </div>
      )}
    </section>
  )
}

// Componente auxiliar para Misión/Visión
function MissionVisionCard({ title, text, icon }) {
    const getIcon = (iconName) => {
        switch (iconName) {
            case 'Misión':
                // Icono de Corazón (Pasión/Foco)
                return <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 22.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-.318-.318a4.5 4.5 0 00-6.364 0z"/></svg>;
            case 'Visión':
                // Icono de Ojo (Futuro/Expansión)
                return <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>;
            default:
                return null;
        }
    }

    return (
        <div className="bg-white rounded-xl p-5 shadow-lg flex flex-col items-center text-center transition-shadow duration-300 hover:shadow-xl border border-primary/20">
            <div className="mb-2">{getIcon(icon)}</div>
            <span className="font-bold text-primary text-xl mb-1">{title}:</span>
            <span className="text-gray-700 text-base italic">{text}</span>
        </div>
    );
}
