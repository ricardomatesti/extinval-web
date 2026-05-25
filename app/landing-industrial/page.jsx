'use client';

import React, { useState } from 'react';
import {
  AlertTriangle,
  Award,
  Building2,
  Check,
  CheckSquare,
  ChevronRight,
  ClipboardList,
  Download,
  Flame,
  Globe,
  Info,
  Lock,
  Mail,
  Phone,
  ShieldCheck,
  TrendingDown,
  Zap,
} from '@/components/landing-icons';

export default function App() {
  // Estado para el formulario de descarga
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    company: '',
    industrySector: '',
    facilitySize: '',
    acceptTerms: false
  });
  const [formStep, setFormStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Estado para la sección interactiva de la checklist técnica
  const [activeTab, setActiveTab] = useState('fixed');
  const [checkedItems, setCheckedItems] = useState({});

  // Estado para el simulador financiero de parada de planta
  const [dailyProductionLoss, setDailyProductionLoss] = useState(45000);
  const [daysOfStoppage, setDaysOfStoppage] = useState(5);

  // Lógica del simulador (Pérdida directa + recargo por sanciones de industria y sobrecostes de seguro)
  const directLoss = dailyProductionLoss * daysOfStoppage;
  const finesAndOverheads = directLoss * 0.45; // 45% adicional estimado por multas, recargos y primas de seguro
  const totalFinancialImpact = directLoss + finesAndOverheads;

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
    if (formData.acceptTerms && formData.name && formData.company && formData.industrySector) {
      setIsSubmitted(true);
    }
  };

  // Datos extraídos del documento PDF para la vista previa de las especificaciones terrestres
  const checklistData = {
    fixed: {
      title: "Bloque 1: Sistemas Fijos de Extinción (FFE)",
      badge: "Marine-Grade Fire Suppression",
      intro: "La primera línea de defensa automatizada para plantas industriales y naves logísticas.",
      items: [
        {
          id: "fix-1",
          name: "Sistemas de Rociadores (Sprinklers)",
          desc: "Verificación de la presión hidráulica en las líneas de distribución principal, estado físico de conservación de las cabezas de rociado y pruebas operativas de grupos de bombeo.",
          criticalFactor: "Evita que un fallo de presión anule la contención automática del fuego."
        },
        {
          id: "fix-2",
          name: "Sistemas de Extinción por Gas y Espuma",
          desc: "Inspección de la carga física de los cilindros de almacenamiento, verificación de actuadores neumáticos/eléctricos y test de estanqueidad (Room Integrity Test) para garantizar la sofocación.",
          criticalFactor: "Imprescindible para salas de servidores (Data Centers) y áreas químicas."
        },
        {
          id: "fix-3",
          name: "Sistemas de Polvo Químico Fijo",
          desc: "Comprobación periódica para asegurar que el agente extintor no se haya compactado debido a vibraciones continuas de maquinaria o humedad ambiental.",
          criticalFactor: "Asegura la perfecta fluidez de descarga en entornos de fabricación pesada."
        }
      ]
    },
    detection: {
      title: "Bloque 2: Detección Centralizada y Atmósferas",
      badge: "Advanced Sensing & Gas Calibration",
      intro: "Gestión inteligente de alarmas ante atmósferas corrosivas, polvo y espacios confinados.",
      items: [
        {
          id: "det-1",
          name: "Auditoría de Sensibilidad (Paneles Globales)",
          desc: "Pruebas funcionales de lazos de control, balanceo de voltajes y actualización de firmware en equipos certificados Siemens, Honeywell, Hochiki, Apollo y Notifier.",
          criticalFactor: "Elimina de raíz las falsas alarmas que provocan costosas paradas innecesarias."
        },
        {
          id: "det-2",
          name: "Calibración de Detectores de Gas ATEX",
          desc: "Calibración de equipos de detección de gases explosivos, tóxicos y deficiencia de oxígeno con patrones internacionales estrictamente trazables (ENAC, PTB, NIST).",
          criticalFactor: "Vital para garantizar la vida humana en silos, arquetas y tanques."
        },
        {
          id: "det-3",
          name: "Garantía Documental ante Inspecciones",
          desc: "Trazabilidad inalterable de todos los certificados de calibración para superar sin incidencias las inspecciones de la Delegación de Industria y PRL.",
          criticalFactor: "Evita cuantiosas sanciones administrativas por falta de conformidad documental."
        }
      ]
    },
    innovation: {
      title: "Bloque 3: Vanguardia Tecnológica e Innovación",
      badge: "Next-Gen Terrestrial Innovation",
      intro: "Tecnología de extinción ecológica y detección inalámbrica para modernizar sus infraestructuras.",
      items: [
        {
          id: "inn-1",
          name: "Aerosoles Condensados Ecológicos",
          desc: "Extinción mediante interrupción físico-química a nivel molecular. Dispositivos autónomos sin necesidad de tuberías, botellas presurizadas ni costosa obra civil.",
          criticalFactor: "Inocuo para componentes electrónicos y salas de control de alta tensión."
        },
        {
          id: "inn-2",
          name: "Detección Inalámbrica (Wireless)",
          desc: "Sistemas de detección óptica de humo y calor que prescinden de cableado estructural, perfectos para layouts dinámicos, reformas continuas o edificios patrimoniales.",
          criticalFactor: "Reduce los tiempos de instalación a la mitad sin detener la producción diaria."
        },
        {
          id: "inn-3",
          name: "Distribución de Portátiles (ABC, CO2, Espuma)",
          desc: "Asignación técnica según un estudio riguroso de carga de fuego: polvo ABC para almacenes, CO2 para maquinaria eléctrica y agentes hídricos para oficinas o retail.",
          criticalFactor: "Asegura una extinción manual inmediata y adecuada a cada tipo de riesgo."
        }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 selection:bg-red-600 selection:text-white">
      
      {/* HEADER DE LA LANDING - Cero fugas de conversión */}
      <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 py-4 px-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-red-600 p-2.5 rounded-lg text-white">
            <Flame className="h-6 w-6 stroke-[2]" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-black text-white leading-none tracking-tight">EXTINVAL INDUSTRIAL</h1>
            <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest">Tierra Firme - Rigor Naval</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-300 bg-slate-800/60 rounded-full px-4 py-1.5 border border-slate-700/50">
          <span className="h-2 w-2 rounded-full bg-red-600 animate-pulse"></span>
          ISO 9001:2015 Certificado
        </div>
      </header>

      {/* HERO SECTION - Dolor operativo industrial y captación */}
      <section className="relative py-16 lg:py-24 px-6 max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
        {/* Efecto de luz de seguridad roja */}
        <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[120px] pointer-events-none"></div>

        {/* COPY PERSUASIVO INDUSTRIAL (Izquierda) */}
        <div className="lg:col-span-7 space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/10 text-red-400 text-xs font-bold uppercase tracking-wider border border-red-500/20">
            <AlertTriangle className="h-4 w-4" />
            La seguridad industrial no admite márgenes de error
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] text-white">
            Aplique el rigor de las <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">inspecciones navales</span> a sus instalaciones de tierra.
          </h2>
          
          <h3 className="text-2xl md:text-3xl font-extrabold text-slate-300">
            Un incendio en alta mar no da segundas oportunidades. Su planta tampoco.
          </h3>

          <p className="text-lg text-slate-400 leading-relaxed max-w-2xl">
            Silos de almacenamiento, naves logísticas automatizadas y centros de retail se enfrentan a riesgos invisibles. Una sola parada imprevista de producción o un fallo de estanqueidad en un sistema fijo de gas puede traducirse en pérdidas de millones de euros y sanciones severas de la administración de Industria.
          </p>

          <p className="text-slate-500 text-sm max-w-xl">
            Nuestros ingenieros han adaptado los protocolos de supervivencia naval que superan las auditorías de DNV, Lloyd's Register o Bureau Veritas para blindar sus activos terrestres críticos.
          </p>

          {/* Garantías técnicas de la división industrial de Extinval */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-6 border-t border-slate-900">
            <div className="flex items-center gap-2.5">
              <Check className="text-red-500 w-5 h-5 stroke-[3]" />
              <span className="text-xs font-semibold text-slate-300">Trazabilidad ENAC</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Check className="text-red-500 w-5 h-5 stroke-[3]" />
              <span className="text-xs font-semibold text-slate-300">Certificación Lloyd's / DNV</span>
            </div>
            <div className="flex items-center gap-2.5 col-span-2 md:col-span-1">
              <Check className="text-red-500 w-5 h-5 stroke-[3]" />
              <span className="text-xs font-semibold text-slate-300">Mantenimiento Crítico 24/7</span>
            </div>
          </div>
        </div>

        {/* FORMULARIO DE CAPTACIÓN EN 2 PASOS (Derecha) */}
        <div className="lg:col-span-5 relative z-10">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
            {/* Sello de descarga gratuita */}
            <div className="absolute top-0 right-0 bg-red-600 text-white font-black text-[10px] uppercase tracking-widest px-4 py-1.5 rounded-bl-lg">
              Guía de Ingeniería PDF
            </div>

            <div className="flex items-center gap-2.5 mb-4">
              <ClipboardList className="text-red-500 h-6 w-6" />
              <h3 className="text-xl font-bold text-white">Descargar Guía de Seguridad</h3>
            </div>

            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              Consiga el documento técnico de inspección y calibración para Facility Managers, Responsables de Mantenimiento y Técnicos de PRL.
            </p>

            {isSubmitted ? (
              <div className="bg-slate-950/80 border border-emerald-500/30 rounded-xl p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto text-emerald-400 border border-emerald-500/20">
                  <ShieldCheck className="w-8 h-8 stroke-[1.5]" />
                </div>
                <h4 className="text-xl font-bold text-white">¡Guía enviada con éxito!</h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Le hemos enviado el enlace de acceso directo al PDF de cumplimiento de seguridad a su dirección de correo corporativa: <strong className="text-slate-200">{formData.email}</strong>.
                </p>
                <div className="pt-4 border-t border-slate-900">
                  <a 
                    href="#diagnostico-gratuito" 
                    className="text-xs font-bold text-red-500 hover:text-red-400 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Solicitar Auditoría de Diagnóstico Integral</span>
                    <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ) : (
              <div>
                {/* Barra de progreso de los pasos */}
                <div className="flex items-center gap-2 mb-6">
                  <div className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${formStep >= 1 ? 'bg-red-600' : 'bg-slate-800'}`}></div>
                  <div className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${formStep >= 2 ? 'bg-red-600' : 'bg-slate-800'}`}></div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-2">Paso {formStep} de 2</span>
                </div>

                {formStep === 1 ? (
                  <form onSubmit={handleNextStep} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Email Corporativo del Profesional</label>
                      <input 
                        type="email" 
                        required
                        className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-lg px-4 py-3 text-sm text-white focus:outline-none transition-all placeholder:text-slate-600"
                        placeholder="ejemplo@nombreempresa.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                    <button 
                      type="submit"
                      className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 px-6 rounded-lg transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-wider shadow-lg shadow-red-500/10"
                    >
                      <span>Siguiente Paso</span>
                      <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                    </button>
                    <div className="flex items-center gap-1.5 justify-center text-[10px] text-slate-500">
                      <Lock className="w-3.5 h-3.5" />
                      <span>Conexión cifrada y tratamiento corporativo seguro</span>
                    </div>
                  </form>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Nombre y Cargo del Responsable</label>
                      <input 
                        type="text" 
                        required
                        className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-lg px-4 py-3 text-sm text-white focus:outline-none transition-all placeholder:text-slate-600"
                        placeholder="Ej. Martín Soler (HSE Manager)"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Nombre de la Compañía / Complejo</label>
                      <input 
                        type="text" 
                        required
                        className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-lg px-4 py-3 text-sm text-white focus:outline-none transition-all placeholder:text-slate-600"
                        placeholder="Ej. Industrias Químicas Levantinas"
                        value={formData.company}
                        onChange={(e) => setFormData({...formData, company: e.target.value})}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Sector de Actividad</label>
                        <select 
                          required
                          className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-lg px-4 py-3 text-sm text-white focus:outline-none transition-all bg-slate-950"
                          value={formData.industrySector}
                          onChange={(e) => setFormData({...formData, industrySector: e.target.value})}
                        >
                          <option value="">Seleccionar...</option>
                          <option value="quimica">Químico / Farmacéutico</option>
                          <option value="logistica">Logística / Almacén</option>
                          <option value="alimentacion">Alimentario / Silos</option>
                          <option value="retail">Comercial / Retail / Oficinas</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Localización (Provincia)</label>
                        <input 
                          type="text" 
                          required
                          className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-lg px-4 py-3 text-sm text-white focus:outline-none transition-all placeholder:text-slate-600"
                          placeholder="Ej. Valencia, Algeciras"
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
                        className="mt-1 rounded border-slate-800 text-red-500 focus:ring-red-500 bg-slate-950"
                        checked={formData.acceptTerms}
                        onChange={(e) => setFormData({...formData, acceptTerms: e.target.checked})}
                      />
                      <label htmlFor="terms" className="text-[10px] text-slate-500 leading-tight">
                        Acepto la política de privacidad de Extinval y autorizo el envío de la guía de seguridad y de ofertas para auditorías de mantenimiento.
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
                        className="flex-1 bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:hover:bg-red-600 text-white font-bold py-3.5 px-6 rounded-lg transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-wider shadow-lg shadow-red-500/10"
                      >
                        <Download className="w-4 h-4 stroke-[2.5]" />
                        <span>Obtener la Guía</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CALCULADORA DE IMPACTO FINANCIERO - Elemento persuasivo de primer nivel */}
      <section className="bg-slate-900 border-y border-slate-800 py-16 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-4">
            <span className="text-red-500 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
              <TrendingDown className="w-4 h-4 text-red-500" /> Simulador de Costes por Paralización de Planta
            </span>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-white leading-tight">
              ¿Cuánto le cuesta un día de parada en su cadena de producción?
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              En complejos industriales, un falso disparo de alarma o el retraso en la certificación de estanqueidad de un sistema de CO2 puede obligar a suspender toda la actividad manufacturera. Calcule de forma interactiva la magnitud de las pérdidas económicas directas e indirectas por falta de un mantenimiento preventivo riguroso.
            </p>
            <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-800 flex items-start gap-3">
              <Info className="text-red-400 w-5 h-5 flex-shrink-0 mt-0.5" />
              <p className="text-[11px] text-slate-500 leading-relaxed">
                *Cálculo estimativo para plantas de producción y centros de distribución. El impacto financiero final incluye las pérdidas por producción suspendida (lucro cesante) más un 45% estimado por sanciones administrativas de industria, recargos de primas de seguro y rotura de la cadena de suministro logístico.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 bg-slate-950 border border-slate-800 p-6 md:p-8 rounded-2xl grid sm:grid-cols-2 gap-8 relative overflow-hidden">
            <div className="space-y-6">
              {/* Slider 1: Pérdida diaria de producción */}
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  <span>Pérdida de Producción Diaria</span>
                  <span className="text-white font-extrabold">{dailyProductionLoss.toLocaleString('es-ES')} € / día</span>
                </div>
                <input 
                  type="range" 
                  min="5000" 
                  max="200000" 
                  step="5000"
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-600"
                  value={dailyProductionLoss}
                  onChange={(e) => setDailyProductionLoss(Number(e.target.value))}
                />
                <div className="flex justify-between text-[10px] text-slate-600 pt-1.5 font-semibold">
                  <span>5.000 € / día</span>
                  <span>200.000 € / día</span>
                </div>
              </div>

              {/* Slider 2: Días parados */}
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  <span>Días Estimados de Parada</span>
                  <span className="text-white font-extrabold">{daysOfStoppage} {daysOfStoppage === 1 ? 'día' : 'días'}</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="30" 
                  step="1"
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-600"
                  value={daysOfStoppage}
                  onChange={(e) => setDaysOfStoppage(Number(e.target.value))}
                />
                <div className="flex justify-between text-[10px] text-slate-600 pt-1.5 font-semibold">
                  <span>1 día</span>
                  <span>30 días (1 mes)</span>
                </div>
              </div>
            </div>

            {/* Resultado de la simulación */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col justify-between text-center sm:text-left">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Impacto Financiero Total Estimado</p>
                <p className="text-3xl md:text-4xl font-black text-red-500 tracking-tight">
                  {totalFinancialImpact.toLocaleString('es-ES', { maximumFractionDigits: 0 })} €
                </p>
              </div>
              
              <div className="border-t border-slate-800/80 pt-4 mt-4 space-y-2 text-xs text-slate-400">
                <div className="flex justify-between">
                  <span>Lucro cesante directo:</span>
                  <span className="font-semibold text-slate-200">{directLoss.toLocaleString('es-ES', { maximumFractionDigits: 0 })} €</span>
                </div>
                <div className="flex justify-between">
                  <span>Costes y multas derivadas:</span>
                  <span className="font-semibold text-slate-200">{finesAndOverheads.toLocaleString('es-ES', { maximumFractionDigits: 0 })} €</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* DETALLES DE LA CHECKLIST - ¿Qué audita este documento? */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-black mb-4">Ejes Críticos de la Auditoría Técnica de Incendios</h2>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed">
            Nuestra guía detalla los métodos y estándares internacionales empleados para asegurar el pleno funcionamiento de sus infraestructuras terrestres críticas.
          </p>
        </div>

        {/* SELECTOR DE PESTAÑAS (TABS) */}
        <div className="flex flex-col sm:flex-row justify-center border-b border-slate-800 mb-12 max-w-3xl mx-auto gap-2">
          <button 
            onClick={() => setActiveTab('fixed')}
            className={`flex-1 py-3.5 px-4 text-center text-xs font-bold tracking-wider uppercase border-b-2 transition-all ${activeTab === 'fixed' ? 'border-red-600 text-white bg-slate-900/40' : 'border-transparent text-slate-500 hover:text-slate-400'}`}
          >
            Sistemas Fijos (FFE)
          </button>
          <button 
            onClick={() => setActiveTab('detection')}
            className={`flex-1 py-3.5 px-4 text-center text-xs font-bold tracking-wider uppercase border-b-2 transition-all ${activeTab === 'detection' ? 'border-red-600 text-white bg-slate-900/40' : 'border-transparent text-slate-500 hover:text-slate-400'}`}
          >
            Detección & Atmósferas
          </button>
          <button 
            onClick={() => setActiveTab('innovation')}
            className={`flex-1 py-3.5 px-4 text-center text-xs font-bold tracking-wider uppercase border-b-2 transition-all ${activeTab === 'innovation' ? 'border-red-600 text-white bg-slate-900/40' : 'border-transparent text-slate-500 hover:text-slate-400'}`}
          >
            Innovación & Portátiles
          </button>
        </div>

        {/* CONTENIDO DE LAS PESTAÑAS CON CHECKBOX INTERACTIVO */}
        <div className="space-y-4 mb-10">
          <div className="flex justify-between items-center mb-6 bg-slate-900/40 px-6 py-4 rounded-xl border border-slate-800">
            <div>
              <span className="text-xs font-bold text-red-500 uppercase tracking-widest">{checklistData[activeTab].badge}</span>
              <h4 className="text-lg font-bold text-white mt-1">{checklistData[activeTab].title}</h4>
              <p className="text-slate-400 text-xs mt-0.5">{checklistData[activeTab].intro}</p>
            </div>
            <span className="hidden md:inline-block text-[10px] font-bold text-slate-500 uppercase tracking-widest">Previsualización Técnica</span>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {checklistData[activeTab].items.map((item) => {
              const isChecked = checkedItems[item.id];
              return (
                <div 
                  key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  className={`group cursor-pointer border rounded-2xl p-6 transition-all flex flex-col justify-between ${isChecked ? 'bg-slate-900/90 border-red-500 shadow-lg shadow-red-500/5' : 'bg-slate-950 border-slate-800 hover:border-slate-700'}`}
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div className={`w-6 h-6 rounded border flex items-center justify-center transition-all ${isChecked ? 'bg-red-600 border-red-600 text-white' : 'border-slate-700 text-transparent group-hover:border-slate-500'}`}>
                        <Check className="w-4 h-4 stroke-[3]" />
                      </div>
                      <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest flex items-center gap-1">
                        <Zap className="w-3.5 h-3.5" /> Estándar Naval
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
                    <span className="text-red-400/90 font-semibold">{item.criticalFactor}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-center">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-500 hover:text-red-400 transition-colors"
          >
            <span>Quiero descargar el manual completo de inspección contra incendios</span>
            <ChevronRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </section>

      {/* SECCIÓN PROPUESTA DE VALOR: AUDITORÍA GRATUITA DE DIAGNÓSTICO INTEGRAL */}
      <section id="diagnostico-gratuito" className="bg-slate-900 py-20 px-6 border-t border-slate-800">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/10 text-red-400 text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" /> Auditoría de Diagnóstico Industrial
            </span>
            <h2 className="text-3xl md:text-4xl font-black leading-tight text-white">
              No espere a que la inspección de Industria o un siniestro evalúe su seguridad.
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Consolidar el mantenimiento con un solo proveedor que entienda de sistemas fijos, centrales de lazos de control y calibración de atmósferas le ahorrará miles de euros y erradicará el caos organizativo de contratar diferentes empresas locales independientes.
            </p>
            <p className="text-slate-400 text-sm leading-relaxed">
              En <strong>Extinval Group</strong> ofrecemos un plan de servicio preventivo con respuesta garantizada <strong>24/7</strong> para entornos logísticos e industriales críticos. Unifique sus calendarios técnicos y garantice la continuidad y resiliencia de su negocio.
            </p>
          </div>

          <div className="lg:col-span-6 bg-slate-950 border border-slate-800 p-8 rounded-2xl space-y-6 relative overflow-hidden">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Building2 className="text-red-500" /> Plan de Servicio Terrestre Extinval
            </h3>
            
            <div className="space-y-4 text-sm text-slate-300">
              <div className="flex items-start gap-3">
                <CheckSquare className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5 stroke-[2.5]" />
                <div>
                  <h4 className="font-bold text-white text-sm">Paradas de Planta Optimizadas</h4>
                  <p className="text-xs text-slate-500">Programamos las revisiones técnicas en bandas horarias específicas para no detener su cadena de producción.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckSquare className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5 stroke-[2.5]" />
                <div>
                  <h4 className="font-bold text-white text-sm">Trazabilidad Total ENAC e ISO</h4>
                  <p className="text-xs text-slate-500">Garantía de certificados inalterables con calibraciones trazables ante laboratorios de metrología oficiales.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckSquare className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5 stroke-[2.5]" />
                <div>
                  <h4 className="font-bold text-white text-sm">Ingeniería Naval sobre Tierra Firme</h4>
                  <p className="text-xs text-slate-500">Aplicamos a sus infraestructuras comerciales el mismo nivel de exigencia estricto con el que blindamos buques transoceánicos.</p>
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
              <Flame className="h-6 w-6 text-red-500 stroke-[2.5]" />
              <span className="font-black text-lg tracking-wider">EXTINVAL GROUP</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
              Soporte técnico integral, mantenimiento predictivo y preventivo de instalaciones fijas, sensores e instrumentación (FFE y LSA) bajo estándares navales internacionales.
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
                <Phone className="w-4 h-4 text-red-500" />
                <span>+34 96 367 40 53</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-red-500" />
                <span>service@extinval.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-red-500" />
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
            <a href="#" className="hover:text-red-500 transition-colors">Aviso Legal</a>
            <a href="#" className="hover:text-red-500 transition-colors">Política de Privacidad</a>
            <a href="#" className="hover:text-red-500 transition-colors">Política de Cookies</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
