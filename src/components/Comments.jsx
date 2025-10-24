// src/components/Comments.jsx
import React, { useState, useEffect, useCallback } from 'react'

// Data de Testimonios con calificación
const TESTIMONIALS = [
  { name: "Juan P. (5/5)", text: "¡Los mejores tamales que he probado! La masa es suave y el mole es auténtico. Atención excelente. 💯", rating: 5 },
  { name: "María S. (5/5)", text: "El atole de chocolate está riquísimo y los tamales de rajas me encantan. Desayuno perfecto. ☕", rating: 5 },
  { name: "Roberto G. (4/5)", text: "Recomiendo la torta de tamal (Guajolota), ¡muy original y sabrosa! Solo le falta un poco más de salsa al de verde. 🌶️", rating: 4 },
  { name: "Luisa F. (5/5)", text: "Tradición y sabor casero. La calidad se nota en cada bocado. Volveré pronto por el de cochinita. ⭐", rating: 5 },
  { name: "Carlos M. (4/5)", text: "Rápidos en el pedido por WhatsApp. El tamal de mole es de otro nivel. Gracias, Doña Ofe.", rating: 4 }
];

// Componente de Estrellas de Calificación
const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span key={i} className={`text-xl ${i <= rating ? 'text-accent' : 'text-gray-300'}`}>
        ★
      </span>
    );
  }
  return <div className="flex justify-center mb-2">{stars}</div>;
};

export default function Comments() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Función para avanzar al siguiente testimonio
  const nextTestimonial = useCallback(() => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % TESTIMONIALS.length);
  }, []);

  // Efecto para el auto-avance del carrusel
  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000); // Cambia cada 5 segundos
    return () => clearInterval(interval);
  }, [nextTestimonial]);

  const currentTestimonial = TESTIMONIALS[currentIndex];

  return (
    <section aria-labelledby="testimonials-title" id="testimonios" className="mt-8 fade-in bg-primary/20 p-6 rounded-3xl shadow-2xl max-w-3xl mx-auto">
      <h2 id="testimonials-title" className="text-3xl font-extrabold text-primary mb-8 text-center border-b-2 border-accent pb-2">
        Nuestros Clientes Dicen... 🗣️
      </h2>
      
      {/* Carrusel del Testimonio */}
      <div className="relative w-full overflow-hidden min-h-[150px] flex items-center justify-center">
        <div className="bg-secondary/70 rounded-xl shadow-xl p-8 w-full transform transition-all duration-700 ease-in-out">
          {/* Calificación de Estrellas */}
          <StarRating rating={currentTestimonial.rating} />
          
          <p className="text-primary text-xl font-semibold italic text-center mb-4">
            "{currentTestimonial.text}"
          </p>
          <span className="block text-accent font-bold text-lg mt-3 text-center">
            — {currentTestimonial.name}
          </span>
        </div>
        
        {/* Controles de navegación manual (opcional) */}
        <div className="absolute inset-y-0 left-0 flex items-center">
            <button 
                onClick={() => setCurrentIndex(i => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
                className="bg-primary/50 text-white p-2 rounded-r-lg hover:bg-primary transition-all ml-[-20px] shadow-lg focus:outline-none"
                aria-label="Testimonio anterior"
            >
                &lt;
            </button>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center">
            <button 
                onClick={nextTestimonial}
                className="bg-primary/50 text-white p-2 rounded-l-lg hover:bg-primary transition-all mr-[-20px] shadow-lg focus:outline-none"
                aria-label="Testimonio siguiente"
            >
                &gt;
            </button>
        </div>
      </div>
      
      {/* Indicadores de posición */}
      <div className="flex justify-center gap-2 mt-4">
        {TESTIMONIALS.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${currentIndex === index ? 'bg-accent w-4 h-4' : 'bg-primary/50'}`}
            aria-label={`Ir al testimonio ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
