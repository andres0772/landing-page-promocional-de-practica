/**
 * Tipos para la landing page del Smartwatch Pro
 * Centraliza todas las interfaces para mantener consistencia
 */

// FAQ Types
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: 'general' | 'technical' | 'shipping' | 'warranty';
}

export interface FAQCategory {
  id: string;
  title: string;
  items: FAQItem[];
}

// Animation Types
export interface ScrollAnimationConfig {
  trigger?: string;
  threshold?: number;
  rootMargin?: string;
  delay?: number;
  duration?: number;
  easing?: string;
}

export interface AnimationVariant {
  hidden: Record<string, any>;
  visible: Record<string, any>;
}

// Enhanced Chatbot Types
export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  typing?: boolean;
  intent?: string;
  confidence?: number;
}

export interface ChatbotConfig {
  isOpen: boolean;
  messages: ChatMessage[];
  isTyping: boolean;
  inputText: string;
  context?: ChatContext;
}

export interface ChatContext {
  lastIntent?: string;
  topicHistory: string[];
  userPreferences?: {
    name?: string;
    interestedIn?: string[];
  };
  conversationStage: 'greeting' | 'exploration' | 'consideration' | 'purchase' | 'support';
}

export interface ChatbotResponse {
  text: string;
  intent: string;
  confidence: number;
  options?: string[];
  actions?: ChatAction[];
  delay?: number;
  followUp?: string;
}

export interface ChatAction {
  type: 'button' | 'link' | 'whatsapp';
  label: string;
  action: string;
  primary?: boolean;
}

export interface IntentPattern {
  intent: string;
  keywords: string[];
  weight: number;
  context?: string[];
  response: ChatbotResponse;
}

// Enhanced Product Types
export interface ProductFeature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  animationDelay?: number;
}

export interface ProductSpec {
  label: string;
  value: string;
  category?: 'display' | 'hardware' | 'connectivity' | 'physical';
}

// Animation Presets
export const ANIMATION_PRESETS = {
  fadeInUp: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  },
  fadeInLeft: {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 }
  },
  fadeInRight: {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 }
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 }
  }
} as const;

// Enhanced Chatbot Responses Data
export const CHATBOT_RESPONSES: Record<string, ChatbotResponse> = {
  greeting: {
    text: "¡Hola! Soy el asistente virtual de Smartwatch Pro. ¿En qué puedo ayudarte hoy?",
    intent: 'greeting',
    confidence: 1.0,
    options: ["Características", "Precios", "Garantía", "Envíos"],
    actions: [
      { type: 'button', label: 'Ver características', action: 'features', primary: true },
      { type: 'button', label: 'Ver precios', action: 'price' }
    ],
    delay: 500
  },
  features: {
    text: "Nuestro Smartwatch Pro incluye llamadas Bluetooth, monitoreo de salud 24/7, 7 días de batería y resistencia al agua IP67. ¿Qué función te interesa más?",
    intent: 'features',
    confidence: 0.9,
    options: ["Salud", "Batería", "Conectividad", "Diseño"],
    actions: [
      { type: 'button', label: 'Monitoreo de salud', action: 'health' },
      { type: 'button', label: 'Batería de 7 días', action: 'battery' }
    ],
    delay: 800
  },
  price: {
    text: "El Smartwatch Pro tiene un precio especial de $239.900 COP. Incluye el reloj, 3 correas, cable magnético y garantía de 1 año. ¿Querés saber sobre formas de pago?",
    intent: 'price',
    confidence: 0.95,
    options: ["Formas de pago", "Comprar ahora"],
    actions: [
      { type: 'whatsapp', label: 'Comprar por WhatsApp', action: 'https://wa.me/573001234567', primary: true },
      { type: 'button', label: 'Formas de pago', action: 'payment' }
    ],
    delay: 600
  },
  warranty: {
    text: "Ofrecemos garantía directa de 1 año que cubre defectos de fábrica. También tenemos soporte técnico post-venta. ¿Necesitas los detalles completos?",
    intent: 'warranty',
    confidence: 0.9,
    options: ["Ver detalles", "Contactar soporte"],
    actions: [
      { type: 'button', label: 'Ver detalles completos', action: 'warranty_details' },
      { type: 'button', label: 'Soporte técnico', action: 'support' }
    ],
    delay: 700
  },
  shipping: {
    text: "Envíos a Bogotá en 24 horas y resto del país 2-3 días hábiles. Trabajamos con transportadoras confiables y te damos número de seguimiento.",
    intent: 'shipping',
    confidence: 0.95,
    options: ["Costos de envío", "Comprar ahora"],
    actions: [
      { type: 'button', label: 'Calcular envío', action: 'shipping_calculator' },
      { type: 'whatsapp', label: 'Comprar ahora', action: 'https://wa.me/573001234567' }
    ],
    delay: 500
  },
  health: {
    text: "El Smartwatch Pro monitorea tu salud 24/7: frecuencia cardíaca, saturación de oxígeno, calidad de sueño, pasos y calorías. Incluye alertas de sedentarismo y seguimiento de entrenamientos. ¿Qué función de salud te interesa más?",
    intent: 'health',
    confidence: 0.9,
    options: ["Frecuencia cardíaca", "Sueño", "Entrenamientos"],
    actions: [
      { type: 'button', label: 'Ver todas las funciones', action: 'features' },
      { type: 'button', label: 'Especificaciones', action: 'specs' }
    ],
    delay: 700
  },
  battery: {
    text: "¡7 días de batería con uso normal! Con GPS activo dura 48 horas. Carga rápida magnética: 30 minutos = 50% de batería. Compatible con cualquier cargador USB-C. ¿Querés saber sobre el tipo de carga?",
    intent: 'battery',
    confidence: 0.95,
    options: ["Tiempo de carga", "Tipo de cargador", "Duración con GPS"],
    actions: [
      { type: 'button', label: 'Ver especificaciones', action: 'specs' },
      { type: 'button', label: 'Comprar ahora', action: 'https://wa.me/573001234567' }
    ],
    delay: 600
  },
  connectivity: {
    text: "Conectividad total: Bluetooth 5.0 para llamadas y notificaciones, GPS integrado, WiFi y compatible con iOS 12+ y Android 8+. Recibe WhatsApp, Instagram y llamadas directamente en el reloj. ¿Tu celular es compatible?",
    intent: 'connectivity',
    confidence: 0.9,
    options: ["Compatibilidad iOS", "Compatibilidad Android", "Notificaciones"],
    actions: [
      { type: 'button', label: 'Ver compatibilidad', action: 'specs' },
      { type: 'button', label: 'Probar compatibilidad', action: 'https://wa.me/573001234567' }
    ],
    delay: 600
  },
  specs: {
    text: "Especificaciones técnicas: Pantalla táctil AMOLED 1.4\" (454x454px), Procesador dual-core, 1GB RAM + 8GB almacenamiento, Resistencia IP67 (hasta 1m agua), Sensor óptico de ritmo cardíaco, Acelerómetro, Giroscopio, GPS. ¿Querés detalles de alguna especificación?",
    intent: 'specs',
    confidence: 0.95,
    options: ["Pantalla", "Almacenamiento", "Resistencia al agua"],
    actions: [
      { type: 'button', label: 'Ver ficha técnica', action: 'specs' },
      { type: 'button', label: 'Comparar modelos', action: 'https://wa.me/573001234567' }
    ],
    delay: 800
  },
  water_resistance: {
    text: "¡Sí! Es resistente al agua IP67, lo que significa que podés nadar, ducharte y hacer deportes acuáticos sin problemas. Soporta inmersión hasta 1 metro durante 30 minutos. No es recomendable para buceo profundo. ¿Qué actividad acuática practicás?",
    intent: 'water_resistance',
    confidence: 0.95,
    options: ["Nadar", "Ducharse", "Deportes acuáticos"],
    actions: [
      { type: 'button', label: 'Ver más usos', action: 'features' },
      { type: 'button', label: 'Comprar ahora', action: 'https://wa.me/573001234567' }
    ],
    delay: 500
  },
  payment: {
    text: "Aceptamos todos los métodos de pago: Tarjetas de crédito/débito, PSE, Nequi, Daviplata, efectivo contraentrega y cuotas con todas las tarjetas hasta 12 meses sin interés. ¿Qué método de pago preferís?",
    intent: 'payment',
    confidence: 0.95,
    options: ["Cuotas sin interés", "PSE", "Contraentrega"],
    actions: [
      { type: 'whatsapp', label: 'Comprar ahora', action: 'https://wa.me/573001234567', primary: true },
      { type: 'button', label: 'Ver todos los métodos', action: 'payment' }
    ],
    delay: 600
  },
  default: {
    text: "¡Hola! Soy el asistente virtual de Smartwatch Pro. Puedo ayudarte con características técnicas, precios, formas de pago, envíos y garantía. ¿Qué te gustaría conocer sobre nuestro smartwatch?",
    intent: 'fallback',
    confidence: 0.3,
    options: ["Características", "Precios", "Comprar", "Soporte"],
    actions: [
      { type: 'button', label: 'Ver características', action: 'features', primary: true },
      { type: 'button', label: 'Ver precios', action: 'price' },
      { type: 'whatsapp', label: 'Comprar por WhatsApp', action: 'https://wa.me/573001234567' }
    ],
    delay: 400
  }
};

// Intent Patterns for intelligent matching
export const INTENT_PATTERNS: IntentPattern[] = [
  {
    intent: 'greeting',
    keywords: ['hola', 'buenos', 'hey', 'saludos', 'buen día', 'buenas tardes', 'qué tal'],
    weight: 1.0,
    response: CHATBOT_RESPONSES.greeting
  },
  {
    intent: 'features',
    keywords: ['característica', 'funciona', 'hace', 'puede', 'función', 'capacidad', 'smartwatch', 'reloj', 'qué es'],
    weight: 0.9,
    response: CHATBOT_RESPONSES.features
  },
  {
    intent: 'price',
    keywords: ['precio', 'costo', 'cuánto', 'valor', 'cuesta', 'pagar', 'cuánto vale', 'costa'],
    weight: 0.95,
    response: CHATBOT_RESPONSES.price
  },
  {
    intent: 'warranty',
    keywords: ['garantía', 'garantia', 'asegurado', 'soporte', 'falla', 'problema', 'defecto'],
    weight: 0.9,
    response: CHATBOT_RESPONSES.warranty
  },
  {
    intent: 'shipping',
    keywords: ['envío', 'envio', 'llega', 'entrega', 'tiempo', 'días', 'cuándo', 'dónde'],
    weight: 0.95,
    response: CHATBOT_RESPONSES.shipping
  },
  {
    intent: 'purchase',
    keywords: ['comprar', 'adquirir', 'pedido', 'orden', 'whatsapp', 'quiero', 'dónde compro'],
    weight: 0.9,
    response: CHATBOT_RESPONSES.price
  },
  {
    intent: 'technical',
    keywords: ['batería', 'bateria', 'carga', 'duración', 'agua', 'resistente', 'pantalla', 'tamaño'],
    weight: 0.8,
    context: ['features'],
    response: CHATBOT_RESPONSES.features
  },
  {
    intent: 'health',
    keywords: ['salud', 'corazón', 'cardíaca', 'frecuencia', 'pulso', 'sueño', 'dormir', 'pasos', 'calorías', 'ejercicio', 'entrenamiento', 'oxígeno', 'spo2'],
    weight: 0.9,
    response: CHATBOT_RESPONSES.health
  },
  {
    intent: 'battery',
    keywords: ['batería', 'bateria', 'carga', 'duracion', 'dura', 'cuánto dura', 'horas', 'días', 'cargador', 'usb'],
    weight: 0.95,
    response: CHATBOT_RESPONSES.battery
  },
  {
    intent: 'connectivity',
    keywords: ['bluetooth', 'wifi', 'gps', 'conexión', 'conectar', 'llamadas', 'notificaciones', 'whatsapp', 'instagram', 'compatible', 'ios', 'android', 'iphone'],
    weight: 0.9,
    response: CHATBOT_RESPONSES.connectivity
  },
  {
    intent: 'specs',
    keywords: ['especificaciones', 'especifico', 'técnico', 'ficha', 'pantalla', 'procesador', 'ram', 'almacenamiento', 'tamaño', 'peso'],
    weight: 0.85,
    response: CHATBOT_RESPONSES.specs
  },
  {
    intent: 'water_resistance',
    keywords: ['agua', 'nadar', 'ducha', 'mojarse', 'resistente', 'sumergir', 'ip67', 'impermeable', 'acuático'],
    weight: 0.95,
    response: CHATBOT_RESPONSES.water_resistance
  },
  {
    intent: 'payment',
    keywords: ['pago', 'pagar', 'tarjeta', 'crédito', 'débito', 'pse', 'nequi', 'daviplata', 'cuotas', 'efectivo', 'contraentrega'],
    weight: 0.9,
    response: CHATBOT_RESPONSES.payment
  }
];
