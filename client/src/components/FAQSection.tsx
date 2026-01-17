import { motion } from 'framer-motion';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { FAQCategory, FAQItem } from '@/types/landing';
import { cn } from '@/lib/utils';

interface FAQSectionProps {
  data: FAQCategory[];
  className?: string;
  maxItems?: number;
}

const getCategoryColor = (category?: string) => {
  switch (category) {
    case 'warranty': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
    case 'shipping': return 'bg-green-500/10 text-green-400 border-green-500/20';
    case 'technical': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
    default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
  }
};

const getCategoryLabel = (category?: string) => {
  switch (category) {
    case 'warranty': return 'Garantía';
    case 'shipping': return 'Envíos';
    case 'technical': return 'Técnico';
    default: return 'General';
  }
};

export default function FAQSection({ data, className, maxItems }: FAQSectionProps) {
  // Limit items if maxItems is provided
  const limitedData = data.map(category => ({
    ...category,
    items: maxItems ? category.items.slice(0, maxItems) : category.items
  }));

  return (
    <section className={cn("py-24", className)}>
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Preguntas <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-green">Frecuentes</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Todo lo que necesitas saber sobre tu Smartwatch Pro
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {limitedData.map((category, categoryIdx) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIdx * 0.1 }}
              className="mb-8"
            >
              <h3 className="text-xl font-bold mb-6 text-center md:text-left">
                {category.title}
              </h3>
              
              <Accordion 
                type="single" 
                collapsible 
                className="w-full text-left bg-white/5 rounded-xl border border-white/10 p-4"
              >
                {category.items.map((item, itemIdx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: categoryIdx * 0.1 + itemIdx * 0.05 }}
                  >
                    <AccordionItem 
                      value={item.id} 
                      className={cn(
                        "border-white/10 last:border-0",
                        itemIdx > 0 && "border-t"
                      )}
                    >
                      <AccordionTrigger className="hover:no-underline text-left group">
                        <div className="flex items-center justify-between w-full pr-4">
                          <span className="text-white group-hover:text-brand-green transition-colors">
                            {item.question}
                          </span>
                          {item.category && (
                            <Badge 
                              variant="outline" 
                              className={cn(
                                "text-xs ml-4 shrink-0",
                                getCategoryColor(item.category)
                              )}
                            >
                              {getCategoryLabel(item.category)}
                            </Badge>
                          )}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-400 leading-relaxed">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
