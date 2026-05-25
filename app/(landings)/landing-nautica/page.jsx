'use client';

import React, { useState } from 'react';
import { AlertTriangle, Anchor, CheckCircle, Download, FileText, LifeBuoy, ShieldCheck, Ship } from '@/components/landing-icons';

export default function App() {
  const [formData, setFormData] = useState({ name: '', email: '', eslora: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Aquí iría la lógica para enviar los datos y descargar el PDF
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* HEADER MINIMALISTA - Sin enlaces para evitar fugas de conversión */}
      <header className="bg-white py-4 px-6 md:px-12 shadow-sm flex justify-between items-center border-b-4 border-[#0B2545]">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-8 w-8 text-[#0B2545]" />
          <div>
            <h1 className="text-2xl font-bold text-[#0B2545] leading-none tracking-tight">EXTINVAL SAFETY</h1>
            <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Group - Has a name</p>
          </div>
        </div>
        <div className="hidden md:flex items-center text-sm font-medium text-slate-500">
          <Anchor className="h-4 w-4 mr-2" /> Náutica de Recreo
        </div>
      </header>

      {/* HERO SECTION - ZONA DE ALTA CONVERSIÓN */}
      <section className="relative bg-[#0B2545] text-white overflow-hidden">
        {/* Patrón de fondo sutil */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
        
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-24 relative z-10 grid md:grid-cols-2 gap-12 items-center">
          
          {/* Columna Izquierda: Copy persuasivo */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/20 text-red-200 text-sm font-semibold border border-red-500/30">
              <AlertTriangle className="h-4 w-4" />
              Evite sanciones y suspensos en la ITB
            </div>
            
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
              El mar no entiende de esloras. <span className="text-red-500">La normativa tampoco.</span>
            </h2>
            
            <p className="text-lg text-slate-300 md:pr-10">
              Un extintor despresurizado o una balsa sin revisar son un riesgo real. Descubra en nuestra guía cómo cumplir las exigencias de Capitanía Marítima según su zona de navegación y proteja a su tripulación sin sacrificar la estética de su embarcación.
            </p>
            
            <ul className="space-y-3 pt-4 text-slate-200">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-emerald-400 flex-shrink-0" />
                <span>Conozca el <strong>Servicio "Guante Blanco"</strong> para Yates y Veleros.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-emerald-400 flex-shrink-0" />
                <span>Sistemas <strong>"Clean & Safe"</strong> que protegen su electrónica.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-emerald-400 flex-shrink-0" />
                <span>Extintores <strong>"Yacht Line"</strong>: Diseño premium que cumple la ley.</span>
              </li>
            </ul>
          </div>

          {/* Columna Derecha: Formulario de Captación (Lead Magnet) */}
          <div className="bg-white text-slate-800 rounded-xl shadow-2xl p-8 relative">
            <div className="absolute -top-6 -right-6 bg-red-600 text-white w-24 h-24 rounded-full flex items-center justify-center font-bold text-center leading-tight shadow-lg border-4 border-white transform rotate-12">
              DESCARGA<br/>GRATUITA
            </div>

            <h3 className="text-2xl font-bold mb-2 text-[#0B2545]">Descargue el Catálogo Completo</h3>
            <p className="text-slate-500 mb-6 text-sm">Rellene sus datos y reciba al instante nuestra guía de Servicios y Suministros para Náutica de Recreo (PDF).</p>
            
            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-emerald-800">¡Guía enviada!</h4>
                <p className="text-emerald-600">Compruebe su bandeja de entrada. Su enlace de descarga ya está ahí.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Nombre Completo</label>
                  <input 
                    type="text" 
                    required
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#0B2545] focus:border-[#0B2545] transition-colors"
                    placeholder="Ej. Capitán Ahab"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email (Donde enviaremos el PDF)</label>
                  <input 
                    type="email" 
                    required
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#0B2545] focus:border-[#0B2545] transition-colors"
                    placeholder="tu@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Tipo de Embarcación</label>
                  <select 
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#0B2545] focus:border-[#0B2545] transition-colors bg-white"
                    value={formData.eslora}
                    onChange={(e) => setFormData({...formData, eslora: e.target.value})}
                  >
                    <option value="">Seleccione una opción...</option>
                    <option value="velero">Velero Privado</option>
                    <option value="yate">Yate / Embarcación a Motor</option>
                    <option value="charter">Empresa de Chárter</option>
                    <option value="astillero">Astillero / Mantenimiento</option>
                  </select>
                </div>
                
                <button 
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg hover:shadow-xl mt-2 text-lg"
                >
                  <Download className="w-5 h-5" />
                  Quiero mi PDF Gratuito
                </button>
                <p className="text-xs text-center text-slate-400 mt-4">
                  Tus datos están seguros. No enviamos spam, solo contenido de valor para la seguridad de tu embarcación.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* TRUST BANNER */}
      <section className="bg-slate-200 py-8 border-b border-slate-300">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-xl font-medium text-slate-600">
            "Acercamos el rigor de la <strong className="text-[#0B2545]">marina mercante</strong> a la náutica de recreo."
          </p>
        </div>
      </section>

      {/* BENEFICIOS SECTION */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B2545] mb-4">¿Qué descubrirá en este documento?</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Una radiografía completa de todo lo que necesita para navegar tranquilo, cumpliendo la ley y manteniendo el lujo de su embarcación intacto.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-red-100 text-red-600 rounded-xl flex items-center justify-center mb-6">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-[#0B2545] mb-3">Protección Contra Incendios & Gas</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Detalles sobre agentes limpios (Novec 1230) que no dejan residuos, generadores de aerosol para espacios reducidos, y sistemas vitales de detección de monóxido de carbono en sentinas.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
              <LifeBuoy className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-[#0B2545] mb-3">Salvamento y Electrónica (LSA)</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Normativas sobre revisión de balsas de recreo ISO 9650, mantenimiento de radiobalizas (EPIRB), y nuestro servicio certificado de retirada de pirotecnia caducada.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center mb-6">
              <Ship className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-[#0B2545] mb-3">Suministros "Yacht Line" Premium</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Catálogo de extintores de diseño (Cromado, Negro Mate, Fibra de Carbono) y chalecos autoinflables ergonómicos. Seguridad de alto nivel que se integra con la estética de su salón.
            </p>
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="bg-slate-100 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl font-bold text-[#0B2545]">Usted disfrute del mar. De la seguridad nos encargamos nosotros.</h2>
          <p className="text-lg text-slate-600">
            No deje que un equipo caducado retrase el inicio de la temporada. Descargue ahora el catálogo y descubra por qué Extinval es el nombre de confianza en el mar.
          </p>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-2 bg-[#0B2545] hover:bg-[#153a6b] text-white font-bold py-4 px-8 rounded-lg transition-colors shadow-lg text-lg"
          >
            <FileText className="w-5 h-5" />
            Volver Arriba y Descargar PDF
          </button>
        </div>
      </section>

      {/* FOOTER MINIMALISTA */}
      <footer className="bg-white py-8 border-t border-slate-200 text-center">
        <p className="text-slate-500 text-sm">
          © {new Date().getFullYear()} Extinval Safety Group. Todos los derechos reservados.
        </p>
        <div className="mt-2 flex justify-center gap-4 text-xs text-slate-400">
          <a href="#" className="hover:text-slate-600">Aviso Legal</a>
          <a href="#" className="hover:text-slate-600">Política de Privacidad</a>
          <a href="#" className="hover:text-slate-600">extinval.com</a>
        </div>
      </footer>
    </div>
  );
}
