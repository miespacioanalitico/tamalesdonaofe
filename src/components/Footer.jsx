// src/components/Footer.jsx
import React from 'react';

export default function Footer() {
    // Obtenemos el año actual
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-primary text-white p-6 mt-12 shadow-inner border-t-4 border-accent" aria-label="Pie de página e información legal">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                
                {/* Columna 1: Contacto Rápido */}
                <div>
                    <h4 className="text-xl font-bold mb-3 text-secondary border-b border-secondary/50 inline-block">Contáctanos</h4>
                    <p className="mt-2">
                        <span className="font-semibold">WhatsApp:</span> <a href="https://wa.me/527226540066" className="underline hover:text-accent transition">52 722 654 0066</a>
                    </p>
                    <p>
                        <span className="font-semibold">Email:</span> <a href="mailto:contacto@tamalesdonaofe.com" className="underline hover:text-accent transition">contacto@tamalesdonaofe.com</a>
                    </p>
                </div>

                {/* Columna 2: Redes Sociales */}
                <div className="flex flex-col items-center md:items-start">
                    <h4 className="text-xl font-bold mb-3 text-secondary border-b border-secondary/50 inline-block">Síguenos</h4>
                    <div className="flex gap-4 mt-2">
                        <a href="https://facebook.com/tamalesdonaofe" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition transform hover:scale-110" aria-label="Facebook">
                            {/* Icono de Facebook */}
                            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.59 0 0 .59 0 1.326v21.348C0 23.41.59 24 1.326 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.92.001c-1.504 0-1.797.716-1.797 1.765v2.317h3.587l-.467 3.622h-3.12V24h6.116c.736 0 1.326-.59 1.326-1.326V1.326C24 .59 23.41 0 22.675 0"/></svg>
                        </a>
                        <a href="https://instagram.com/tamalesdonaofe" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition transform hover:scale-110" aria-label="Instagram">
                            {/* Icono de Instagram */}
                            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M16.5 2h-9A4.5 4.5 0 003 6.5v9A4.5 4.5 0 007.5 20h9a4.5 4.5 0 004.5-4.5v-9A4.5 4.5 0 0016.5 2zM12 17a5 5 0 110-10 5 5 0 010 10zm7-11a1 1 0 10-2 0 1 1 0 002 0z"/></svg>
                        </a>
                        <a href="https://tiktok.com/@tamalesdonaofe" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition transform hover:scale-110" aria-label="TikTok">
                            {/* Icono de TikTok (usando un SVG simple como placeholder) */}
                            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c6.627 0 12 5.373 12 12s-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0zm-1.884 14.532h-3.95v-3.712h3.95v3.712zm6.768-4.502c.737 0 1.336-.598 1.336-1.336s-.599-1.336-1.336-1.336-1.336.598-1.336 1.336.599 1.336 1.336 1.336zM12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm1.684 15.346c-1.353.11-2.607-.22-3.66-1.047v2.857c0 .12-.1.22-.22.22H8.38c-.12 0-.22-.1-.22-.22V9.623c0-.12.1-.22.22-.22h2.298c.12 0 .22.1.22.22v4.868c.883.693 1.968.995 3.037.93 1.258-.075 2.454-.627 3.395-1.57.12-.12.12-.314 0-.433-.12-.12-.314-.12-.434 0-.796.796-1.742 1.25-2.738 1.288-1.01-.039-2.015-.41-2.825-1.127z"/></svg>
                        </a>
                    </div>
                </div>

                {/* Columna 3: Legal y Derechos */}
                <div className="md:col-span-1">
                    <h4 className="text-xl font-bold mb-3 text-secondary border-b border-secondary/50 inline-block">Información</h4>
                    <p className="mt-2 text-sm">
                        © {currentYear} Tamales Caseros Doña Ofe. Todos los derechos reservados.
                    </p>
                    <p className="text-sm">
                        Precios y disponibilidad sujetos a cambios sin previo aviso.
                    </p>
                    <p className="text-sm mt-2 italic">
                        Desarrollado con React y Tailwind. Sabor y tradición mexicana.
                    </p>
                </div>
            </div>
        </footer>
    );
}
