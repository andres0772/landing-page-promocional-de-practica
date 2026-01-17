import { 
  ChatMessage, 
  ChatbotResponse, 
  ChatContext, 
  IntentPattern,
  INTENT_PATTERNS,
  CHATBOT_RESPONSES 
} from '@/types/landing';

export class ChatbotEngine {
  private context: ChatContext = {
    topicHistory: [],
    conversationStage: 'greeting'
  };

  // Calculate intent confidence based on keywords
  private calculateIntentScore(userInput: string, pattern: IntentPattern): number {
    const input = userInput.toLowerCase();
    let score = 0;
    let matchedKeywords = 0;

    for (const keyword of pattern.keywords) {
      if (input.includes(keyword.toLowerCase())) {
        score += pattern.weight;
        matchedKeywords++;
      }
    }

    // Bonus for multiple keyword matches
    if (matchedKeywords > 1) {
      score *= (1 + (matchedKeywords - 1) * 0.2);
    }

    // Context awareness bonus
    if (pattern.context && this.context.lastIntent) {
      if (pattern.context.includes(this.context.lastIntent)) {
        score *= 1.3;
      }
    }

    return Math.min(score, 1.0);
  }

  // Find best matching intent
  private findBestIntent(userInput: string): { intent: string; confidence: number; response: ChatbotResponse } {
    let bestMatch = {
      intent: 'fallback',
      confidence: 0.0,
      response: CHATBOT_RESPONSES.default
    };

    const input = userInput.toLowerCase();

    for (const pattern of INTENT_PATTERNS) {
      let score = 0;
      let matchedKeywords = 0;

      for (const keyword of pattern.keywords) {
        if (input.includes(keyword.toLowerCase())) {
          score += pattern.weight;
          matchedKeywords++;
        }
      }

      // Bonus for multiple keyword matches
      if (matchedKeywords > 1) {
        score *= (1 + (matchedKeywords - 1) * 0.2);
      }

      // Context awareness bonus
      if (pattern.context && this.context.lastIntent) {
        if (pattern.context.includes(this.context.lastIntent)) {
          score *= 1.3;
        }
      }

      // Bonus for exact phrase matches
      if (input.includes('smartwatch') || input.includes('reloj')) {
        score *= 1.2;
      }

      if (score > bestMatch.confidence) {
        bestMatch = {
          intent: pattern.intent,
          confidence: Math.min(score, 1.0),
          response: pattern.response
        };
      }
    }

    return bestMatch;
  }

  // Update conversation context
  private updateContext(intent: string, userInput: string): void {
    this.context.lastIntent = intent;
    this.context.topicHistory.push(intent);

    // Update conversation stage based on history
    if (this.context.topicHistory.length === 1) {
      this.context.conversationStage = 'exploration';
    } else if (this.context.topicHistory.includes('price') || this.context.topicHistory.includes('purchase')) {
      this.context.conversationStage = 'purchase';
    } else if (this.context.topicHistory.includes('warranty') || this.context.topicHistory.includes('shipping')) {
      this.context.conversationStage = 'consideration';
    }

    // Keep only last 10 topics
    if (this.context.topicHistory.length > 10) {
      this.context.topicHistory = this.context.topicHistory.slice(-10);
    }
  }

  // Generate contextual response
  private generateContextualResponse(intent: string, confidence: number): ChatbotResponse {
    const baseResponse = CHATBOT_RESPONSES[intent] || CHATBOT_RESPONSES.default;
    
    // Enhance response based on conversation stage
    let enhancedResponse = { ...baseResponse };

    switch (this.context.conversationStage) {
      case 'purchase':
        if (intent === 'features') {
          enhancedResponse.followUp = "¿Te gustaría ver los precios o prefieres seguir explorando características?";
        }
        break;
      case 'consideration':
        if (intent === 'default') {
          enhancedResponse.text = "Basado en tu interés, ¿te gustaría conocer más sobre la garantía o los tiempos de envío?";
        }
        break;
    }

    return enhancedResponse;
  }

  // Process user message and generate response
  public processMessage(userInput: string): { message: ChatMessage; response: ChatbotResponse } {
    const bestMatch = this.findBestIntent(userInput);
    this.updateContext(bestMatch.intent, userInput);
    
    const response = this.generateContextualResponse(bestMatch.intent, bestMatch.confidence);

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: userInput,
      sender: 'user',
      timestamp: new Date(),
      intent: bestMatch.intent,
      confidence: bestMatch.confidence
    };

    return { message: userMessage, response };
  }

  // Handle action button clicks
  public handleAction(action: string): ChatbotResponse {
    switch (action) {
      case 'features':
        return CHATBOT_RESPONSES.features;
      case 'price':
        return CHATBOT_RESPONSES.price;
      case 'warranty':
        return CHATBOT_RESPONSES.warranty;
      case 'shipping':
        return CHATBOT_RESPONSES.shipping;
      case 'menu':
        return CHATBOT_RESPONSES.greeting;
      case 'health':
        return CHATBOT_RESPONSES.health;
      case 'battery':
        return CHATBOT_RESPONSES.battery;
      case 'connectivity':
        return CHATBOT_RESPONSES.connectivity;
      case 'specs':
        return CHATBOT_RESPONSES.specs;
      case 'water_resistance':
        return CHATBOT_RESPONSES.water_resistance;
      case 'payment':
        return CHATBOT_RESPONSES.payment;
      default:
        return CHATBOT_RESPONSES.default;
    }
  }

  // Get current context
  public getContext(): ChatContext {
    return { ...this.context };
  }

  // Reset conversation
  public reset(): void {
    this.context = {
      topicHistory: [],
      conversationStage: 'greeting'
    };
  }

  // Get conversation suggestions based on context
  public getSuggestions(): string[] {
    const suggestions: string[] = [];
    
    switch (this.context.conversationStage) {
      case 'greeting':
        suggestions.push('¿Cuáles son las características?', '¿Cuánto cuesta?', '¿Tienen garantía?', '¿Es resistente al agua?');
        break;
      case 'exploration':
        suggestions.push('¿Cuánto dura la batería?', '¿Puedo nadar con él?', '¿Tiene GPS?', '¿Compatible con iPhone?', '¿Monitorea el sueño?');
        break;
      case 'consideration':
        suggestions.push('¿Cuánto cuesta el envío?', '¿Qué incluye la caja?', '¿Hay descuentos?', '¿Cómo hago la garantía?', '¿Cuáles son las especificaciones?');
        break;
      case 'purchase':
        suggestions.push('¿Cómo compro?', '¿Aceptan tarjeta?', '¿Envían hoy mismo?', '¿Hay cuotas sin interés?', '¿Métodos de pago?');
        break;
      case 'support':
        suggestions.push('¿Cómo lo configuro?', '¿La app es gratis?', '¿Actualizaciones automáticas?', 'Contactar soporte');
        break;
    }
    
    // Add contextual suggestions based on last intent
    if (this.context.lastIntent === 'features') {
      suggestions.push('¿Monitoreo de sueño?', '¿Contador de pasos?', '¿Notificaciones WhatsApp?', '¿Llamadas Bluetooth?');
    }
    
    if (this.context.lastIntent === 'price') {
      suggestions.push('¿Hay descuento de contado?', '¿Cuotas sin tarjeta?', '¿Promociones de lanzamiento?', '¿Formas de pago?');
    }
    
    if (this.context.lastIntent === 'health') {
      suggestions.push('¿Frecuencia cardíaca?', '¿Calorías quemadas?', '¿Alertas de sedentarismo?', '¿Tipos de ejercicio?');
    }
    
    if (this.context.lastIntent === 'battery') {
      suggestions.push('¿Tiempo de carga?', '¿Duración con GPS?', '¿Tipo de cargador?', '¿Batería de larga duración?');
    }
    
    if (this.context.lastIntent === 'connectivity') {
      suggestions.push('¿Compatible con Android?', '¿Notificaciones de apps?', '¿Llamadas desde el reloj?', '¿WiFi integrado?');
    }
    
    return suggestions;
  }
}

// Singleton instance
export const chatbotEngine = new ChatbotEngine();
