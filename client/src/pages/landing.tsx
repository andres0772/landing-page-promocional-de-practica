import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Smartphone, 
  Activity, 
  Heart, 
  Moon, 
  Battery, 
  CreditCard,
  Menu,
  X,
  CheckCircle2,
  ShieldCheck,
  Truck
} from "lucide-react";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Assets
import imgGrey from "@assets/generated_images/smartwatch_with_grey_strap.png";
import imgGreen from "@assets/generated_images/smartwatch_with_green_strap.png";
import imgBlack from "@assets/generated_images/smartwatch_with_black_strap.png";
import imgLifestyle from "@assets/generated_images/smartwatch_lifestyle_shot.png";

// Types
type ColorOption = "gris" | "verde" | "negro";

interface ProductState {
  color: ColorOption;
  stock: Record<ColorOption, number>;
}

// Data
const PRODUCT_DATA = {
  price: 239900,
  currency: "COP",
  whatsappNumber: "573001234567",
  features: [
    { icon: Smartphone, title: "Llamadas Bluetooth", desc: "Contesta desde tu muñeca" },
    { icon: Activity, title: "Modos Deportivos", desc: "Rastreo preciso de actividad" },
    { icon: Heart, title: "Salud 24/7", desc: "Ritmo cardíaco y oxígeno" },
    { icon: Moon, title: "Monitor de Sueño", desc: "Analiza tu descanso" },
    { icon: Battery, title: "Batería Larga Duración", desc: "Hasta 7 días de uso" },
    { icon: CreditCard, title: "Pagos NFC", desc: "Compatible con sistemas selectos" },
  ],
  specs: [
    { label: "Pantalla", value: 'AMOLED 1.43" HD' },
    { label: "Resistencia", value: "IP67 (Salpicaduras)" },
    { label: "Conexión", value: "Bluetooth 5.0" },
    { label: "Batería", value: "410mAh" },
    { label: "Material", value: "Aleación + Silicona" },
    { label: "Garantía", value: "1 Año Directa" },
  ],
  gallery: [imgLifestyle, imgBlack, imgGreen, imgGrey]
};

const COLOR_MAP: Record<ColorOption, { hex: string, img: string, label: string }> = {
  gris: { hex: "#808080", img: imgGrey, label: "Gris Titanio" },
  verde: { hex: "#4CAF50", img: imgGreen, label: "Verde Neón" },
  negro: { hex: "#0a0a0a", img: imgBlack, label: "Negro Mate" },
};

export default function LandingPage() {
  const [state, setState] = useState<ProductState>({
    color: "gris",
    stock: { gris: 33, verde: 33, negro: 34 }
  });
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Scroll effect for header
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleColorChange = (color: ColorOption) => {
    setState(prev => ({ ...prev, color }));
  };

  const getWhatsappLink = () => {
    const message = `Hola, quiero comprar el Smartwatch Llamadas, color: ${state.color.toUpperCase()}, precio: $${PRODUCT_DATA.price.toLocaleString()}`;
    return `https://wa.me/${PRODUCT_DATA.whatsappNumber}?text=${encodeURIComponent(message)}`;
  };

  const activeData = COLOR_MAP[state.color];
  const currentStock = state.stock[state.color];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-brand-green selection:text-black">
      {/* Header */}
      <header 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
          isScrolled ? "bg-black/80 backdrop-blur-md border-white/10 py-3" : "py-6 bg-transparent"
        )}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="font-bold text-2xl tracking-tighter bg-gradient-to-r from-brand-blue to-brand-green bg-clip-text text-transparent">
            Smartwatch Pro
          </div>
          
          <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-300">
            <a href="#features" className="hover:text-white transition-colors">Características</a>
            <a href="#specs" className="hover:text-white transition-colors">Especificaciones</a>
            <a href="#gallery" className="hover:text-white transition-colors">Galería</a>
          </nav>

          <Button 
            className="hidden md:flex bg-brand-green hover:bg-brand-green/90 text-black font-bold"
            onClick={() => window.open(getWhatsappLink(), '_blank')}
          >
            Comprar Ahora
          </Button>

          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-black/95 border-b border-white/10 overflow-hidden"
            >
              <div className="flex flex-col p-4 gap-4">
                <a href="#features" onClick={() => setMobileMenuOpen(false)} className="block py-2">Características</a>
                <a href="#specs" onClick={() => setMobileMenuOpen(false)} className="block py-2">Especificaciones</a>
                <a href="#gallery" onClick={() => setMobileMenuOpen(false)} className="block py-2">Galería</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-brand-blue/20 rounded-full blur-[120px] -z-10 opacity-30 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-brand-green/10 rounded-full blur-[120px] -z-10 opacity-20 pointer-events-none" />

        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <Badge variant="outline" className="border-brand-green/50 text-brand-green px-4 py-1 text-sm uppercase tracking-wider">
              Nuevo Modelo 2026
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight">
              Tecnología que <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-green">
                impulsa tu vida
              </span>
            </h1>
            
            <p className="text-xl text-gray-400 max-w-lg leading-relaxed">
              Monitorea tu salud, contesta llamadas y supera tus límites con el smartwatch más completo del mercado.
            </p>

            <div className="space-y-6 bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl max-w-md">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Precio Especial</p>
                  <div className="text-4xl font-bold font-mono">
                    $239.900 <span className="text-sm font-sans font-normal text-gray-400">COP</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-brand-green font-medium flex items-center gap-1 justify-end">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-green"></span>
                    </span>
                    Disponible
                  </p>
                  <p className="text-sm text-gray-400">Stock: {currentStock} unid.</p>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-300">Selecciona tu color:</label>
                <div className="flex gap-4">
                  {(Object.keys(COLOR_MAP) as ColorOption[]).map((c) => (
                    <button
                      key={c}
                      onClick={() => handleColorChange(c)}
                      className={cn(
                        "w-12 h-12 rounded-full border-2 transition-all duration-300 flex items-center justify-center relative",
                        state.color === c ? "border-white scale-110 shadow-[0_0_15px_rgba(255,255,255,0.3)]" : "border-transparent opacity-70 hover:opacity-100 hover:scale-105"
                      )}
                      style={{ backgroundColor: COLOR_MAP[c].hex }}
                      aria-label={`Seleccionar color ${c}`}
                    >
                      {state.color === c && <CheckCircle2 className="w-5 h-5 text-white drop-shadow-md" />}
                    </button>
                  ))}
                </div>
                <p className="text-sm text-gray-400">
                  Color seleccionado: <span className="text-white font-medium capitalize">{activeData.label}</span>
                </p>
              </div>

              <Button 
                size="lg" 
                className="w-full h-14 text-lg bg-brand-green hover:bg-brand-green/90 text-black font-bold shadow-[0_0_20px_rgba(76,175,80,0.3)] transition-all hover:scale-[1.02]"
                onClick={() => window.open(getWhatsappLink(), '_blank')}
              >
                Comprar por WhatsApp
              </Button>
              <p className="text-xs text-center text-gray-500 flex items-center justify-center gap-2">
                <ShieldCheck className="w-3 h-3" /> Garantía de 1 año directa
              </p>
            </div>
          </motion.div>

          {/* Image Display */}
          <motion.div 
            key={state.color} // Trigger animation on color change
            initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.5 }}
            className="relative flex justify-center items-center z-10"
          >
            <div className="relative w-full max-w-[500px] aspect-square">
              {/* Decorative Circle Behind */}
              <div className="absolute inset-0 rounded-full border border-white/10 scale-90 animate-[spin_60s_linear_infinite]" />
              <div className="absolute inset-0 rounded-full border border-dashed border-white/5 scale-110 animate-[spin_40s_linear_infinite_reverse]" />
              
              <img 
                src={activeData.img} 
                alt={`Smartwatch ${activeData.label}`}
                className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-20 relative"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-black/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Todo lo que necesitas</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Funcionalidades avanzadas diseñadas para acompañarte en cada momento de tu día.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRODUCT_DATA.features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-blue/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-brand-blue" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Specs & Gallery Split */}
      <section id="specs" className="py-24">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-16">
          {/* Specs Table */}
          <div>
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <Activity className="text-brand-green" />
              Especificaciones Técnicas
            </h2>
            <div className="bg-white/5 rounded-2xl overflow-hidden border border-white/10">
              {PRODUCT_DATA.specs.map((spec, idx) => (
                <div key={idx} className="flex justify-between p-4 border-b border-white/10 last:border-0 hover:bg-white/5 transition-colors">
                  <span className="text-gray-400">{spec.label}</span>
                  <span className="font-medium text-white">{spec.value}</span>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <h3 className="text-xl font-bold mb-4">Contenido de la caja</h3>
              <ul className="grid grid-cols-2 gap-3">
                {["Reloj Inteligente", "Cable Magnético", "Correa Instalada", "Manual Usuario", "2 Correas Extra"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-400 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-brand-green" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Image Gallery */}
          <div id="gallery" className="grid grid-cols-2 gap-4">
            {PRODUCT_DATA.gallery.map((img, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={cn(
                  "rounded-2xl overflow-hidden border border-white/10 relative group",
                  idx === 0 ? "col-span-2 row-span-2" : "col-span-1"
                )}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                <img src={img} alt="Gallery" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Warranty & Footer */}
      <section className="py-24 bg-gradient-to-b from-black to-brand-blue/5">
        <div className="container mx-auto px-4 max-w-3xl text-center mb-20">
          <ShieldCheck className="w-16 h-16 text-brand-blue mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Garantía y Confianza</h2>
          <p className="text-gray-400 mb-8">Comprando con nosotros obtienes respaldo total.</p>
          
          <Accordion type="single" collapsible className="w-full text-left bg-white/5 rounded-xl border border-white/10 px-4">
            <AccordionItem value="item-1" className="border-white/10">
              <AccordionTrigger className="hover:no-underline">¿Qué cubre la garantía?</AccordionTrigger>
              <AccordionContent className="text-gray-400">
                Cubrimos cualquier defecto de fábrica en el funcionamiento del reloj, sensores o pantalla durante 12 meses.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border-white/10">
              <AccordionTrigger className="hover:no-underline">¿Tiempos de envío?</AccordionTrigger>
              <AccordionContent className="text-gray-400">
                Envíos a Bogotá en 24 horas. Resto del país 2-3 días hábiles.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border-transparent">
              <AccordionTrigger className="hover:no-underline">¿Métodos de pago?</AccordionTrigger>
              <AccordionContent className="text-gray-400">
                Pago contra entrega, Nequi, Daviplata y Transferencia Bancaria.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <footer className="bg-black py-12 border-t border-white/10">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-2xl font-bold tracking-tighter">Smartwatch Pro</div>
          <div className="text-gray-500 text-sm">
            © 2026 Smartwatch Pro Colombia. Todos los derechos reservados.
          </div>
          <div className="flex gap-4">
             <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-white/10">
               <Truck className="w-5 h-5" />
             </Button>
             <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-white/10">
               <ShieldCheck className="w-5 h-5" />
             </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}
