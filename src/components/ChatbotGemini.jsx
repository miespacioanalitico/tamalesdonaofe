// src/components/ChatbotGemini.jsx
import React, { useState, useRef, useEffect, useCallback } from "react";
import { PRODUCTS } from '../data/constants'; // Importamos el menú para el chatbot

// Obtenemos la API Key de las variables de entorno
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
// Usamos el modelo gemini-2.5-flash-preview-09-2025 para mejor rendimiento y grounding
const MODEL_NAME = "gemini-2.5-flash-preview-09-2025";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${GEMINI_API_KEY}`;

// Función de utilidad para manejar reintentos y backoff exponencial
async function fetchWithRetry(url, options, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url, options);
      if (response.ok) {
        return response;
      }
      // Si la respuesta no es OK, lanza un error para activar el reintento (excepto 4xx)
      if (response.status >= 500) {
        throw new Error(`Error HTTP: ${response.status}`);
      } else {
         // Errores 4xx (Cliente) no se reintentan, se rompe el ciclo
         console.error("Error del cliente, no se reintenta:", await response.text());
         return response; 
      }
    } catch (error) {
      console.error(`Intento ${i + 1} fallido:`, error.message);
      if (i === maxRetries - 1) throw error; // Si es el último intento, lanza el error
      const delay = Math.pow(2, i) * 1000 + Math.random() * 1000; // Backoff exponencial
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

export default function ChatbotGemini() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "¡Hola! Soy Tamalín, el Asistente Virtual de Doña Ofe. ¿Tienes alguna pregunta sobre nuestro menú, promociones o ubicaciones? ¡Estoy para servirte!" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatBottomRef = useRef(null);

  // Genera el System Instruction dinámicamente con el menú actual
  const getSystemInstruction = useCallback(() => {
    const menu = PRODUCTS.map(p => 
      `* ${p.label} (Precio estimado: $${p.price} MXN). Descripción: ${p.desc}`
    ).join('\n');

    return `Tu nombre es Tamalín. Eres el vendedor experto y asistente virtual de "Tamales Caseros Doña Ofe".
    
    Tu objetivo principal es asistir al cliente de forma amable, cálida y con un toque mexicano, responder preguntas sobre los tamales y guiarlo a hacer un pedido por WhatsApp.
    
    Instrucciones clave:
    1. Responde siempre en español.
    2. Mantén un tono entusiasta, amigable y profesional.
    3. Si te preguntan sobre el menú o precios, usa esta información:
    
    --- MENÚ Y PRECIOS ---
    ${menu}
    ---
    
    4. NO puedes tomar pedidos directamente. Si el cliente quiere ordenar, recuérdale que debe ir a la sección 'Contacto / Pedido rápido' de la página web o usar el botón de WhatsApp.
    5. Si te hacen preguntas fuera del negocio de tamales (ej. clima, historia), utiliza la herramienta de búsqueda de Google para proporcionar una respuesta, pero siempre regresa al tema de los tamales si es posible.`;
  }, []); // Dependencias vacías, solo se calcula una vez

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  async function sendMessage(e) {
    e.preventDefault();
    const userMsg = input.trim();
    if (!userMsg) return;

    setMessages(msgs => [...msgs, { from: "user", text: userMsg }]);
    setInput("");
    setLoading(true);

    // Mapea el historial para el payload
    const history = messages.map(m => ({ 
      role: m.from === "bot" ? "model" : "user", 
      parts: [{ text: m.text }] 
    }));
    
    // Construye el payload completo para la API
    const payload = {
        contents: [...history, { role: "user", parts: [{ text: userMsg }] }],
        tools: [{ "google_search": {} }], // Habilitar Google Search Grounding
        systemInstruction: {
            parts: [{ text: getSystemInstruction() }]
        },
    };

    try {
      const res = await fetchWithRetry(
        API_URL,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        }
      );
      
      const data = await res.json();
      
      // Extracción robusta de la respuesta
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Lo siento, Tamalín no entendió tu pregunta. ¿Podrías ser más específico?";
      
      setMessages(msgs => [...msgs, { from: "bot", text: reply }]);
    } catch (err) {
      console.error("Error grave de comunicación con la API Gemini:", err);
      setMessages(msgs => [
        ...msgs,
        { from: "bot", text: "¡Ay, caramba! Tamalín tuvo un pequeño tropiezo de conexión con la IA. Por favor, inténtalo de nuevo en un momento. 🙏" }
      ]);
    }
    setLoading(false);
  }

  function handleInputKey(e) {
    if (e.key === "Enter" && !e.shiftKey) sendMessage(e);
  }

  return (
    <>
      <button
        className="fixed right-6 bottom-28 z-50 bg-accent text-white p-4 rounded-full shadow-lg btn-animate hover:bg-primary focus:bg-primary transition-all duration-300 transform hover:scale-110"
        aria-label={open ? "Cerrar chat IA (Tamalín)" : "Abrir chat IA (Tamalín)"}
        onClick={() => setOpen(o => !o)}
        title="Tamalín, tu asistente virtual"
      >
        💬
      </button>

      {open && (
        <div className="fixed right-4 bottom-4 z-50 bg-white rounded-xl shadow-2xl w-[340px] max-w-full flex flex-col fade-in border-4 border-primary/50">
          <div className="flex items-center justify-between px-4 py-2 bg-primary rounded-t-lg text-white">
            <span className="font-bold">Tamalín, el Vendedor IA 🤖</span>
            <button aria-label="Cerrar chat" onClick={() => setOpen(false)} className="ml-2 p-1 rounded-full hover:bg-accent/70 transition">
              ✖
            </button>
          </div>
          <div className="p-3 h-[330px] overflow-y-auto bg-bgTamales">
            {messages.map((msg, i) => (
              <div key={i} className={`mb-3 flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`px-4 py-3 rounded-2xl shadow-md text-sm ${msg.from === "bot"
                  ? "bg-secondary text-primary rounded-bl-none border border-primary/20"
                  : "bg-accent text-white rounded-br-none border border-accent/20"} max-w-[80%] whitespace-pre-wrap`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="mb-2 flex justify-start">
                <div className="px-4 py-3 rounded-2xl bg-secondary text-primary animate-pulse shadow-md text-sm">
                    <div className="flex items-center space-x-2">
                        <svg className="animate-spin h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        <span>Tamalín está pensando...</span>
                    </div>
                </div>
              </div>
            )}
            <div ref={chatBottomRef} />
          </div>
          <form className="border-t border-primary/50 flex items-center gap-2 px-3 py-2 bg-bgTamales" onSubmit={sendMessage}>
            <textarea
              className="flex-1 px-3 py-2 rounded-lg border-2 border-primary focus:ring-accent focus:border-accent focus:outline-none btn-animate resize-none text-sm"
              placeholder="Pregúntale a Tamalín sobre los tamales..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleInputKey}
              aria-label="Escribe tu mensaje al asistente IA"
              rows={1}
              disabled={loading}
              style={{ minHeight: "42px", maxHeight: "80px" }}
            />
            <button
              className="btn-animate bg-accent text-white px-4 py-2 rounded-lg font-bold hover:bg-primary focus:bg-primary transition shadow-md h-10 w-20 flex items-center justify-center"
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Enviar mensaje"
              title="Enviar mensaje"
            >
              {loading ? "..." : "Enviar"}
            </button>
          </form>
        </div>
      )}
    </>
  );
}
