import { FAQCategory } from '@/types/landing';

export const FAQ_DATA: FAQCategory[] = [
  {
    id: 'general',
    title: 'Preguntas Frecuentes',
    items: [
      {
        id: 'warranty',
        question: '¿Qué cubre la garantía?',
        answer: 'Cubrimos cualquier defecto de fábrica en el funcionamiento del reloj, sensores o pantalla durante 12 meses. La garantía no cubre daños por mal uso, caídas o contacto con líquidos beyond IP67.',
        category: 'warranty'
      },
      {
        id: 'shipping',
        question: '¿Tiempos de envío?',
        answer: 'Envíos a Bogotá en 24 horas hábiles. Resto del país 2-3 días hábiles. Trabajamos con servientrega y Coordinadora para cobertura nacional.',
        category: 'shipping'
      },
      {
        id: 'payment',
        question: '¿Métodos de pago?',
        answer: 'Aceptamos pago contra entrega, Nequi, Daviplata, Transferencia Bancaria y tarjetas de crédito/débito. También ofrecemos cuotas con algunas tarjetas seleccionadas.',
        category: 'general'
      },
      {
        id: 'compatibility',
        question: '¿Con qué celulares es compatible?',
        answer: 'Compatible con Android 6.0+ y iOS 10.0+. Requiere Bluetooth 4.0 o superior. Funciona con Samsung, iPhone, Xiaomi, Motorola y la mayoría de marcas populares.',
        category: 'technical'
      },
      {
        id: 'battery',
        question: '¿Cuánto dura la batería realmente?',
        answer: 'Con uso normal (notificaciones, actividad básica) dura 7 días. Con GPS continuo y llamadas frecuentes dura 2-3 días. Incluye carga rápida que alcanza 80% en 45 minutos.',
        category: 'technical'
      },
      {
        id: 'water',
        question: '¿Puedo nadar con el reloj?',
        answer: 'Resistencia IP67 significa que soporta salpicaduras, lluvia y duchas, pero no recomendamos nadar o sumergirlo por más de 30 minutos. Es perfecto para uso diario y deportes.',
        category: 'technical'
      },
      {
        id: 'returns',
        question: '¿Puedo devolverlo si no me gusta?',
        answer: 'Sí, tienes 15 días para devolución si el producto está en perfectas condiciones. Solo pagas el envío de devolución. Reembolso en 48 horas hábiles.',
        category: 'general'
      },
      {
        id: 'support',
        question: '¿Qué incluye la caja?',
        answer: 'Incluye Smartwatch Pro, correa instalada, 2 correas adicionales (diferentes colores), cable magnético de carga, manual de usuario y tarjeta de garantía.',
        category: 'general'
      }
    ]
  }
];
