import { useEffect, useState, useRef, RefObject } from 'react';
import { ScrollAnimationConfig } from '@/types/landing';

interface UseScrollAnimationReturn<T extends HTMLElement = HTMLElement> {
  ref: RefObject<T | null>;
  isVisible: boolean;
  hasAnimated: boolean;
}

export const useScrollAnimation = <T extends HTMLElement = HTMLElement>(
  config: ScrollAnimationConfig = {}
): UseScrollAnimationReturn<T> => {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    delay = 0
  } = config;

  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          // Add delay if specified
          if (delay > 0) {
            setTimeout(() => {
              setIsVisible(true);
              setHasAnimated(true);
            }, delay);
          } else {
            setIsVisible(true);
            setHasAnimated(true);
          }
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, delay, hasAnimated]);

  return { ref, isVisible, hasAnimated };
};

// Hook for multiple elements
export const useScrollAnimations = (
  selectors: string[],
  config: ScrollAnimationConfig = {}
): { refs: RefObject<HTMLElement | null>[], visibleStates: boolean[] } => {
  const [visibleStates, setVisibleStates] = useState<boolean[]>(new Array(selectors.length).fill(false));
  const refs = useRef<RefObject<HTMLElement | null>[]>(selectors.map(() => useRef<HTMLElement>(null)));

  const { threshold = 0.1, rootMargin = '0px' } = config;

  useEffect(() => {
    const elements = refs.current.map(ref => ref.current).filter(Boolean) as HTMLElement[];
    
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = refs.current.findIndex(ref => ref.current === entry.target);
          if (index !== -1 && entry.isIntersecting) {
            setVisibleStates(prev => {
              const newStates = [...prev];
              newStates[index] = true;
              return newStates;
            });
          }
        });
      },
      {
        threshold,
        rootMargin
      }
    );

    elements.forEach(element => observer.observe(element));

    return () => {
      elements.forEach(element => observer.unobserve(element));
    };
  }, [threshold, rootMargin, selectors.length]);

  return {
    refs: refs.current,
    visibleStates
  };
};

// Hook for parallax effect
export const useParallax = <T extends HTMLElement = HTMLElement>(
  speed: number = 0.5
): { ref: RefObject<T | null>, transform: string } => {
  const [offsetY, setOffsetY] = useState(0);
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const scrolled = window.pageYOffset;
        const rate = scrolled * -speed;
        setOffsetY(rate);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  const transform = `translateY(${offsetY}px)`;

  return { ref, transform };
};
