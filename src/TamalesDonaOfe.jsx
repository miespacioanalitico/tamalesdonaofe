// Este es el único archivo de React que contiene toda la aplicación.
// Incluye componentes, lógica y estilos (Tailwind CSS).

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
// Importaciones estándar de Firebase para entornos React/Vite
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, setDoc, onSnapshot, collection, query, addDoc, serverTimestamp, limit } from 'firebase/firestore';

// --- Global Setup for Firebase (Variables inyectadas por el entorno) ---
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';

// Initialize Firebase services outside of React component lifecycle
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// --- Custom Hook to handle Firebase authentication and provide context ---
const useFirebase = () => {
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFirebaseReady, setIsFirebaseReady] = useState(false);

  useEffect(() => {
    const signIn = async () => {
      try {
        if (initialAuthToken) {
          await signInWithCustomToken(auth, initialAuthToken);
        } else {
          await signInAnonymously(auth);
        }
      } catch (error) {
        console.error("Firebase Auth Error:", error);
      }
    };

    signIn();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(crypto.randomUUID()); 
      }
      setLoading(false);
      setIsFirebaseReady(true);
    });

    return () => unsubscribe();
  }, []);

  // Proporciona los objetos y estados de Firebase
  return { 
    db, 
    auth, 
    userId, 
    appId, 
    loading, 
    isFirebaseReady 
  };
};

// --- 1. CORE IDENTITY & CONSTANTS ---

const COLORS = {
  primary: '#BE6A15', // Cacao/Canela
  secondary: '#F2C572', // Masa de Maíz
  accent: '#E94F37', // Chile Rojo
  text: '#4A2A0A',
};

const CONTACT = {
  phone: '7221650301',
  fullPhone: '+52 722 165 0301',
};

// Genera un mensaje de WhatsApp dinámico para el formulario
const generateWhatsAppMessage = (details) => encodeURIComponent(
  `Hola, me gustaría hacer un pedido de tamales. Aquí están los detalles: \n\n${details}\n\n¡Gracias!`
);

// Lista de productos con precios actualizados
const PRODUCTS = [
  { id: 'mole', name: 'Tamal de Mole', price: 19.00, desc: 'Clásico tamal de cerdo en mole, dulce y picosito, envuelto en hoja de plátano.', image: 'https://placehold.co/100x100/BE6A15/ffffff?text=Mole' },
  { id: 'verde', name: 'Tamal Verde', price: 19.00, desc: 'Carne de pollo en salsa verde con un toque de picante y hierbas.', image: 'https://placehold.co/100x100/6A8E3F/ffffff?text=Verde' },
  { id: 'rajas', name: 'Tamal de Rajas', price: 19.00, desc: 'Queso y rajas de chile poblano, cremoso y suave.', image: 'https://placehold.co/100x100/F2C572/BE6A15?text=Rajas' },
  { id: 'atole', name: 'Atole de Vainilla', price: 19.00, desc: 'Bebida tradicional a base de maíz, caliente y dulce.', image: 'https://placehold.co/100x100/F4E7B4/BE6A15?text=Atole' },
  { id: 'guajolota', name: 'Guajolota (Torta de Tamal)', price: 25.00, desc: 'Tamal a elegir dentro de un bolillo crujiente. ¡El desayuno de campeones!', image: 'https://placehold.co/100x100/E94F37/ffffff?text=Torta' },
];

const NAV_ITEMS = [
  { id: 'menu', name: 'Menú', hash: '#menu' },
  { id: 'community', name: 'Comunidad', hash: '#community' },
  { id: 'location', name: 'Ubicación', hash: '#location' },
  { id: 'ia', name: 'Tamalín IA', hash: '#ia' },
];

const TESTIMONIALS = [
  { id: 1, name: 'Sofía R.', rating: 5, comment: 'Los tamales de mole son adictivos. ¡El sabor es justo como el de mi abuela!' },
  { id: 2, name: 'Javier M.', rating: 4, comment: 'Entrega súper rápida y el tamal de rajas estaba perfecto. ¡Recomendado!' },
  { id: 3, name: 'Elena V.', rating: 5, comment: 'La guajolota es la mejor que he probado en Toluca. ¡Ya tienen una clienta fiel!' },
];

const BRANCHES = [
  {
    id: 'principal',
    name: 'Principal o Nuestro Hogar',
    schedule: 'Lunes a Domingo: 8:00 AM - 1:00 PM',
    address: 'Santiago Analco, Estado de México cerca de Capilla de la Santa Cruz, ubicada en avenida Ocotal, entre calle Alameda y Cedros.',
    mapIframe: 'https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3764.7643339937995!2d-99.46421662478811!3d19.336029981922824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTnCsDIwJzA5LjciTiA5OcKwMjcnNDEuOSJX!5e0!3m2!1ses-419!2smx!4v1761353034893!5m2!1ses-419!2smx',
  },
];

const HERO_GALLERY_ITEMS = [
  { type: 'image', url: 'https://placehold.co/800x450/F2C572/BE6A15?text=Tamal+Rojo', alt: 'Tamales rojos en hoja de maíz' },
  { type: 'youtube', url: 'https://www.youtube.com/embed/YOUR_YOUTUBE_ID?autoplay=1&mute=1&controls=0&loop=1&playlist=YOUR_YOUTUBE_ID', alt: 'Video promocional de Tamales Doña Ofe' },
  { type: 'image', url: 'https://placehold.co/800x450/BE6A15/ffffff?text=Café+Caliente', alt: 'Café de olla caliente y humeante' },
];

// Reemplazado por URL para evitar el error de cadena sin terminar (Base64)
const TAMALIN_IMAGE_SRC = "https://placehold.co/100x100/BE6A15/ffffff?text=T";

// --- Utility Components ---

// 3.1 Modal para la Galería (Reutilizado para Agrandar Imagen)
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="relative bg-white p-2 rounded-lg max-w-full max-h-full overflow-auto shadow-2xl" 
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-2 right-2 text-white bg-accent rounded-full p-2 text-lg font-bold transition duration-300 hover:bg-primary z-50"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

// 3.2 Carrusel Automático de Testimonios
const Comments = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % TESTIMONIALS.length);
    }, 5000); // Auto-desplazamiento cada 5 segundos

    return () => clearInterval(interval);
  }, []);

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <span key={i} style={{ color: i < rating ? COLORS.secondary : '#E5E7EB' }}>
        ★
      </span>
    ));
  };

  const testimonial = TESTIMONIALS[currentIndex];

  return (
    <section id="community" className="py-16 bg-white shadow-inner">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <h2 style={{ color: COLORS.primary }} className="text-3xl font-extrabold mb-8">
          Comunidad: El Sabor que Nos Une
        </h2>
        
        <div className="flex justify-center items-center mb-6">
            <img src={TAMALIN_IMAGE_SRC} alt="Tamalín logo" className="w-16 h-16 rounded-full shadow-lg mr-4" />
            <h3 className="text-xl font-semibold text-gray-700">Testimonios de Doña Ofe</h3>
        </div>

        <div className="bg-gray-50 p-6 md:p-10 rounded-xl shadow-lg border-t-4" style={{ borderColor: COLORS.accent }}>
          <p className="text-2xl italic text-gray-800 mb-4 leading-relaxed">
            "{testimonial.comment}"
          </p>
          <div className="text-lg font-medium text-gray-600 mb-2">
            - {testimonial.name}
          </div>
          <div className="text-xl">
            {renderStars(testimonial.rating)}
          </div>
        </div>

        <div className="mt-6 flex justify-center space-x-2">
          {TESTIMONIALS.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${index === currentIndex ? 'bg-accent scale-110' : 'bg-gray-300 hover:bg-secondary'}`}
              style={{ backgroundColor: index === currentIndex ? COLORS.accent : '#D1D5DB' }}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// 3.3 Galería de Productos (Showcase)
const ProductGallery = ({ product, isOpen, onClose }) => {
    if (!isOpen) return null;

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Imágenes simuladas de ejemplo para el modal
    const images = [
      product.image.replace('100x100', '600x400'),
      'https://placehold.co/600x400/D4B783/4A2A0A?text=Detalle+Masa',
      'https://placehold.co/600x400/E94F37/ffffff?text=Ingredientes+Frescos',
    ];

    const nextImage = () => setCurrentImageIndex((currentImageIndex + 1) % images.length);
    const prevImage = () => setCurrentImageIndex((currentImageIndex - 1 + images.length) % images.length);

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="p-6 max-w-lg w-full bg-white rounded-xl shadow-2xl">
                <h3 className="text-3xl font-bold mb-4" style={{ color: COLORS.accent }}>{product.name}</h3>
                <p className="text-lg text-gray-600 mb-4">{product.desc}</p>
                
                {/* Carrusel dentro del Modal */}
                <div className="relative mb-4 rounded-lg overflow-hidden shadow-md">
                    <img 
                        src={images[currentImageIndex]} 
                        alt={product.name} 
                        className="w-full h-full object-cover transition-opacity duration-500"
                    />
                    <div className="absolute inset-0 flex items-center justify-between p-2">
                        <button 
                            onClick={prevImage} 
                            className="bg-black bg-opacity-40 text-white p-2 rounded-full hover:bg-opacity-60 transition"
                        >
                            &#10094;
                        </button>
                        <button 
                            onClick={nextImage} 
                            className="bg-black bg-opacity-40 text-white p-2 rounded-full hover:bg-opacity-60 transition"
                        >
                            &#10095;
                        </button>
                    </div>
                </div>

                <div className="flex justify-between items-center mt-4">
                    <span className="text-xl font-extrabold" style={{ color: COLORS.text }}>
                        Precio: 
                    </span>
                    <span className="text-3xl font-extrabold" style={{ color: COLORS.accent }}>
                        ${product.price.toFixed(2)} MXN
                    </span>
                </div>
            </div>
        </Modal>
    );
};

// 3.4 Componente que muestra la lista de productos
const Gallery = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
    };

    return (
        <section id="menu" className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 style={{ color: COLORS.primary }} className="text-4xl font-extrabold text-center mb-10">
                    Nuestro Menú de Tradición
                </h2>

                <div className="flex justify-center items-center mb-8">
                    <img src={TAMALIN_IMAGE_SRC} alt="Tamalín logo" className="w-16 h-16 rounded-full shadow-lg mr-4" />
                    <h3 className="text-2xl font-semibold text-gray-700">¡Recién Hechos!</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {PRODUCTS.map(product => (
                        <div
                            key={product.id}
                            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-[1.02] cursor-pointer border-t-4"
                            style={{ borderColor: COLORS.secondary }}
                            onClick={() => openModal(product)}
                        >
                            <div className="flex items-center space-x-4">
                                <img 
                                    src={product.image} 
                                    alt={product.name} 
                                    className="w-20 h-20 rounded-lg object-cover border-2" 
                                    style={{ borderColor: COLORS.primary }}
                                    onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/100x100/CCCCCC/000000?text=NA"; }}
                                />
                                <div className="flex-grow">
                                    <h3 className="text-xl font-bold mb-1" style={{ color: COLORS.text }}>{product.name}</h3>
                                    <p className="text-sm text-gray-500 line-clamp-2">{product.desc}</p>
                                </div>
                            </div>
                            <div className="mt-4 text-right">
                                <span className="text-2xl font-extrabold" style={{ color: COLORS.accent }}>
                                    ${product.price.toFixed(2)}
                                </span>
                                <span className="text-base text-gray-500 ml-1">MXN</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {selectedProduct && (
                <ProductGallery 
                    product={selectedProduct} 
                    isOpen={isModalOpen} 
                    onClose={closeModal} 
                />
            )}
        </section>
    );
};


// 5.4 Formulario de Contacto (Calculadora de Pedido)
const ContactForm = () => {
    const [order, setOrder] = useState(PRODUCTS.map(p => ({ ...p, quantity: 0 })));
    const [isCopied, setIsCopied] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);

    const handleQuantityChange = (id, change) => {
        setOrder(prevOrder => prevOrder.map(item =>
            item.id === id ? { ...item, quantity: Math.max(0, item.quantity + change) } : item
        ));
    };

    const total = order.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const generateOrderDetails = () => {
        const items = order.filter(item => item.quantity > 0);
        if (items.length === 0) return "No has seleccionado ningún producto aún.";

        const details = items.map(item => 
            `${item.quantity} x ${item.name} ($${(item.quantity * item.price).toFixed(2)})`
        ).join('\n');

        return `${details}\n\nTOTAL ESTIMADO: $${total.toFixed(2)} MXN`;
    };

    const handleWhatsApp = () => {
        const details = generateOrderDetails();
        const whatsappUrl = `https://wa.me/${CONTACT.phone}?text=${generateWhatsAppMessage(details)}`;
        window.open(whatsappUrl, '_blank');
        
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 3000);
    };

    return (
        <section id="contact-form" className="py-16 bg-gray-50">
            <div className="container mx-auto px-4 max-w-lg">
                <h2 className="text-3xl font-extrabold text-center mb-6" style={{ color: COLORS.accent }}>
                    ¡Ordena Ahora!
                </h2>
                <div className="bg-white p-6 rounded-xl shadow-2xl border-t-8" style={{ borderColor: COLORS.primary }}>
                    
                    <p className="text-gray-600 mb-6 text-center">Calcula tu pedido y genera tu mensaje de WhatsApp en un instante.</p>

                    {/* Lista de Productos para Pedido */}
                    <div className="space-y-4 mb-6">
                        {order.map(item => (
                            <div key={item.id} className="flex items-center justify-between p-3 border-b border-gray-100 last:border-b-0">
                                <div className="flex items-center space-x-3">
                                    <img 
                                        src={item.image} 
                                        alt={item.name} 
                                        className="w-8 h-8 rounded-full object-cover"
                                        onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/100x100/CCCCCC/000000?text=NA"; }}
                                    />
                                    <span className="font-semibold text-gray-700">{item.name}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => handleQuantityChange(item.id, -1)}
                                        className="w-8 h-8 text-white rounded-full transition duration-150 shadow-md"
                                        style={{ backgroundColor: COLORS.accent }}
                                        disabled={item.quantity === 0}
                                    >
                                        -
                                    </button>
                                    <span className="w-8 text-center font-bold text-lg text-text">{item.quantity}</span>
                                    <button
                                        onClick={() => handleQuantityChange(item.id, 1)}
                                        className="w-8 h-8 text-white rounded-full transition duration-150 shadow-md"
                                        style={{ backgroundColor: COLORS.primary }}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Total Estimado */}
                    <div className="flex justify-between items-center border-t border-dashed pt-4 mt-4" style={{ borderColor: COLORS.secondary }}>
                        <span className="text-xl font-bold" style={{ color: COLORS.text }}>Total Estimado:</span>
                        <span className="text-3xl font-extrabold" style={{ color: COLORS.accent }}>
                            ${total.toFixed(2)} MXN
                        </span>
                    </div>

                    {/* Botón de WhatsApp */}
                    <div className="mt-6 relative">
                        <button
                            onClick={handleWhatsApp}
                            onMouseEnter={() => setShowTooltip(true)}
                            onMouseLeave={() => setShowTooltip(false)}
                            className="w-full py-4 text-xl font-extrabold rounded-lg text-white transition duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 disabled:opacity-60"
                            style={{ backgroundColor: COLORS.primary }}
                            disabled={total === 0}
                        >
                            <span>{isCopied ? '¡Mensaje Listo!' : 'Generar Pedido por WhatsApp'}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-whatsapp">
                                <path d="M9 19c-1.5 0-3-.5-4.5-1.5L3 19l1.5-4.5C3.5 13 3 11.5 3 10c0-3.9 3.1-7 7-7s7 3.1 7 7c0 3.9-3.1 7-7 7z"></path>
                            </svg>
                        </button>
                        {showTooltip && total > 0 && (
                            <div className="absolute top-full mt-2 w-full text-center bg-gray-800 text-white text-sm p-2 rounded shadow-lg animate-fadeIn">
                                ¡El mensaje con tu orden se pre-llenará!
                            </div>
                        )}
                        {total === 0 && (
                            <p className="text-center text-sm text-red-500 mt-2">Agrega productos para generar el pedido.</p>
                        )}
                    </div>

                </div>
            </div>
        </section>
    );
};


// 4.1 Chatbot Vendedor Experto (Tamalín)
const ChatbotGemini = () => {
  const { db, userId, isFirebaseReady } = useFirebase();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll al final de los mensajes
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  // Función para guardar mensajes en Firestore
  const saveMessage = useCallback(async (sender, text, sources = []) => {
    if (!db || !userId) {
      console.error("Firestore not ready or user ID missing.");
      return;
    }
    
    try {
      const chatCollectionRef = collection(db, `artifacts/${appId}/users/${userId}/chats`);
      await addDoc(chatCollectionRef, {
        sender,
        text,
        timestamp: serverTimestamp(),
        sources: sources,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }, [db, userId, appId]);

  // Función para manejar reintentos de fetch (Gemini API)
  const fetchWithRetry = useCallback(async (url, options, maxRetries = 3) => {
    for (let i = 0; i < maxRetries; i++) {
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response;
      } catch (error) {
        if (i === maxRetries - 1) throw error;
        await new Promise(resolve => setTimeout(resolve, 2 ** i * 1000)); // Exponential backoff
      }
    }
  }, []);

  const systemInstruction = `
    Actúa como 'Tamalín, El Vendedor Experto', un vendedor de tamales mexicano muy amable, entusiasta y con un tono de voz que inspira confianza.
    Tu objetivo es vender tamales y atole, responder preguntas sobre el menú, ingredientes, y ubicación de forma detallada y atractiva.
    Responde siempre en español y utiliza modismos amigables mexicanos (ej. "¡Órale!", "Claro que sí, mi buen", "Qué chido").
    
    Menú de Tamales Doña Ofe:
    - Tamal de Mole: $19.00 (Cerdo y mole, dulce y picosito).
    - Tamal Verde: $19.00 (Pollo y salsa verde, picante medio).
    - Tamal de Rajas: $19.00 (Queso y rajas poblanas, cremoso).
    - Atole de Vainilla: $19.00 (Bebida de maíz caliente).
    - Guajolota (Torta de Tamal): $25.00 (Tamal a elegir en bolillo).

    Si la pregunta es sobre el menú o los tamales, no uses Google Search. Responde con la información que tienes.
    Si la pregunta es externa (historia del tamal, otros lugares, recetas), usa la herramienta Google Search.
  `;

  // Función para enviar mensaje a Gemini
  const sendMessageToGemini = useCallback(async (userMessage) => {
    const apiKey = ""; 
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

    const historyForAPI = messages.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));

    const fullHistory = [...historyForAPI, { role: 'user', parts: [{ text: userMessage }] }];

    const payload = {
      contents: fullHistory,
      tools: [{ "google_search": {} }], // Habilitar Google Search
      systemInstruction: {
        parts: [{ text: systemInstruction }]
      },
    };

    try {
      const response = await fetchWithRetry(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      const candidate = result.candidates?.[0];
      let aiText = "¡Ay, caray! Perdón, se me fue la masa. No pude procesar tu solicitud, pero ya estoy listo para servirte.";
      let sources = [];

      if (candidate && candidate.content?.parts?.[0]?.text) {
        aiText = candidate.content.parts[0].text;
        
        // Extracción de fuentes
        const groundingMetadata = candidate.groundingMetadata;
        if (groundingMetadata && groundingMetadata.groundingAttributions) {
          sources = groundingMetadata.groundingAttributions
            .map(attribution => ({
              uri: attribution.web?.uri,
              title: attribution.web?.title,
            }))
            .filter(source => source.uri && source.title);
        }
      }

      await saveMessage('model', aiText, sources);

    } catch (error) {
      console.error("Error al llamar a Gemini API:", error);
      await saveMessage('model', "¡Híjole! Parece que mi conexión con la IA falló. Pero no te preocupes, los tamales siguen calientitos. ¿Qué más se te ofrece?", []);
    } finally {
      setIsLoading(false);
    }
  }, [messages, fetchWithRetry, systemInstruction, saveMessage]);

  // Listener para cargar mensajes de Firestore
  useEffect(() => {
    if (!db || !userId || !isFirebaseReady) return;

    // Ruta de la colección: /artifacts/{appId}/users/{userId}/chats
    const chatCollectionRef = collection(db, `artifacts/${appId}/users/${userId}/chats`);
    const q = query(chatCollectionRef, limit(50));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })).sort((a, b) => a.timestamp?.toMillis() - b.timestamp?.toMillis());
      setMessages(msgs);
    }, (error) => {
      console.error("Error fetching chat messages:", error);
    });

    return () => unsubscribe();
  }, [db, userId, appId, isFirebaseReady]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !isFirebaseReady) return;

    const userMessage = input.trim();
    setInput('');
    setIsLoading(true);

    // Guardar mensaje del usuario
    saveMessage('user', userMessage);

    // Enviar a Gemini
    sendMessageToGemini(userMessage);
  };

  const getChatbotGreeting = () => {
      const today = new Date();
      const day = today.getDay(); // 0 = Domingo, 1 = Lunes, etc.
      const hour = today.getHours();

      // Horario de atención: Domingos de 10 am a 1 pm (10 a 13 horas)
      if (day === 0 && hour >= 10 && hour < 13) {
          return "¡Órale! Soy Tamalín, El Vendedor Experto. Estamos en horario de atención. ¿Qué se le ofrece, mi buen? ¡Pura tradición y sabor!";
      } else {
          return "¡Hola! Soy Tamalín. Nuestro horario de atención para pedidos es solo los **Domingos de 10 am a 1 pm**. Pregúntame lo que quieras sobre el menú o la historia del tamal, ¡estoy aquí 24/7 para platicar!";
      }
  };


  return (
    <section id="ia" className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 style={{ color: COLORS.primary }} className="text-4xl font-extrabold text-center mb-8">
          Tamalín IA: Tu Vendedor Experto
        </h2>

        {/* Contenedor del Chatbot */}
        <div className="flex flex-col h-[500px] bg-gray-50 rounded-xl shadow-2xl border border-gray-200">
          
          {/* Cabecera del Chat */}
          <div className="p-4 rounded-t-xl shadow-md flex items-center justify-between" style={{ backgroundColor: COLORS.primary }}>
            <div className="flex items-center">
              <img src={TAMALIN_IMAGE_SRC} alt="Tamalín" className="w-10 h-10 rounded-full mr-3 border-2 border-white" />
              <h3 className="text-xl font-bold text-white">Tamalín</h3>
            </div>
            <p className="text-sm text-white font-light">{getChatbotGreeting()}</p>
          </div>

          {/* Área de Mensajes */}
          <div className="flex-grow p-4 overflow-y-auto space-y-4">
            {messages.length === 0 && (
                <div className="text-center text-gray-500 mt-20">
                    <img src={TAMALIN_IMAGE_SRC} alt="Tamalín" className="w-20 h-20 mx-auto mb-4 opacity-70" />
                    <p>{getChatbotGreeting()}</p>
                </div>
            )}
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] p-3 rounded-xl shadow-md ${
                    msg.sender === 'user' 
                      ? 'bg-accent text-white rounded-br-none' 
                      : 'bg-secondary text-text rounded-tl-none'
                  }`}
                  style={{ backgroundColor: msg.sender === 'user' ? COLORS.accent : COLORS.secondary }}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="mt-2 text-xs opacity-80">
                      <p className="font-semibold">Fuentes:</p>
                      <ul className="list-disc pl-4">
                        {msg.sources.map((src, index) => (
                          <li key={index}>
                            <a href={src.uri} target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition duration-200">
                              {src.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-200 text-gray-700 p-3 rounded-xl rounded-tl-none animate-pulse">
                  Tamalín está pensando...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Área de Entrada */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 bg-white rounded-b-xl">
            <div className="flex space-x-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isLoading ? "Esperando respuesta..." : "Pregúntale a Tamalín sobre tamales o ubicación..."}
                className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-offset-2"
                style={{ focusRingColor: COLORS.primary }}
                disabled={isLoading || !isFirebaseReady}
              />
              <button
                type="submit"
                className="p-3 rounded-lg font-bold text-white transition duration-300 shadow-md disabled:opacity-50"
                style={{ backgroundColor: COLORS.primary, hoverBackgroundColor: COLORS.accent }}
                disabled={isLoading || !isFirebaseReady || !input.trim()}
              >
                Enviar
              </button>
            </div>
            {!isFirebaseReady && !isLoading && (
                <p className="text-center text-sm text-red-500 mt-2">
                    Cargando servicios de Firebase. Espera un momento...
                </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};


// 4.2 Ubicación y Mapa Interactivo
const UbicacionGoogleMaps = ({ branch }) => (
    <div className="w-full h-80 rounded-xl overflow-hidden shadow-xl mb-6">
        <iframe
            src={branch.mapIframe}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`Mapa de ${branch.name}`}
        ></iframe>
    </div>
);

const UbicacionGallery = () => (
    <section id="location" className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 max-w-4xl">
            <h2 style={{ color: COLORS.primary }} className="text-4xl font-extrabold text-center mb-10">
                Ubicación
            </h2>
            
            <div className="flex justify-center items-center mb-8">
                <img src={TAMALIN_IMAGE_SRC} alt="Tamalín logo" className="w-16 h-16 rounded-full shadow-lg mr-4" />
                <h3 className="text-2xl font-semibold text-gray-700">¡Aquí nos encuentras!</h3>
            </div>

            {BRANCHES.map(branch => (
                <div key={branch.id} className="bg-white p-6 rounded-xl shadow-2xl mb-8">
                    <UbicacionGoogleMaps branch={branch} />
                    
                    <h3 className="text-2xl font-bold mb-3" style={{ color: COLORS.accent }}>{branch.name}</h3>
                    
                    <div className="space-y-2 text-gray-700">
                        <p className="flex items-start">
                            <span className="font-bold mr-2 w-20 flex-shrink-0">Dirección:</span>
                            <span>{branch.address}</span>
                        </p>
                        <p className="flex items-start">
                            <span className="font-bold mr-2 w-20 flex-shrink-0">Horario:</span>
                            <span>{branch.schedule}</span>
                        </p>
                        <p className="flex items-start">
                            <span className="font-bold mr-2 w-20 flex-shrink-0">Teléfono:</span>
                            <a href={`tel:${CONTACT.phone}`} className="text-blue-600 hover:underline">{CONTACT.fullPhone}</a>
                        </p>
                    </div>
                </div>
            ))}
        </div>
    </section>
);


// 5.1 Footer
const Footer = () => (
    <footer className="py-8 text-center text-white" style={{ backgroundColor: COLORS.text }}>
        <p className="text-sm">&copy; {new Date().getFullYear()} Tamales Doña Ofe. Sabor, Tradición y Café.</p>
        <p className="text-xs mt-1 opacity-70">Desarrollado con React y Vercel/GitHub.</p>
    </footer>
);

// 5.2 Botón Flotante de WhatsApp
const WhatsAppButton = () => (
    <a 
        href={`https://wa.me/${CONTACT.phone}?text=${generateWhatsAppMessage('Quisiera hacer un pedido de sus deliciosos tamales.')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 p-4 bg-green-500 text-white rounded-full shadow-xl hover:bg-green-600 transition duration-300 z-50 transform hover:scale-105"
        aria-label="Contactar por WhatsApp"
    >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-message-circle">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
    </a>
);

// 5.3 Carrusel de Galería en Hero (Con modal de zoom)
const HeroGallery = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isZoomModalOpen, setIsZoomModalOpen] = useState(false);
    const [zoomedItem, setZoomedItem] = useState(null);

    // Carrusel automático (1-2 segundos)
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % HERO_GALLERY_ITEMS.length);
        }, 2000); 

        return () => clearInterval(interval);
    }, []);

    const openZoomModal = (item) => {
        setZoomedItem(item);
        setIsZoomModalOpen(true);
    };

    const closeZoomModal = () => {
        setIsZoomModalOpen(false);
        setZoomedItem(null);
    };

    const currentItem = HERO_GALLERY_ITEMS[currentIndex];

    return (
        <div className="w-full relative rounded-xl overflow-hidden shadow-2xl">
            {/* Contenido Principal del Carrusel */}
            <div className="aspect-video w-full">
                {currentItem.type === 'image' && (
                    <img 
                        src={currentItem.url} 
                        alt={currentItem.alt} 
                        className="w-full h-full object-cover cursor-pointer transition-opacity duration-500"
                        onClick={() => openZoomModal(currentItem)}
                        onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/800x450/CCCCCC/000000?text=IMAGEN+NO+DISPONIBLE"; }}
                    />
                )}
                {currentItem.type === 'youtube' && (
                    <iframe 
                        className="w-full h-full"
                        src={currentItem.url} 
                        title={currentItem.alt} 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        allowFullScreen
                    ></iframe>
                )}
            </div>

            {/* Navegación del Carrusel (Puntos) */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                {HERO_GALLERY_ITEMS.map((item, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full transition-colors duration-300 ${index === currentIndex ? 'bg-white scale-110 shadow-md' : 'bg-gray-400 bg-opacity-70 hover:bg-white'}`}
                        aria-label="Go to slide"
                    />
                ))}
            </div>

            {/* Modal de Zoom */}
            {zoomedItem && (
                <Modal isOpen={isZoomModalOpen} onClose={closeZoomModal}>
                    {zoomedItem.type === 'image' ? (
                        <img 
                            src={zoomedItem.url.replace('800x450', '1200x800')} 
                            alt={zoomedItem.alt} 
                            className="max-w-screen max-h-[90vh] object-contain rounded-lg" 
                        />
                    ) : (
                        <div className="w-[90vw] h-[50vh] md:w-[800px] md:h-[450px]">
                             <iframe 
                                className="w-full h-full"
                                src={zoomedItem.url.replace('?autoplay=1&mute=1&controls=0&loop=1&playlist=YOUR_YOUTUBE_ID', '?autoplay=1')} // Reproducción con controles
                                title={zoomedItem.alt} 
                                frameBorder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                allowFullScreen
                            ></iframe>
                        </div>
                    )}
                </Modal>
            )}
        </div>
    );
};

// 5.5 Header
const Header = ({ navItems }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleScroll = (hash) => {
        const element = document.querySelector(hash);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsMenuOpen(false); // Cierra el menú en móvil después de hacer clic
        }
    };

    return (
        <header className="sticky top-0 z-40 shadow-lg backdrop-blur-md" style={{ backgroundColor: `${COLORS.primary}E0` }}>
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                
                {/* Logo / Título de Marca */}
                <a href="#" onClick={(e) => { e.preventDefault(); handleScroll('#root'); }} className="flex items-center space-x-2">
                    <img src={TAMALIN_IMAGE_SRC} alt="Logo Tamalín" className="w-8 h-8 rounded-full border-2" style={{ borderColor: COLORS.secondary }} />
                    <h1 className="text-xl font-black text-white whitespace-nowrap">
                        Doña Ofe <span className="font-light opacity-80">Sabor y Café</span>
                    </h1>
                </a>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex space-x-6">
                    {navItems.map(item => (
                        <a
                            key={item.id}
                            href={item.hash}
                            onClick={(e) => { e.preventDefault(); handleScroll(item.hash); }}
                            className="text-white text-lg font-medium hover:text-secondary transition duration-200 py-2 relative group"
                        >
                            {item.name}
                            <span 
                                className="absolute bottom-0 left-0 w-full h-0.5 bg-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                            ></span>
                        </a>
                    ))}
                </nav>

                {/* Mobile Menu Button */}
                <button 
                    className="md:hidden p-2 text-white" 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle navigation menu"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                </button>
            </div>

            {/* Mobile Menu Content (Dropdown) */}
            <div 
                className={`md:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                style={{ backgroundColor: COLORS.primary }}
            >
                {navItems.map(item => (
                    <a
                        key={item.id}
                        href={item.hash}
                        onClick={(e) => { e.preventDefault(); handleScroll(item.hash); }}
                        className="block px-4 py-3 text-white hover:bg-opacity-90 transition duration-200"
                        style={{ backgroundColor: `${COLORS.primary}D0` }}
                    >
                        {item.name}
                    </a>
                ))}
            </div>
        </header>
    );
};

// 5.6 Hero (Landing Section)
const Hero = () => {
    return (
        <section id="hero" className="py-16 md:py-24" style={{ backgroundColor: COLORS.secondary }}>
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="grid md:grid-cols-2 gap-10 items-center">
                    
                    {/* Texto y CTA */}
                    <div className="text-center md:text-left">
                        <h1 
                            className="text-5xl md:text-6xl font-black mb-4 leading-tight" 
                            style={{ color: COLORS.text }}
                        >
                            Tamales Caseros Doña Ofe
                        </h1>
                        <p 
                            className="text-xl md:text-2xl mb-8 font-medium" 
                            style={{ color: COLORS.text }}
                        >
                            El auténtico sabor de México, listos para tu mesa.
                        </p>
                        
                        <a 
                            href="#contact-form"
                            className="inline-block py-3 px-8 text-xl font-bold rounded-full text-white transition duration-300 shadow-xl transform hover:scale-105"
                            style={{ backgroundColor: COLORS.accent, borderColor: COLORS.accent }}
                            onClick={(e) => { e.preventDefault(); document.querySelector('#contact-form').scrollIntoView({ behavior: 'smooth' }); }}
                        >
                            ¡Ordena Ya!
                        </a>
                    </div>
                    
                    {/* Galería / Carrusel */}
                    <HeroGallery />
                </div>
            </div>
        </section>
    );
};

// 6. Main App Component
const App = () => {
  const { isFirebaseReady } = useFirebase();

  // Función de ayuda para la navegación (scroll)
  const HeaderWithScroll = useMemo(() => (
    <Header navItems={NAV_ITEMS} />
  ), []);
  
  // Muestra un loader simple si Firebase aún no está listo
  if (!isFirebaseReady) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen" style={{ backgroundColor: COLORS.secondary }}>
        <div className="p-8 rounded-xl shadow-lg text-center" style={{ backgroundColor: COLORS.primary }}>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-white text-lg">Cargando la magia de Doña Ofe...</p>
            <p className="text-sm mt-2 text-white opacity-70">Preparando Firebase y el chatbot.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="App min-h-screen flex flex-col">
        {/* Estilos CSS Globales (Animaciones) */}
        <style>
            {`
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(-5px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .animate-fadeIn {
                animation: fadeIn 0.3s ease-out;
            }
            `}
        </style>

        {HeaderWithScroll}

        <main className="flex-grow">
            <Hero />
            <Gallery />
            <Comments />
            <UbicacionGallery />
            <ChatbotGemini />
            <ContactForm /> 
        </main>

        <Footer />
        <WhatsAppButton />
    </div>
  );
};

export default App;
