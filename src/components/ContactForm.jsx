// src/components/ContactForm.jsx
import React, { useState, useMemo } from 'react'
import { PRODUCTS } from '../data/constants' // Importamos la lista de productos

// Filtramos solo los productos que tienen precio (tamales y atole)
const SALE_PRODUCTS = PRODUCTS.filter(p => p.price);

export default function ContactForm() {
  const [form, setForm] = useState({ 
    nombre: "", 
    producto: SALE_PRODUCTS[0]?.label || "", 
    cantidad: 1, 
    mensaje: "" 
  })
  const [noti, setNoti] = useState(null)

  function handleChange(e) {
    // Aseguramos que la cantidad sea un número positivo
    let value = e.target.value;
    if (e.target.name === 'cantidad') {
        value = Math.max(1, parseInt(value, 10) || 1);
    }
    setForm({ ...form, [e.target.name]: value })
  }

  // Memoización para calcular el total
  const totalEstimado = useMemo(() => {
    const selectedProduct = SALE_PRODUCTS.find(p => p.label === form.producto);
    const price = selectedProduct ? selectedProduct.price : 0;
    return price * form.cantidad;
  }, [form.producto, form.cantidad]);

  function handleSubmit(e) {
    e.preventDefault()
    
    // Contrucción del mensaje de pedido
    const productInfo = SALE_PRODUCTS.find(p => p.label === form.producto);
    const priceText = productInfo ? `($${productInfo.price} c/u)` : '';

    const msg = `¡Hola Doña Ofe! Soy ${form.nombre}, y quiero hacer un pedido:
    * Producto: ${form.producto} ${priceText}
    * Cantidad: ${form.cantidad} piezas.
    * Total estimado (sin envío): $${totalEstimado} MXN.
    * Mensaje: ${form.mensaje || "Sin mensaje adicional."}
    
    Por favor, confírmame el pedido y el costo de envío. ¡Gracias!`;
    
    // Abre WhatsApp con el mensaje pre-rellenado
    window.open(`https://wa.me/527226540066?text=${encodeURIComponent(msg)}`, "_blank")
    
    // Muestra notificación y resetea formulario
    setNoti("¡Pedido enviado a WhatsApp! Te contactaremos pronto. 📞");
    setForm({ nombre: "", producto: SALE_PRODUCTS[0]?.label || "", cantidad: 1, mensaje: "" });
    setTimeout(() => setNoti(null), 3500);
  }

  return (
    <section aria-labelledby="contact-title" className="mt-8 fade-in p-4">
      <h2 id="contact-title" className="text-3xl font-bold text-accent mb-6 text-center border-b-2 border-primary pb-2">
        ¡Haga su Pedido Rápido por WhatsApp! 📲
      </h2>
      <form className="max-w-lg mx-auto bg-primary/10 rounded-2xl shadow-2xl p-6 border-4 border-secondary/50" onSubmit={handleSubmit} aria-label="Formulario de pedido rápido">
        
        <label className="block mb-4 font-semibold text-primary">
          Tu Nombre
          <input
            type="text"
            name="nombre"
            required
            placeholder="Ej. Juan Pérez"
            className="block w-full mt-1 px-4 py-2 rounded-lg border-2 border-primary focus:ring-accent focus:border-accent focus:outline-none btn-animate shadow-inner"
            value={form.nombre}
            onChange={handleChange}
            aria-required="true"
          />
        </label>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
            <label className="block font-semibold text-primary">
                Producto
                <select
                    name="producto"
                    className="block w-full mt-1 px-4 py-2 rounded-lg border-2 border-primary focus:ring-accent focus:border-accent focus:outline-none btn-animate shadow-inner"
                    value={form.producto}
                    onChange={handleChange}
                    aria-required="true"
                >
                    {SALE_PRODUCTS.map((p) => (
                    <option key={p.key} value={p.label}>{p.label} (${p.price} c/u)</option>
                    ))}
                </select>
            </label>
            <label className="block font-semibold text-primary">
                Cantidad
                <input
                    type="number"
                    min="1"
                    name="cantidad"
                    required
                    className="block w-full mt-1 px-4 py-2 rounded-lg border-2 border-primary focus:ring-accent focus:border-accent focus:outline-none btn-animate shadow-inner"
                    value={form.cantidad}
                    onChange={handleChange}
                    aria-required="true"
                />
            </label>
        </div>

        {/* Total Estimado */}
        <div className="mb-4 p-3 bg-accent text-white rounded-lg shadow-md text-center font-extrabold text-xl">
            Total Estimado: ${totalEstimado} MXN <span className="text-sm font-normal block italic">(Sin costo de envío)</span>
        </div>
        
        <label className="block mb-5 font-semibold text-primary">
          Comentario o Indicaciones
          <textarea
            name="mensaje"
            placeholder="¿Deseas indicar algo sobre tu pedido? (Ej. Horario de entrega, sin picante, etc.)"
            className="block w-full mt-1 px-4 py-2 rounded-lg border-2 border-primary focus:ring-accent focus:border-accent focus:outline-none btn-animate shadow-inner resize-none"
            rows="3"
            value={form.mensaje}
            onChange={handleChange}
          />
        </label>
        
        <button
          type="submit"
          className="btn-animate bg-accent text-white w-full px-6 py-3 rounded-xl shadow-2xl font-bold text-xl hover:bg-primary focus:bg-primary transition transform hover:scale-[1.02]"
        >
          Enviar Pedido por WhatsApp
        </button>
        
        {noti && <div className="mt-4 p-3 bg-primary text-white rounded-xl fade-in text-center font-semibold shadow-inner" role="alert">{noti}</div>}
      </form>
      
      <div className="mt-6 text-center text-primary font-bold text-lg p-4">
        O llámanos/escríbenos directamente: <a href="https://wa.me/527226540066" className="text-accent underline hover:text-primary transition">527226540066</a>
      </div>
    </section>
  )
}
