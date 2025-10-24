// src/components/UbicacionGoogleMaps.jsx
import React, { useState } from 'react';

// Data simulada de ubicaciones con coordenadas de ejemplo (CDMX)
const LOCATIONS = [
  {
    key: 'principal',
    label: 'Sucursal Centro Histórico',
    address: 'Calle 5 de Mayo #10, Centro, CDMX',
    hours: 'Lun-Vie: 7:00 - 15:00, Sab-Dom: 8:00 - 14:00',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.651717320494!2d-99.14170308552684!3d19.431872145781344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1f8510f21422d%3A0xc3f5c15e4f208197!2sPalacio%20Nacional!5e0!3m2!1ses-419!2smx!4v1678234567890!5m2!1ses-419!2smx',
    coords: { lat: 19.4326, lng: -99.1332 }, // Coordenadas aproximadas del Centro
    phone: '55 1234 5678'
  },
  {
    key: 'sur',
    label: 'Sucursal Coyoacán',
    address: 'Av. México Coyoacán #300, Coyoacán, CDMX',
    hours: 'Mar-Dom: 8:30 - 16:00',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3763.50020297063!2d-99.16788258552796!3d19.395191846430485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1ff35f6f3b0e9%3A0x673c6a4d7c0f16d5!2sCoyoac%C3%A1n!5e0!3m2!1ses-419!2smx!4v1678234567891!5m2!1ses-419!2smx',
    coords: { lat: 19.3507, lng: -99.1669 }, // Coordenadas aproximadas de Coyoacán
    phone: '55 8765 4321'
  }
];

export default function UbicacionGoogleMaps() {
  const [selectedLocation, setSelectedLocation] = useState(LOCATIONS[0]);

  return (
    <section aria-labelledby="map-title" className="fade-in bg-white p-6 rounded-xl shadow-2xl max-w-4xl mx-auto">
      <h2 id="map-title" className="text-3xl font-extrabold text-primary mb-6 text-center border-b-2 border-accent pb-2">
        Nuestras Ubicaciones 📍
      </h2>
      
      {/* Selector de Sucursal */}
      <div className="flex justify-center gap-4 mb-6">
        {LOCATIONS.map(location => (
          <button
            key={location.key}
            onClick={() => setSelectedLocation(location)}
            className={`btn-animate px-6 py-3 rounded-xl font-bold transition shadow-lg ${
              selectedLocation.key === location.key 
                ? 'bg-accent text-white ring-4 ring-primary' 
                : 'bg-secondary text-primary hover:bg-primary hover:text-white'
            }`}
            aria-controls="map-iframe"
            aria-selected={selectedLocation.key === location.key}
          >
            {location.label}
          </button>
        ))}
      </div>

      {/* Contenedor de Mapa y Detalles */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Mapa (Iframe de Google Maps) */}
        <div className="lg:col-span-2 w-full aspect-video md:aspect-[4/3] lg:aspect-auto rounded-xl overflow-hidden shadow-2xl border-4 border-primary/50">
          <iframe
            id="map-iframe"
            width="100%"
            height="100%"
            title={`Mapa de ${selectedLocation.label}`}
            src={selectedLocation.mapUrl}
            frameBorder="0"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            aria-label={`Mapa interactivo de la ubicación: ${selectedLocation.label}`}
          ></iframe>
        </div>

        {/* Detalles de la Sucursal */}
        <div className="lg:col-span-1 bg-bgTamales p-5 rounded-xl shadow-inner border-t-4 border-accent">
          <h3 className="text-2xl font-bold text-accent mb-3">{selectedLocation.label}</h3>
          
          <div className="space-y-3">
            <p className="flex items-center text-primary font-semibold">
                <span className="text-xl mr-2">🏠</span> 
                {selectedLocation.address}
            </p>
            <p className="flex items-center text-primary font-semibold">
                <span className="text-xl mr-2">🕒</span> 
                {selectedLocation.hours}
            </p>
            <p className="flex items-center text-primary font-semibold">
                <span className="text-xl mr-2">📞</span> 
                <a href={`tel:${selectedLocation.phone.replace(/\s/g, '')}`} className="underline hover:text-accent">{selectedLocation.phone}</a>
            </p>
          </div>
          
          <a
            href={selectedLocation.mapUrl.replace('/embed', '/place')} // Enlace para abrir en Google Maps
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 btn-animate inline-block w-full text-center bg-primary text-white px-4 py-2 rounded-lg font-bold shadow-md hover:bg-accent"
          >
            Ver en Google Maps
          </a>
        </div>
      </div>
    </section>
  );
}
