import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollReveal } from "@/components/animated/scroll-reveal";
import { Button } from "@/components/ui/button";
import { ArrowRight, Award, Users, Coffee, Heart } from "lucide-react";

export function AboutSection() {
  const achievements = [
    { icon: Award, number: "2018", label: "Established" },
    { icon: Users, number: "50K+", label: "Happy Customers" },
    { icon: Coffee, number: "150+", label: "Premium Blends" },
    { icon: Heart, number: "4.9", label: "Customer Rating" },
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal>
            <h2 className="font-luxury text-4xl lg:text-5xl font-bold text-coffee-800 mb-6">
              Our <span className="text-amber-500">Story</span>
            </h2>
            <p className="text-xl text-coffee-600 mb-6 leading-relaxed">
              Founded by Razerbills Groups Private Ltd, Coimbatore Cafe represents the perfect fusion of traditional South Indian coffee culture with modern brewing innovation.
            </p>
            <p className="text-coffee-600 mb-8 leading-relaxed">
              From our humble beginnings to becoming Coimbatore's premier coffee destination, we've maintained our commitment to quality, authenticity, and exceptional customer experience. Every cup tells a story of passion, heritage, and craftsmanship.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  className="text-center p-4 bg-coffee-50 rounded-xl hover:bg-coffee-100 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <achievement.icon className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-coffee-800">{achievement.number}</div>
                  <div className="text-coffee-600">{achievement.label}</div>
                </motion.div>
              ))}
            </div>
            
            <Button className="bg-gradient-to-r from-amber-500 to-amber-600 text-coffee-900 font-semibold px-8 py-4 rounded-full hover:from-amber-600 hover:to-amber-700 shadow-lg hover:shadow-amber-500/25 transition-all duration-300">
              Learn More About Us
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2} className="space-y-6">
            <motion.img
              src="https://images.unsplash.com/photo-1559925393-8be0ec4767c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
              alt="Modern restaurant interior with warm lighting and contemporary design"
              className="rounded-2xl shadow-lg w-full h-auto"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            />
            
            <motion.img
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
              alt="Elegant restaurant dining area with sophisticated ambiance and modern furnishing"
              className="rounded-2xl shadow-lg w-full h-auto"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            />
          </ScrollReveal>
        </div>

        {/* Mission & Vision */}
        <ScrollReveal delay={0.4} className="mt-20">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="glass-morphism border border-coffee-100 hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <h3 className="font-luxury text-2xl font-bold text-coffee-800 mb-4">Our Mission</h3>
                <p className="text-coffee-600 leading-relaxed">
                  To create exceptional coffee experiences that celebrate the rich heritage of South Indian coffee culture while embracing modern innovation and sustainability.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-morphism border border-coffee-100 hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <h3 className="font-luxury text-2xl font-bold text-coffee-800 mb-4">Our Vision</h3>
                <p className="text-coffee-600 leading-relaxed">
                  To become the leading premium coffee destination that bridges tradition and innovation, bringing authentic flavors and memorable experiences to coffee lovers worldwide.
                </p>
              </CardContent>
            </Card>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
