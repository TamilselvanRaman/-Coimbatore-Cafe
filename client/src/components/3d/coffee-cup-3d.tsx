import { useRef } from "react";
import { motion } from "framer-motion";

interface CoffeeCup3DProps {
  customization: {
    size: 'small' | 'medium' | 'large';
    strength: number;
    milk: 'whole' | 'oat' | 'almond' | 'coconut';
    temperature: 'hot' | 'cold';
    extras: string[];
  };
}

export function CoffeeCup3D({ customization }: CoffeeCup3DProps) {
  const cupRef = useRef<HTMLDivElement>(null);

  // Calculate visual properties based on customization
  const getCupSize = () => {
    switch (customization.size) {
      case 'small': return 'w-48 h-56';
      case 'large': return 'w-64 h-72';
      default: return 'w-56 h-64';
    }
  };

  const getCoffeeColor = () => {
    const baseOpacity = 0.8;
    const strengthMultiplier = customization.strength / 5;
    const darknessFactor = 0.3 + (strengthMultiplier * 0.5);
    
    return `rgba(101, 67, 33, ${baseOpacity * darknessFactor})`;
  };

  const getMilkEffect = () => {
    switch (customization.milk) {
      case 'oat': return 'bg-gradient-to-t from-amber-100 to-amber-50';
      case 'almond': return 'bg-gradient-to-t from-amber-50 to-white';
      case 'coconut': return 'bg-gradient-to-t from-slate-50 to-white';
      default: return 'bg-gradient-to-t from-amber-50 to-white';
    }
  };

  const hasWhippedCream = customization.extras.includes('whipped-cream');
  const hasIce = customization.temperature === 'cold';

  return (
    <div className="relative flex items-center justify-center h-96">
      {/* Coffee Cup Container */}
      <motion.div
        ref={cupRef}
        className={`relative ${getCupSize()} mx-auto`}
        animate={{
          scale: customization.size === 'large' ? 1.1 : customization.size === 'small' ? 0.9 : 1,
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Cup Body */}
        <div className="relative w-full h-full">
          {/* Cup Shape */}
          <svg
            viewBox="0 0 200 240"
            className="w-full h-full drop-shadow-2xl"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Cup Gradient Definition */}
            <defs>
              <linearGradient id="cupGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f8fafc" />
                <stop offset="50%" stopColor="#e2e8f0" />
                <stop offset="100%" stopColor="#cbd5e1" />
              </linearGradient>
              <linearGradient id="coffeeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={getCoffeeColor()} />
                <stop offset="100%" stopColor={getCoffeeColor()} />
              </linearGradient>
            </defs>
            
            {/* Cup Body */}
            <path
              d="M30 60 Q30 50 40 50 L160 50 Q170 50 170 60 L165 200 Q165 210 155 210 L45 210 Q35 210 35 200 Z"
              fill="url(#cupGradient)"
              stroke="#94a3b8"
              strokeWidth="2"
            />
            
            {/* Coffee Liquid */}
            <motion.path
              d="M40 65 L160 65 L157 185 Q157 190 152 190 L48 190 Q43 190 43 185 Z"
              fill="url(#coffeeGradient)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
            
            {/* Milk Foam Layer */}
            {customization.milk !== 'whole' && (
              <motion.ellipse
                cx="100"
                cy="65"
                rx="60"
                ry="8"
                fill="rgba(255, 255, 255, 0.6)"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
              />
            )}
            
            {/* Whipped Cream */}
            {hasWhippedCream && (
              <motion.g
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.2 }}
              >
                <ellipse cx="100" cy="55" rx="50" ry="15" fill="#ffffff" />
                <ellipse cx="85" cy="45" rx="15" ry="8" fill="#ffffff" />
                <ellipse cx="115" cy="45" rx="15" ry="8" fill="#ffffff" />
                <ellipse cx="100" cy="35" rx="10" ry="5" fill="#ffffff" />
              </motion.g>
            )}
            
            {/* Ice Cubes for Cold Drinks */}
            {hasIce && (
              <motion.g
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.8, staggerChildren: 0.1 }}
              >
                <rect x="60" y="80" width="15" height="15" fill="rgba(255, 255, 255, 0.8)" rx="2" />
                <rect x="120" y="90" width="12" height="12" fill="rgba(255, 255, 255, 0.8)" rx="2" />
                <rect x="90" y="110" width="14" height="14" fill="rgba(255, 255, 255, 0.8)" rx="2" />
              </motion.g>
            )}
            
            {/* Cup Handle */}
            <path
              d="M170 80 Q185 80 185 100 Q185 120 170 120"
              fill="none"
              stroke="#94a3b8"
              strokeWidth="8"
              strokeLinecap="round"
            />
          </svg>
          
          {/* Steam Effect for Hot Drinks */}
          {!hasIce && (
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-12 bg-white/40 rounded-full"
                  style={{
                    left: i * 8 - 8,
                    marginTop: i * -2,
                  }}
                  animate={{
                    y: [0, -15, -30],
                    opacity: [0.7, 1, 0],
                    scale: [1, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.3,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                />
              ))}
            </div>
          )}
        </div>
        
        {/* Strength Indicator */}
        <motion.div
          className="absolute -bottom-6 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i < customization.strength
                    ? 'bg-amber-400 shadow-lg shadow-amber-400/50'
                    : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
      
      {/* Floating Coffee Beans */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-amber-700 rounded-full opacity-30"
            style={{
              top: `${20 + Math.random() * 60}%`,
              left: `${10 + Math.random() * 80}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 360],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              delay: Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}
