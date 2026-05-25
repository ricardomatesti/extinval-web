'use client';

import React, { useState } from 'react';
import {
  AlertTriangle,
  Anchor,
  Award,
  Check,
  CheckCircle,
  CheckSquare,
  ChevronRight,
  ClipboardList,
  Download,
  FileText,
  Flame,
  Globe,
  Info,
  Lock,
  Mail,
  Phone,
  Plus,
  ShieldCheck,
  Ship,
  TrendingDown,
  UserCheck,
} from '@/components/landing-icons';

export default function App() {
  // Estado para el formulario de descarga
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    company: '',
    fleetSize: '',
    portBase: '',
    acceptTerms: false
  });
  const [formStep, setFormStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Estado para la sección interactiva de la checklist
  const [activeTab, setActiveTab] = useState('lsa');
  const [checkedItems, setCheckedItems] = useState({});

  // Estado para el simulador financiero
  const [weeklyCharterFee, setWeeklyCharterFee] = useState(5500);
  const [daysOfDetention, setDaysOfDetention] = useState(7);

  // Lógica del simulador financiero (Lucro cesante estimado + indemnizaciones del pasaje)
  const lostRevenue = (weeklyCharterFee / 7) * daysOfDetention;
  const refundsAndDamages = lostRevenue * 0.40; // 40% adicional por devoluciones y costes reputacionales
  const totalFinancialImpact = lostRevenue + refundsAndDamages;

  // Manejo de la checklist interactiva
  const toggleCheck = (id) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (formData.email) {
      setFormStep(2);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formData.acceptTerms && formData.name && formData.company && formData.fleetSize) {
      setIsSubmitted(true);
    }
  };

  // Datos extraídos del documento PDF para la vista previa
  const checklistData = {
    lsa: {
      title: "Bloque 1: Salvamento y Desgaste Intensivo",
      badge: "LSA Commercial Compliance",
      intro: "Equipos sometidos a manipulación constante por clientes náuticos y alumnos de escuela de recreo.",
      items: [
        {
          id: "lsa-1",
          name: "Chalecos Inflables (Revisión Crítica)",
          desc: "Humedad acumulada en cofres y tirones accidentales. Comprobación de que las pastillas de sal (bobbins) están en fecha, cilindros de CO2 sin corrosión y luces operativas.",
          criticalFactor: "Causa común de denegación de Despacho en inspecciones de la Guardia Civil."
        },
        {
          id: "lsa-2",
          name: "Dotación Infantil Homologada",
          desc: "Verificación de la presencia física de chalecos infantiles adaptados a los rangos de peso del pasaje autorizado y estibados en un lugar visible.",
          criticalFactor: "Inspección de seguridad prioritaria por Capitanía Marítima."
        },
        {
          id: "lsa-3",
          name: "Zafados Hidrostáticos (HRU) en Balsas",
          desc: "Comprobación de que la fecha de caducidad del zafado hidrostático está vigente y que la balsa ISO 9650 cubre el pasaje máximo legal de la embarcación.",
          criticalFactor: "Obligatorio para despachar en Zonas de Navegación de la 1 a la 3."
        }
      ]
    },
    ffe: {
      title: "Bloque 2: Prevención de Incendios y Cocina",
      badge: "FFE Safety Protocols",
      intro: "Mitigación de riesgos originados por cocinas a gas e instalaciones eléctricas de uso intensivo.",
      items: [
        {
          id: "ffe-1",
          name: "Extintores Portátiles (RD 339/2021)",
          desc: "Los manómetros deben estar estrictamente en zona verde. Los pasadores de seguridad suelen ser manipulados o extraídos accidentalmente por clientes.",
          criticalFactor: "Falta considerada grave que paraliza de inmediato la ITB del barco."
        },
        {
          id: "ffe-2",
          name: "Seguridad Integral en Cocinas (Galley)",
          desc: "Accesibilidad inmediata de la manta ignífuga, revisión de la fecha de caducidad de la manguera de gas butano y test de funcionamiento del detector.",
          criticalFactor: "Principal foco de incendios incidentales provocados por tripulaciones noveles."
        },
        {
          id: "ffe-3",
          name: "Vías de Escape y Extinción en Máquinas",
          desc: "Asegurar que el puerto de descarga para extintores o el tirador del sistema de gas fijo no estén obstruidos por maletas o material de chárter.",
          criticalFactor: "Inspección rutinaria de los inspectores de seguridad del puerto."
        }
      ]
    },
    docs: {
      title: "Bloque 3: Comunicaciones y Trazabilidad",
      badge: "Official Maritime Registry",
      intro: "Cumplimiento legal del barco, licencias de radio y botiquines reglamentarios para actividades comerciales.",
      items: [
        {
          id: "docs-1",
          name: "Botiquín Comercial Categoría C",
          desc: "Inspección meticulosa de fármacos obligatorios. Retirada y sustitución inmediata de medicamentos consumidos o caducados (mareo, analgésicos).",
          criticalFactor: "Requisito ineludible exigido por Sanidad Marítima para el Despacho."
        },
        {
          id: "docs-2",
          name: "Cuadro de Obligaciones (Muster List)",
          desc: "Esquema gráfico, claro y visible en el salón que detalla los procedimientos de emergencia y la ubicación exacta del material de seguridad a bordo.",
          criticalFactor: "Su ausencia es motivo de sanción directa por parte de la Guardia Civil."
        },
        {
          id: "docs-3",
          name: "Trazabilidad de Seguros de Lista 6ª",
          desc: "Comprobación de que las pólizas de Responsabilidad Civil vigentes cubren de manera explícita el pasaje de chárter o los alumnos de escuela.",
          criticalFactor: "Evita riesgos patrimoniales catastróficos para el armador."
        }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 selection:bg-orange-500 selection:text-white">
      
      {/* HEADER DE LA LANDING - Cero puntos de fuga */}
      <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 py-4 px-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-orange-500 p-2.5 rounded-lg text-slate-950">
            <Anchor className="h-6 w-6 stroke-[2.5]" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-black text-white leading-none tracking-tight">EXTINVAL SAFETY</h1>
            <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">Charter & Schools Division</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-300 bg-slate-800/60 rounded-full px-4 py-1.5 border border-slate-700/50">
          <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse"></span>
          Lista 6ª Auditoría Pretemporada
        </div>
      </header>

      {/* HERO SECTION - Enfoque de dolor y captación del lead */}
      <section className="relative py-16 lg:py-24 px-6 max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
        {/* Efecto de iluminación de seguridad */}
        <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none"></div>

        {/* COPY PERSUASIVO (Izquierda) */}
        <div className="lg:col-span-7 space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs font-bold uppercase tracking-wider border border-orange-500/20">
            <AlertTriangle className="h-4 w-4" />
            Evite la inmovilización de su flota comercial por Capitanía
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] text-white">
            Un barco de chárter trabaja <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">10 veces más</span> que uno privado.
          </h2>
          
          <h3 className="text-2xl md:text-3xl font-extrabold text-slate-300">
            Su seguridad también debe hacerlo.
          </h3>

          <p className="text-lg text-slate-400 leading-relaxed max-w-2xl">
            Lidiar con tripulaciones inexpertas, clientes noveles y el desgaste salino intensivo exige un control férreo. Una sola bengala caducada o un chaleco sin certificar implican la denegación de despacho y la cancelación de semanas enteras de alquiler.
          </p>

          <p className="text-slate-500 text-sm max-w-xl">
            Nuestros inspectores de <strong>Extinval Group</strong> han condensado los puntos de control obligatorios del RD 339/2021 en una checklist operativa y práctica para directores de base y escuelas náuticas.
          </p>

          {/* Garantías técnicas destacadas */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-6 border-t border-slate-900">
            <div className="flex items-center gap-2.5">
              <Check className="text-orange-500 w-5 h-5 stroke-[3]" />
              <span className="text-xs font-semibold text-slate-300">Evite sanciones de ITB</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Check className="text-orange-500 w-5 h-5 stroke-[3]" />
              <span className="text-xs font-semibold text-slate-300">Aprobación IACS</span>
            </div>
            <div className="flex items-center gap-2.5 col-span-2 md:col-span-1">
              <Check className="text-orange-500 w-5 h-5 stroke-[3]" />
              <span className="text-xs font-semibold text-slate-300">Protección del Despacho</span>
            </div>
          </div>
        </div>

        {/* CAJA DE CONVERSIÓN / FORMULARIO EN 2 PASOS (Derecha) */}
        <div className="lg:col-span-5 relative z-10">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
            {/* Sello de descarga gratuita */}
            <div className="absolute top-0 right-0 bg-orange-500 text-slate-950 font-black text-[10px] uppercase tracking-widest px-4 py-1.5 rounded-bl-lg">
              Catálogo Oficial PDF
            </div>

            <div className="flex items-center gap-2.5 mb-4">
              <ClipboardList className="text-orange-500 h-6 w-6" />
              <h3 className="text-xl font-bold text-white">Descargar Checklist Técnica</h3>
            </div>

            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              Consiga la hoja de ruta de inspección utilizada por ingenieros náuticos para preparar sus veleros y catamaranes de Lista 6ª de cara a la temporada.
            </p>

            {isSubmitted ? (
              <div className="bg-slate-950/80 border border-emerald-500/30 rounded-xl p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto text-emerald-400 border border-emerald-500/20">
                  <ShieldCheck className="w-8 h-8 stroke-[1.5]" />
                </div>
                <h4 className="text-xl font-bold text-white">¡Checklist enviada con éxito!</h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Hemos enviado el enlace de descarga de la guía a tu dirección de correo electrónico profesional: <strong className="text-slate-200">{formData.email}</strong>.
                </p>
                <div className="pt-4 border-t border-slate-900">
                  <a 
                    href="#acuerdos-flota" 
                    className="text-xs font-bold text-orange-500 hover:text-orange-400 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Ver Acuerdos de Flota de Extinval</span>
                    <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ) : (
              <div>
                {/* Barra de progreso de los pasos */}
                <div className="flex items-center gap-2 mb-6">
                  <div className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${formStep >= 1 ? 'bg-orange-500' : 'bg-slate-800'}`}></div>
                  <div className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${formStep >= 2 ? 'bg-orange-500' : 'bg-slate-800'}`}></div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-2">Paso {formStep} de 2</span>
                </div>

                {formStep === 1 ? (
                  <form onSubmit={handleNextStep} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Email Corporativo de Contacto</label>
                      <input 
                        type="email" 
                        required
                        className="w-full bg-slate-950 border border-slate-800 focus:border-orange-500 rounded-lg px-4 py-3 text-sm text-white focus:outline-none transition-all placeholder:text-slate-600"
                        placeholder="ejemplo@tuempresacharter.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                    <button 
                      type="submit"
                      className="w-full bg-orange-500 hover:bg-orange-600 text-slate-950 font-bold py-3.5 px-6 rounded-lg transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-wider shadow-lg shadow-orange-500/10"
                    >
                      <span>Siguiente Paso</span>
                      <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                    </button>
                    <div className="flex items-center gap-1.5 justify-center text-[10px] text-slate-500">
                      <Lock className="w-3.5 h-3.5" />
                      <span>Conexión segura y tratamiento confidencial de datos</span>
                    </div>
                  </form>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Nombre del Base Manager / Armador</label>
                      <input 
                        type="text" 
                        required
                        className="w-full bg-slate-950 border border-slate-800 focus:border-orange-500 rounded-lg px-4 py-3 text-sm text-white focus:outline-none transition-all placeholder:text-slate-600"
                        placeholder="Ej. Ignacio Ferrer"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Nombre de la Empresa de Chárter / Escuela</label>
                      <input 
                        type="text" 
                        required
                        className="w-full bg-slate-950 border border-slate-800 focus:border-orange-500 rounded-lg px-4 py-3 text-sm text-white focus:outline-none transition-all placeholder:text-slate-600"
                        placeholder="Ej. Balearic Yacht Charter"
                        value={formData.company}
                        onChange={(e) => setFormData({...formData, company: e.target.value})}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Nº de Barcos (Flota)</label>
                        <select 
                          required
                          className="w-full bg-slate-950 border border-slate-800 focus:border-orange-500 rounded-lg px-4 py-3 text-sm text-white focus:outline-none transition-all bg-slate-950"
                          value={formData.fleetSize}
                          onChange={(e) => setFormData({...formData, fleetSize: e.target.value})}
                        >
                          <option value="">Seleccionar...</option>
                          <option value="1-3">1 - 3 barcos</option>
                          <option value="4-10">4 - 10 barcos</option>
                          <option value="11-25">11 - 25 barcos</option>
                          <option value="25+">Más de 25</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Puerto Base Principal</label>
                        <input 
                          type="text" 
                          required
                          className="w-full bg-slate-950 border border-slate-800 focus:border-orange-500 rounded-lg px-4 py-3 text-sm text-white focus:outline-none transition-all placeholder:text-slate-600"
                          placeholder="Ej. Marina Ibiza"
                          value={formData.portBase}
                          onChange={(e) => setFormData({...formData, portBase: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 pt-2">
                      <input 
                        type="checkbox" 
                        id="terms" 
                        required
                        className="mt-1 rounded border-slate-800 text-orange-500 focus:ring-orange-500 bg-slate-950"
                        checked={formData.acceptTerms}
                        onChange={(e) => setFormData({...formData, acceptTerms: e.target.checked})}
                      />
                      <label htmlFor="terms" className="text-[10px] text-slate-500 leading-tight">
                        Acepto la política de privacidad de Extinval y autorizo el envío de la checklist de seguridad y ofertas para el mantenimiento de mi flota.
                      </label>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button 
                        type="button"
                        className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-3 text-xs font-bold uppercase tracking-wider rounded-lg transition-all"
                        onClick={() => setFormStep(1)}
                      >
                        Atrás
                      </button>
                      <button 
                        type="submit"
                        disabled={!formData.acceptTerms}
                        className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:hover:bg-orange-500 text-slate-950 font-bold py-3.5 px-6 rounded-lg transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-wider shadow-lg shadow-orange-500/10"
                      >
                        <Download className="w-4 h-4 stroke-[2.5]" />
                        <span>Obtener Checklist</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CALCULADORA DE IMPACTO FINANCIERO - El factor persuasivo supremo */}
      <section className="bg-slate-900 border-y border-slate-800 py-16 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-4">
            <span className="text-orange-500 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
              <TrendingDown className="w-4 h-4 text-orange-500" /> Simulador de Lucro Cesante
            </span>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-white leading-tight">
              ¿Cuánto le cuesta un barco inmovilizado en temporada alta?
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              En Lista 6ª, un fallo menor en una inspección ordinaria de Capitanía o Guardia Civil conlleva la denegación automática del despacho del buque. Esto significa que el barco se queda amarrado, se pierden las reservas contratadas y surgen reclamaciones del pasaje.
            </p>
            <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-800 flex items-start gap-3">
              <Info className="text-orange-400 w-5 h-5 flex-shrink-0 mt-0.5" />
              <p className="text-[11px] text-slate-500 leading-relaxed">
                *Cálculo estimativo para un velero o catamarán de alquiler semanal. El impacto financiero total incluye la pérdida de facturación proporcional al alquiler más un 40% estimado en compensaciones de viaje, cancelaciones reputacionales y recolocación de pasaje.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 bg-slate-950 border border-slate-800 p-6 md:p-8 rounded-2xl grid sm:grid-cols-2 gap-8 relative overflow-hidden">
            <div className="space-y-6">
              {/* Slider 1: Tarifa semanal */}
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  <span>Tarifa Semanal de Alquiler</span>
                  <span className="text-white font-extrabold">{weeklyCharterFee.toLocaleString('es-ES')} €</span>
                </div>
                <input 
                  type="range" 
                  min="2000" 
                  max="15000" 
                  step="500"
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
                  value={weeklyCharterFee}
                  onChange={(e) => setWeeklyCharterFee(Number(e.target.value))}
                />
                <div className="flex justify-between text-[10px] text-slate-600 pt-1.5 font-semibold">
                  <span>2.000 € / sem</span>
                  <span>15.000 € / sem</span>
                </div>
              </div>

              {/* Slider 2: Días parados */}
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  <span>Días de Inmovilización</span>
                  <span className="text-white font-extrabold">{daysOfDetention} {daysOfDetention === 1 ? 'día' : 'días'}</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="14" 
                  step="1"
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
                  value={daysOfDetention}
                  onChange={(e) => setDaysOfDetention(Number(e.target.value))}
                />
                <div className="flex justify-between text-[10px] text-slate-600 pt-1.5 font-semibold">
                  <span>1 día</span>
                  <span>14 días (2 semanas)</span>
                </div>
              </div>
            </div>

            {/* Resultado de la simulación */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col justify-between text-center sm:text-left">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Riesgo Financiero Total</p>
                <p className="text-3xl md:text-4xl font-black text-red-500 tracking-tight">
                  {totalFinancialImpact.toLocaleString('es-ES', { maximumFractionDigits: 0 })} €
                </p>
              </div>
              
              <div className="border-t border-slate-800/80 pt-4 mt-4 space-y-2 text-xs text-slate-400">
                <div className="flex justify-between">
                  <span>Lucro cesante directo:</span>
                  <span className="font-semibold text-slate-200">{lostRevenue.toLocaleString('es-ES', { maximumFractionDigits: 0 })} €</span>
                </div>
                <div className="flex justify-between">
                  <span>Gastos y reclamaciones:</span>
                  <span className="font-semibold text-slate-200">{refundsAndDamages.toLocaleString('es-ES', { maximumFractionDigits: 0 })} €</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* DETALLES DE LA CHECKLIST - ¿Qué audita este documento? */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-black mb-4">¿Qué descubrirá al descargar la Checklist?</h2>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed">
            Un mapa completo y riguroso de todos los puntos de inspección indispensables exigidos por las autoridades en Lista 6ª. Haga clic en las pestañas para ver una previsualización.
          </p>
        </div>

        {/* SELECTOR DE PESTAÑAS (TABS) */}
        <div className="flex flex-col sm:flex-row justify-center border-b border-slate-800 mb-12 max-w-3xl mx-auto gap-2">
          <button 
            onClick={() => setActiveTab('lsa')}
            className={`flex-1 py-3.5 px-4 text-center text-xs font-bold tracking-wider uppercase border-b-2 transition-all ${activeTab === 'lsa' ? 'border-orange-500 text-white bg-slate-900/40' : 'border-transparent text-slate-500 hover:text-slate-400'}`}
          >
            Bloque 1: Salvamento (LSA)
          </button>
          <button 
            onClick={() => setActiveTab('ffe')}
            className={`flex-1 py-3.5 px-4 text-center text-xs font-bold tracking-wider uppercase border-b-2 transition-all ${activeTab === 'ffe' ? 'border-orange-500 text-white bg-slate-900/40' : 'border-transparent text-slate-500 hover:text-slate-400'}`}
          >
            Bloque 2: Incendios (FFE)
          </button>
          <button 
            onClick={() => setActiveTab('docs')}
            className={`flex-1 py-3.5 px-4 text-center text-xs font-bold tracking-wider uppercase border-b-2 transition-all ${activeTab === 'docs' ? 'border-orange-500 text-white bg-slate-900/40' : 'border-transparent text-slate-500 hover:text-slate-400'}`}
          >
            Bloque 3: Documentación
          </button>
        </div>

        {/* CONTENIDO DE LAS PESTAÑAS CON CHECKBOX INTERACTIVO */}
        <div className="space-y-4 mb-10">
          <div className="flex justify-between items-center mb-6 bg-slate-900/40 px-6 py-4 rounded-xl border border-slate-800">
            <div>
              <span className="text-xs font-bold text-orange-500 uppercase tracking-widest">{checklistData[activeTab].badge}</span>
              <h4 className="text-lg font-bold text-white mt-1">{checklistData[activeTab].title}</h4>
              <p className="text-slate-400 text-xs mt-0.5">{checklistData[activeTab].intro}</p>
            </div>
            <span className="hidden md:inline-block text-[10px] font-bold text-slate-500 uppercase tracking-widest">Previsualización Interactiva</span>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {checklistData[activeTab].items.map((item) => {
              const isChecked = checkedItems[item.id];
              return (
                <div 
                  key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  className={`group cursor-pointer border rounded-2xl p-6 transition-all flex flex-col justify-between ${isChecked ? 'bg-slate-900/90 border-orange-500' : 'bg-slate-950 border-slate-800 hover:border-slate-700'}`}
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div className={`w-6 h-6 rounded border flex items-center justify-center transition-all ${isChecked ? 'bg-orange-500 border-orange-500 text-slate-950' : 'border-slate-700 text-transparent group-hover:border-slate-500'}`}>
                        <Check className="w-4 h-4 stroke-[3]" />
                      </div>
                      <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest flex items-center gap-1">
                        <Flame className="w-3.5 h-3.5" /> Crítico
                      </span>
                    </div>

                    <h5 className={`font-bold transition-colors ${isChecked ? 'text-white' : 'text-slate-200 group-hover:text-white'}`}>
                      {item.name}
                    </h5>
                    
                    <p className="text-slate-400 text-xs leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-col gap-1 text-[11px]">
                    <span className="text-slate-500 uppercase font-black tracking-widest text-[9px]">Punto de inspección:</span>
                    <span className="text-orange-400/90 font-semibold">{item.criticalFactor}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-center">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-500 hover:text-orange-400 transition-colors"
          >
            <span>Quiero descargar el documento completo con todos los bloques normativos</span>
            <ChevronRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </section>

      {/* SECCIÓN PROPUESTA DE VALOR / UPSELL: ACUERDOS DE FLOTA B2B */}
      <section id="acuerdos-flota" className="bg-slate-900 py-20 px-6 border-t border-slate-800">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" /> Acuerdos de Flota (Fleet Agreements)
            </span>
            <h2 className="text-3xl md:text-4xl font-black leading-tight text-white">
              Su negocio es vender semanas de chárter.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">El nuestro, que sus barcos nunca paren.</span>
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Gestionar las fechas de caducidad de extintores, balsas salvavidas, radiobalizas y pirotecnia de 5, 10 o más embarcaciones empleando diferentes proveedores locales es una inmensa fuga de tiempo, de dinero y de recursos de administración.
            </p>
            <p className="text-slate-400 text-sm leading-relaxed">
              En <strong>Extinval Group</strong> ofrecemos tarifas unificadas por volumen mediante Acuerdos de Flota específicos para Lista 6ª. Consolidamos y certificamos todos los sistemas de seguridad de sus barcos en <strong>una sola intervención técnica coordinada</strong> durante su parada de invierno o antes del inicio de temporada.
            </p>
          </div>

          <div className="lg:col-span-6 bg-slate-950 border border-slate-800 p-8 rounded-2xl space-y-6 relative overflow-hidden">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <UserCheck className="text-orange-500" /> Ventajas del Plan Unificado de Extinval
            </h3>
            
            <div className="space-y-4 text-sm text-slate-300">
              <div className="flex items-start gap-3">
                <CheckSquare className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5 stroke-[2.5]" />
                <div>
                  <h4 className="font-bold text-white text-sm">Intervenciones Directas en Pantalán</h4>
                  <p className="text-xs text-slate-500">Recogida y entrega de balsas y chalecos inflables directamente en el amarre de su puerto deportivo.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckSquare className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5 stroke-[2.5]" />
                <div>
                  <h4 className="font-bold text-white text-sm">Descuento de Volumen Consolidado</h4>
                  <p className="text-xs text-slate-500">Ahorre en costes administrativos y logísticos con tarifas unificadas por flota.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckSquare className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5 stroke-[2.5]" />
                <div>
                  <h4 className="font-bold text-white text-sm">Certificados Oficiales Sin Demoras</h4>
                  <p className="text-xs text-slate-500">Auditorías rigurosas que garantizan el cumplimiento de Capitanía Marítima y la Guardia Civil.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* FOOTER CORPORATIVO */}
      <footer className="bg-slate-950 py-16 px-6 border-t border-slate-900">
        <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-8 items-start mb-12">
          
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2 text-white">
              <Anchor className="h-6 w-6 text-orange-500 stroke-[2.5]" />
              <span className="font-black text-lg tracking-wider">EXTINVAL GROUP</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
              Soporte técnico integral, inspección, mantenimiento y suministro de sistemas de seguridad y salvamento (FFE & LSA) en los principales hubs náuticos del Mediterráneo y el mundo.
            </p>
          </div>

          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-300">Hubs de Operaciones</h4>
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-500">
              <div>• España (Valencia)</div>
              <div>• USA (Houston, NY)</div>
              <div>• España (Algeciras)</div>
              <div>• USA (Miami)</div>
              <div>• España (Canarias)</div>
              <div>• Panamá | Canadá</div>
            </div>
          </div>

          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-300">Contacto Directo</h4>
            <div className="space-y-2 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-orange-500" />
                <span>+34 96 367 40 53</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-orange-500" />
                <span>service@extinval.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-orange-500" />
                <span>extinval.com</span>
              </div>
            </div>
          </div>

        </div>

        <div className="max-w-6xl mx-auto pt-8 border-t border-slate-900/60 text-center md:flex md:justify-between md:items-center">
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} Extinval Safety Group. Todos los derechos reservados.
          </p>
          <div className="flex justify-center gap-6 text-xs text-slate-600 mt-4 md:mt-0">
            <a href="#" className="hover:text-orange-500 transition-colors">Aviso Legal</a>
            <a href="#" className="hover:text-orange-500 transition-colors">Política de Privacidad</a>
            <a href="#" className="hover:text-orange-500 transition-colors">Política de Cookies</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
