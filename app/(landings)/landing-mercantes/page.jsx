'use client';

import React, { useState } from 'react';
import {
  Activity,
  AlertOctagon,
  Anchor,
  Award,
  CheckCircle,
  ChevronRight,
  Clock,
  Compass,
  Download,
  FileText,
  Layers,
  MapPin,
  Shield,
} from '@/components/landing-icons';

export default function App() {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    company: '',
    vesselName: '',
    nextPort: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState('engine');

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const checklistPreview = {
    engine: [
      { item: "Sistemas Fijos de CO2 / Water Mist", desc: "Inspecciones anuales y quinquenales (+200 cilindros)." },
      { item: "Sistemas de Espuma de Alta/Baja Expansión", desc: "Análisis obligatorio de espuma en laboratorio." },
      { item: "Equipos de Respiración Autónoma (SCBA / EEBD)", desc: "Certificación de calidad de aire de compresores." }
    ],
    deck: [
      { item: "Botes de Rescate y Pescantes (Lifeboats & Davits)", desc: "Certificaciones anuales y de 5 años bajo normativas IACS." },
      { item: "Pruebas de Carga Estructural (Load Testing)", desc: "Certificación de grúas de provisiones, escalas reales y pasarelas." },
      { item: "Trajes Técnicos y de Inmersión SOLAS", desc: "Inspección de estanqueidad y mantenimiento preventivo." }
    ],
    bridge: [
      { item: "Instrumentación y Calibración UTI", desc: "Calibración de detectores de gas, alcoholímetros y cintas UTI." },
      { item: "Detectores de Gas Portátiles", desc: "Suministro y calibración de explosímetros de última generación." },
      { item: "Equipos LSA y Repuestos OEM", desc: "Distribución oficial de repuestos Hatecke, Global Davit, etc." }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 selection:bg-red-600 selection:text-white">
      {/* HEADER MINIMALISTA - Optimizado para evitar puntos de fuga */}
      <header className="bg-slate-900 border-b border-slate-800 py-4 px-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-red-600 p-2 rounded-lg">
            <Anchor className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-black text-white leading-none tracking-wider">EXTINVAL</h1>
            <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest">Merchant Division</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 border border-slate-700 rounded-full px-4 py-1.5 bg-slate-800/40">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Flying Squads 24/7
        </div>
      </header>

      {/* HERO SECTION - Enfoque de dolor técnico y captación */}
      <section className="relative py-16 md:py-24 px-6 max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
        {/* Decoración de fondo */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-3xl pointer-events-none"></div>

        {/* Copy Persuasivo (Lado Izquierdo) - 7 Columnas */}
        <div className="lg:col-span-7 space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-600/10 text-red-400 text-sm font-semibold border border-red-500/20">
            <AlertOctagon className="h-4 w-4" />
            Evite Retrasos por Inspecciones de la Guardia Costera (USCG) o PSC
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-none text-white">
            CERO DEFICIENCIAS.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
              CERO RETRASOS.
            </span>
          </h2>

          <p className="text-lg text-slate-300 max-w-2xl leading-relaxed">
            Coordinar múltiples subcontratistas en una escala de 12 horas multiplica el riesgo de retrasos y sanciones. Descargue nuestra <strong>Guía Técnica de Preparación de Escalas</strong> y asegure la plena operatividad de sus sistemas críticos con un único interlocutor.
          </p>

          {/* Mini-Beneficios */}
          <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-white text-sm">Inspección Unificada (LSA & FFE)</h4>
                <p className="text-xs text-slate-400">CO2, Balsas, Botes y Calibración en una única asistencia.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-white text-sm">Garantía Técnica IACS</h4>
                <p className="text-xs text-slate-400">Aprobados por DNV, LR, ABS, BV, RINA y ClassNK.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Formulario de Descarga (Lado Derecho) - 5 Columnas */}
        <div className="lg:col-span-5 relative z-10">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
            {/* Indicador de recurso */}
            <div className="absolute top-0 right-0 bg-red-600 text-white font-bold text-[10px] uppercase tracking-widest px-4 py-1 rounded-bl-lg">
              PDF Técnico
            </div>

            <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
              <FileText className="text-red-500" />
              Descargar Guía de Escalas
            </h3>
            <p className="text-sm text-slate-400 mb-6">
              Reciba el manual de cumplimiento y preparación técnica para Jefes de Máquinas, Capitanes y Ship Managers.
            </p>

            {submitted ? (
              <div className="bg-slate-800/50 border border-emerald-500/30 rounded-xl p-6 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto text-emerald-400 border border-emerald-500/20">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-white">¡Descarga Lista!</h4>
                <p className="text-sm text-slate-400">Hemós enviado el enlace de descarga del documento técnico a su correo corporativo.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Nombre Completo</label>
                  <input 
                    type="text" 
                    required
                    className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-lg px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                    placeholder="Ej. Ing. Carlos Mendoza"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Email Corporativo</label>
                  <input 
                    type="email" 
                    required
                    className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-lg px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                    placeholder="c.mendoza@shipping-company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Nombre del Buque</label>
                    <input 
                      type="text" 
                      className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-lg px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                      placeholder="IMO o Nombre"
                      value={formData.vesselName}
                      onChange={(e) => setFormData({...formData, vesselName: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Próxima Escala</label>
                    <input 
                      type="text" 
                      className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-lg px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                      placeholder="Ej. Algeciras, Houston"
                      value={formData.nextPort}
                      onChange={(e) => setFormData({...formData, nextPort: e.target.value})}
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold py-3.5 px-6 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-600/20 text-sm uppercase tracking-wider"
                >
                  <Download className="w-4 h-4" />
                  Obtener Documento Técnico
                </button>
                <p className="text-[10px] text-center text-slate-500 mt-2">
                  Garantía de privacidad. Acceso directo e inmediato al catálogo e instrucciones técnicas para su flota.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* SECCIÓN LOGOS CLASIFICACIÓN (IACS APPROVED) */}
      <section className="bg-slate-900 border-y border-slate-800 py-10">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-red-500 mb-6">
            Certificados con Autoridad Irrefutable por todas las Sociedades IACS
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-300">
            <span className="text-xl font-extrabold text-white tracking-widest">DNV</span>
            <span className="text-xl font-extrabold text-white tracking-widest">LLOYD'S REGISTER</span>
            <span className="text-xl font-extrabold text-white tracking-widest">ABS</span>
            <span className="text-xl font-extrabold text-white tracking-widest">BUREAU VERITAS</span>
            <span className="text-xl font-extrabold text-white tracking-widest">RINA</span>
            <span className="text-xl font-extrabold text-white tracking-widest">CLASSNK</span>
          </div>
        </div>
      </section>

      {/* SECCIÓN INTERACTIVA: PREVISUALIZADOR DE PROTOCOLO */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Lo que su tripulación no repara, Extinval lo certifica en puerto</h2>
          <p className="text-slate-400 text-sm md:text-base">
            Haga clic en las diferentes áreas de a bordo para ver un adelanto del estricto protocolo que encontrará detallado en nuestra guía de descarga.
          </p>
        </div>

        {/* Tabs de Selección */}
        <div className="flex justify-center border-b border-slate-800 mb-8 max-w-md mx-auto">
          <button 
            onClick={() => setActiveTab('engine')}
            className={`flex-1 py-3 text-center text-sm font-bold tracking-wider uppercase border-b-2 transition-colors ${activeTab === 'engine' ? 'border-red-600 text-white' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
          >
            Sala de Máquinas
          </button>
          <button 
            onClick={() => setActiveTab('deck')}
            className={`flex-1 py-3 text-center text-sm font-bold tracking-wider uppercase border-b-2 transition-colors ${activeTab === 'deck' ? 'border-red-600 text-white' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
          >
            Cubierta / Deck
          </button>
          <button 
            onClick={() => setActiveTab('bridge')}
            className={`flex-1 py-3 text-center text-sm font-bold tracking-wider uppercase border-b-2 transition-colors ${activeTab === 'bridge' ? 'border-red-600 text-white' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
          >
            Puente / Bridge
          </button>
        </div>

        {/* Contenido Dinámico de los Tabs */}
        <div className="grid md:grid-cols-3 gap-6">
          {checklistPreview[activeTab].map((item, index) => (
            <div key={index} className="bg-slate-900 border border-slate-800 p-6 rounded-xl hover:border-slate-700 transition-all flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-red-500 uppercase tracking-widest block mb-2">Protocolo 0{index + 1}</span>
                <h4 className="text-lg font-bold text-white mb-2">{item.item}</h4>
                <p className="text-sm text-slate-400">{item.desc}</p>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-800/60 flex items-center gap-1.5 text-xs text-red-400 font-semibold uppercase">
                <span>Ver requisitos completos</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECCIÓN COBERTURA GEOGRÁFICA (HUBS OPERATIVOS) */}
      <section className="bg-slate-900 py-20 px-6 border-t border-slate-800">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/10 text-red-400 text-xs font-bold uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5" /> Cobertura Global
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">
              Tarifas estandarizadas y la misma ingeniería de excelencia en todo el mundo.
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              No importa si su buque deja caer el ancla en las terminales del Mediterráneo o si cruza el Canal de Panamá. Nuestros contratos de flota globales (Fleet Agreements) garantizan la máxima certidumbre económica y legal.
            </p>
            
            <div className="grid grid-cols-2 gap-4 text-xs font-bold uppercase tracking-wider text-slate-300">
              <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-lg flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-600"></span> España (Canarias, Algeciras...)
              </div>
              <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-lg flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-600"></span> EE.UU. (Houston, Miami, NY)
              </div>
              <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-lg flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-600"></span> Panamá
              </div>
              <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-lg flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-600"></span> Canadá
              </div>
            </div>
          </div>

          {/* Caja derecha con resumen de valor técnico */}
          <div className="bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-800 rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full blur-2xl"></div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Award className="text-red-500" />
              Garantía Operativa Extinval
            </h3>
            <ul className="space-y-4 text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <span><strong>Intervención sin esperas:</strong> Movilización express en escalas críticas de 12 horas.</span>
              </li>
              <li className="flex items-start gap-3">
                <Layers className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <span><strong>Equipamiento original (OEM):</strong> Proveedores autorizados de repuestos críticos.</span>
              </li>
              <li className="flex items-start gap-3">
                <Compass className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <span><strong>Seguridad Legal Absoluta:</strong> Certificados sin margen a la interpretación técnica de los inspectores de puerto.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* FOOTER MINIMALISTA */}
      <footer className="bg-slate-950 py-12 border-t border-slate-900 text-center">
        <div className="max-w-6xl mx-auto px-6 space-y-4">
          <p className="text-sm text-slate-400">
            <strong>Extinval Group</strong> — Safety, Service, Solutions.
          </p>
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} Extinval Group. Todos los derechos reservados.
          </p>
          <div className="flex justify-center gap-6 text-xs text-slate-500">
            <a href="#" className="hover:text-red-500 transition-colors">Aviso Legal</a>
            <a href="#" className="hover:text-red-500 transition-colors">Política de Privacidad</a>
            <a href="https://extinval.com" target="_blank" rel="noreferrer" className="hover:text-red-500 transition-colors">extinval.com</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
