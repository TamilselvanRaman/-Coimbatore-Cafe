import { motion } from "framer-motion";
import { Coffee, ShoppingBag, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollReveal } from "@/components/animated/scroll-reveal";
import { FloatingElement, CoffeeBean, SteamEffect } from "@/components/animated/floating-elements";
import { Link } from "wouter";

export function HeroSection() {
  const stats = [
    { number: "150+", label: "Premium Blends" },
    { number: "4.9", label: "Rating" },
    { number: "24/7", label: "Delivery" },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-coffee-800 via-coffee-700 to-coffee-900 relative overflow-hidden flex items-center">
      {/* Floating coffee beans animation */}
      <div className="absolute inset-0 pointer-events-none">
        <CoffeeBean className="absolute top-20 left-10" size="sm" />
        <CoffeeBean className="absolute top-40 right-20" size="md" />
        <CoffeeBean className="absolute bottom-32 left-1/4" size="lg" />
        <CoffeeBean className="absolute top-60 left-1/3" size="sm" />
        <CoffeeBean className="absolute bottom-20 right-1/3" size="md" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white space-y-8">
            <ScrollReveal>
              <motion.h1 
                className="font-luxury text-6xl lg:text-7xl font-black leading-tight text-white drop-shadow-2xl"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                Premium <span className="text-premium bg-gradient-to-r from-amber-300 via-amber-400 to-gold-500 bg-clip-text text-transparent drop-shadow-lg">Coffee</span><br/>
                <span className="text-cream-100">Experience</span>
              </motion.h1>
              <motion.p 
                className="text-xl font-medium text-amber-100 mt-6 leading-relaxed drop-shadow-lg"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              >
                Discover the finest blend of traditional South Indian coffee culture with modern premium brewing techniques at Coimbatore's most exclusive cafe.
              </motion.p>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/menu">
                  <Button className="bg-gradient-to-r from-amber-400 to-amber-600 text-coffee-900 font-bold text-lg px-8 py-4 rounded-full hover:from-amber-500 hover:to-amber-700 shadow-2xl hover:shadow-amber-400/30 transition-all duration-300 border-2 border-amber-300/20">
                    <Coffee className="w-5 h-5 mr-2" />
                    Explore Menu
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  className="glass-morphism px-8 py-4 rounded-full text-white font-bold text-lg border-white/40 hover:bg-white/20 transition-all shadow-xl backdrop-blur-md"
                >
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Order Online
                </Button>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.4}>
              <div className="flex items-center space-x-8 pt-8">
                {stats.map((stat, index) => (
                  <motion.div 
                    key={index}
                    className="text-center"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  >
                    <div className="text-3xl font-black text-amber-300 drop-shadow-lg">{stat.number}</div>
                    <div className="text-amber-100 font-medium drop-shadow-md">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>
          </div>
          
          <div className="relative">
            <ScrollReveal delay={0.6}>
              <div className="relative">
                <motion.img
                  src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                  alt="Premium cafe interior with modern lighting and comfortable seating"
                  className="rounded-2xl shadow-2xl w-full h-auto"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.6 }}
                />
                
                {/* Steam animation overlay */}
                <SteamEffect className="absolute top-1/4 left-1/2 transform -translate-x-1/2" />
                
                {/* Floating review card */}
                <FloatingElement 
                  className="absolute -bottom-6 -left-6 max-w-xs"
                  duration={8}
                  intensity={15}
                >
                  <Card className="glass-morphism bg-white/10 border-white/20">
                    <CardContent className="p-4 text-white">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="flex text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-current" />
                          ))}
                        </div>
                        <span className="text-sm">5.0</span>
                      </div>
                      <p className="text-sm">"Best coffee experience in Coimbatore! The ambiance is perfect."</p>
                      <div className="text-xs text-coffee-200 mt-2">- Priya Sharma</div>
                    </CardContent>
                  </Card>
                </FloatingElement>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
