// src/components/ProductGallery.jsx
import React, { useState, useEffect } from 'react'

// El componente ahora espera recibir el objeto 'product' completo.
export default function ProductGallery({ product, onClose }) {
  const [idx, setIdx] = useState(0)
  
  // Aseguramos que 'product' tenga imágenes y videos definidos
  const { images = [], description = '', videos = [], label, price } = product || {};
  
  useEffect(() => {
    function keyHandler(e) {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") setIdx(i => (i > 0 ? i - 1 : i))
      if (e.key === "ArrowRight") setIdx(i => (i < images.length - 1 ? i + 1 : i))
    }
    window.addEventListener("keydown", keyHandler)
    return () => window.removeEventListener("keydown", keyHandler)
  }, [onClose, images.length])

  // Offset modal below header (assume header is 64px tall, adjust if needed)
  const headerHeight = 64

  return (
    <div
      className="fixed left-0 right-0 z-[9999] bg-black/70 flex items-start justify-center overflow-y-auto"
      style={{ top: headerHeight, bottom: 0 }}
      role="dialog"
      aria-modal="true"
      aria-label={`Galería de ${label}`}
      tabIndex={-1}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-lg relative flex flex-col items-center mt-6 mb-6 transform transition-transform duration-300 scale-95 md:scale-100"
        onClick={e => e.stopPropagation()}
      >
        <button
          aria-label="Cerrar galería"
          className="absolute top-4 right-4 bg-red-600 hover:bg-red-800 text-white rounded-full p-2 w-10 h-10 flex items-center justify-center shadow-lg font-bold z-[10000] transition-all duration-300 transform hover:scale-110"
          onClick={onClose}
        >✖</button>
        
        <h2 className="text-3xl font-extrabold text-accent mb-2 text-center">{label}</h2>
        <p className="text-xl font-bold text-primary mb-4 text-center">${price} MXN</p>

        {/* Imagen principal grande */}
        <img
          src={images[idx]}
          alt={`Imagen del producto ${label} - ${idx + 1}`}
          className="rounded-xl mb-4 w-full max-h-[350px] object-cover border-4 border-secondary shadow-lg transition-all duration-300"
          loading="lazy"
        />
        
        <p className="mb-4 text-gray-700 font-semibold text-center">{description}</p>

        {/* Controles carrusel */}
        <div className="flex justify-center items-center gap-4 mb-4">
          <button
            aria-label="Imagen anterior"
            className="btn-animate px-3 py-1 rounded bg-secondary text-primary font-bold text-xl hover:bg-primary hover:text-white"
            disabled={idx === 0}
            onClick={() => setIdx(i => i - 1)}
          >&lt;</button>
          <span className="px-3 font-bold text-lg">{idx + 1} / {images.length}</span>
          <button
            aria-label="Imagen siguiente"
            className="btn-animate px-3 py-1 rounded bg-secondary text-primary font-bold text-xl hover:bg-primary hover:text-white"
            disabled={idx === images.length - 1}
            onClick={() => setIdx(i => i + 1)}
          >&gt;</button>
        </div>

        {/* Miniaturas */}
        {images.length > 1 && (
          <div className="flex justify-center gap-2 mb-6 flex-wrap">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={`border-3 rounded-lg w-16 h-16 overflow-hidden transition-all duration-200 ${idx === i ? 'border-accent scale-105 shadow-md' : 'border-gray-300 opacity-70'}`}
                aria-label={`Ver imagen ${i + 1}`}
                style={{ padding: 0 }}
              >
                <img src={img} alt={`Miniatura ${i + 1}`} className="object-cover w-full h-full" loading="lazy" />
              </button>
            ))}
          </div>
        )}

        {/* Videos de YouTube */}
        {videos.length > 0 && (
          <div className="w-full mt-4 border-t border-secondary pt-4">
            <h3 className="text-accent font-bold mb-3 text-center text-xl">Videos relacionados 📹</h3>
            <div className="grid grid-cols-1 gap-4 items-center">
              {videos.map((url, i) => (
                <div key={i} className="w-full aspect-video rounded-lg overflow-hidden shadow-xl">
                  <iframe
                    width="100%"
                    height="100%"
                    src={url}
                    title={`Video YouTube ${i + 1}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    aria-label={`Video de YouTube ${i + 1}`}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <a 
            href="#contacto"
            className="btn-animate bg-accent text-white px-6 py-3 rounded-lg shadow-xl font-bold text-xl hover:bg-primary focus:bg-primary transition mt-6"
            onClick={onClose} // Cierra el modal al ir a contacto
        >
            ¡Quiero ordenar un {label}! 🛒
        </a>
      </div>
    </div>
  )
}
