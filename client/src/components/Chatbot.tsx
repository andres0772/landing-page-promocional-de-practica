import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User,
  Minimize2,
  Maximize2,
  Lightbulb
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ChatMessage, 
  ChatbotConfig, 
  ChatAction,
  CHATBOT_RESPONSES 
} from '@/types/landing';
import { chatbotEngine } from '@/lib/chatbotEngine';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/useIsMobile';

export default function Chatbot() {
  const isMobile = useIsMobile();
  const [config, setConfig] = useState<ChatbotConfig>({
    isOpen: false,
    messages: [],
    isTyping: false,
    inputText: '',
    context: chatbotEngine.getContext()
  });
  const [isMinimized, setIsMinimized] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [config.messages]);

  // Update suggestions when context changes
  useEffect(() => {
    setSuggestions(chatbotEngine.getSuggestions());
  }, [config.context]);

  // Send initial greeting when chat opens
  useEffect(() => {
    if (config.isOpen && config.messages.length === 0) {
      setTimeout(() => {
        const response = CHATBOT_RESPONSES.greeting;
        addBotMessage(response);
      }, 500);
    }
  }, [config.isOpen, config.messages.length]);

  const addBotMessage = (response: any) => {
    const botMessage: ChatMessage = {
      id: Date.now().toString(),
      content: response.text,
      sender: 'bot',
      timestamp: new Date(),
      intent: response.intent,
      confidence: response.confidence
    };

    setConfig(prev => ({
      ...prev,
      messages: [...prev.messages, botMessage],
      isTyping: false,
      context: chatbotEngine.getContext()
    }));
  };

  const handleSendMessage = () => {
    if (!config.inputText.trim()) return;

    const userMessage = config.inputText.trim();
    const { message, response } = chatbotEngine.processMessage(userMessage);
    
    setConfig(prev => ({
      ...prev,
      messages: [...prev.messages, message],
      inputText: '',
      isTyping: true
    }));

    // Simulate bot response with delay
    setTimeout(() => {
      addBotMessage(response);
    }, response.delay || 1000);
  };

  const handleAction = (action: ChatAction) => {
    if (action.type === 'whatsapp') {
      window.open(action.action, '_blank');
      return;
    }

    const response = chatbotEngine.handleAction(action.action);
    addBotMessage(response);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    setConfig(prev => ({ ...prev, isOpen: !prev.isOpen }));
    setIsMinimized(false);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setConfig(prev => ({ ...prev, inputText: suggestion }));
    setTimeout(handleSendMessage, 100);
  };

  return (
    <>
      {/* Overlay para mobile */}
      <AnimatePresence>
        {config.isOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={toggleChat}
          />
        )}
      </AnimatePresence>

      <div className={cn(
        "fixed z-50",
        isMobile 
          ? "bottom-0 left-0 right-0 md:hidden" 
          : "bottom-4 right-4 md:bottom-6 md:right-6"
      )}>
        {/* Chat Window - Siempre renderizado primero para z-index correcto */}
        {config.isOpen && (
          <motion.div
            initial={isMobile ? { y: "100%" } : { opacity: 0, scale: 0.9 }}
            animate={isMobile ? { y: 0 } : { opacity: 1, scale: 1 }}
            exit={isMobile ? { y: "100%" } : { opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={cn(
              "bg-black/95 backdrop-blur-md border border-white/10 shadow-2xl overflow-hidden flex flex-col",
              isMobile 
                ? "w-full h-[80vh] rounded-t-2xl" 
                : "w-72 h-[450px] md:w-80 md:h-[500px] rounded-2xl"
            )}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-brand-blue to-brand-green p-4 flex items-center justify-between relative">
              {/* Indicador de swipe para mobile */}
              {isMobile && (
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-10 h-1 bg-white/30 rounded-full" />
              )}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">Asistente Virtual</h3>
                  <Badge variant="secondary" className="text-xs bg-white/20 text-white border-white/30">
                    Online
                  </Badge>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={toggleMinimize}
                  className="text-white hover:bg-white/20 h-8 w-8"
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={toggleChat}
                  className="text-white hover:bg-white/20 h-8 w-8"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Messages Area */}
            {!isMinimized && (
              <>
                <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-4">
                  {config.messages.length === 0 && !config.isTyping && (
                    <div className="text-center text-gray-500 text-sm py-8">
                      <Bot className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 opacity-50" />
                      <p className="text-xs md:text-sm">¡Hola! ¿En qué puedo ayudarte?</p>
                    </div>
                  )}
                  
                  {config.messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "flex gap-3",
                        message.sender === 'user' ? "justify-end" : "justify-start"
                      )}
                    >
                      {message.sender === 'bot' && (
                        <div className="w-6 h-6 bg-brand-blue/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <Bot className="w-3 h-3 text-brand-blue" />
                        </div>
                      )}
                      <div className="max-w-[80%] space-y-2">
                        <Card
                          className={cn(
                            "p-3 text-sm",
                            message.sender === 'user'
                              ? "bg-brand-green text-black"
                              : "bg-white/10 text-white border-white/20"
                          )}
                        >
                          {message.content}
                        </Card>
                        
                        {/* Action buttons for bot messages */}
                        {message.sender === 'bot' && message.intent && CHATBOT_RESPONSES[message.intent]?.actions && (
                          <div className="flex flex-wrap gap-2">
                            {CHATBOT_RESPONSES[message.intent].actions?.map((action, idx) => (
                              <Button
                                key={idx}
                                size="sm"
                                variant={action.primary ? "default" : "outline"}
                                className={cn(
                                  "text-xs h-8",
                                  action.type === 'whatsapp' 
                                    ? "bg-green-600 hover:bg-green-700 text-white border-green-600"
                                    : action.primary
                                    ? "bg-brand-green hover:bg-brand-green/90 text-black"
                                    : "bg-white/10 hover:bg-white/20 text-white border-white/20"
                                )}
                                onClick={() => handleAction(action)}
                              >
                                {action.label}
                              </Button>
                            ))}
                          </div>
                        )}
                      </div>
                      {message.sender === 'user' && (
                        <div className="w-6 h-6 bg-brand-green rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <User className="w-3 h-3 text-black" />
                        </div>
                      )}
                    </div>
                  ))}

                  {config.isTyping && (
                    <div className="flex gap-3 justify-start">
                      <div className="w-6 h-6 bg-brand-blue/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <Bot className="w-3 h-3 text-brand-blue" />
                      </div>
                      <div className="bg-white/10 text-white border-white/20 p-3">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full" />
                          <div className="w-2 h-2 bg-gray-400 rounded-full" />
                          <div className="w-2 h-2 bg-gray-400 rounded-full" />
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="border-t border-white/10 p-3 md:p-4 space-y-3">
                  {/* Enhanced Suggestions - Solo en desktop */}
                  {!isMobile && suggestions.length > 0 && config.messages.length > 1 && (
                    <div className="space-y-2">
                      <div className="text-xs text-gray-400 px-2">Sugerencias rápidas:</div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {suggestions.slice(0, 4).map((suggestion, idx) => (
                          <Button
                            key={idx}
                            size="sm"
                            variant="ghost"
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="text-xs bg-white/5 hover:bg-white/10 text-white border border-white/10 h-8 px-3 justify-start text-left transition-colors"
                          >
                            <span className="truncate">{suggestion}</span>
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex gap-2">
                    <Input
                      value={config.inputText}
                      onChange={(e) => setConfig(prev => ({ ...prev, inputText: e.target.value }))}
                      onKeyPress={handleKeyPress}
                      placeholder="Escribe tu mensaje o seleccioná una sugerencia..."
                      className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-brand-green text-sm"
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!config.inputText.trim() || config.isTyping}
                      size="icon"
                      className="bg-brand-green hover:bg-brand-green/90 text-black"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
        
        {/* Chat Button - Detrás del chat con fade elegante */}
        {!config.isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "transition-all duration-200",
              isMobile ? "bottom-4 right-4 fixed" : ""
            )}
          >
            <Button
              onClick={toggleChat}
              size="lg"
              className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-brand-green hover:bg-brand-green/90 text-black shadow-lg hover:shadow-xl transition-all duration-200 relative group overflow-hidden z-50"
            >
              <div className="relative z-10">
                <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              {/* Efecto de brillo elegante */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full z-20" />
            </Button>
          </motion.div>
        )}
      </div>
    </>
  );
}
