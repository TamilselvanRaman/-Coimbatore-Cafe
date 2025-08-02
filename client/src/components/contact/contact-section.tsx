import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollReveal } from "@/components/animated/scroll-reveal";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter } from "lucide-react";

export function ContactSection() {
  const contactInfo = [
    {
      icon: MapPin,
      title: "Location",
      content: ["123 Coffee Street, Coimbatore", "Tamil Nadu 641001"],
    },
    {
      icon: Phone,
      title: "Phone",
      content: ["+91 98765 43210"],
    },
    {
      icon: Mail,
      title: "Email",
      content: ["hello@coimbatorecafe.com"],
    },
    {
      icon: Clock,
      title: "Hours",
      content: ["Mon-Sun: 7:00 AM - 11:00 PM", "24/7 Online Delivery"],
    },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-coffee-100 to-coffee-200">
      <div className="container mx-auto px-6">
        <ScrollReveal className="text-center mb-16">
          <h2 className="font-luxury text-4xl lg:text-5xl font-bold text-coffee-800 mb-6">
            Visit Our <span className="text-amber-500">Cafe</span>
          </h2>
          <p className="text-xl text-coffee-600 max-w-3xl mx-auto">
            Experience the perfect blend of ambiance, aroma, and taste at our premium Coimbatore location.
          </p>
        </ScrollReveal>
        
        <div className="grid lg:grid-cols-2 gap-12">
          <ScrollReveal>
            <Card className="glass-morphism bg-white/80 border border-coffee-200">
              <CardContent className="p-8">
                <h3 className="font-luxury text-2xl font-bold text-coffee-800 mb-6">Get in Touch</h3>
                
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start space-x-4"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-amber-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <info.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-coffee-800 mb-1">{info.title}</h4>
                        {info.content.map((line, lineIndex) => (
                          <p key={lineIndex} className="text-coffee-600">
                            {line}
                          </p>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="mt-8 pt-8 border-t border-coffee-200">
                  <h4 className="font-luxury text-xl font-bold text-coffee-800 mb-4">Follow Us</h4>
                  <div className="flex space-x-4">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.href}
                        aria-label={social.label}
                        className="w-12 h-12 bg-coffee-500 rounded-full flex items-center justify-center text-white hover:bg-amber-500 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <social.icon className="w-5 h-5" />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <Card className="glass-morphism bg-white/80 border border-coffee-200 h-full">
              <CardContent className="p-8 h-full">
                <h3 className="font-luxury text-2xl font-bold text-coffee-800 mb-6">Find Us</h3>
                <div className="bg-coffee-200 rounded-2xl h-full min-h-[400px] flex items-center justify-center relative overflow-hidden">
                  {/* Interactive Map Placeholder */}
                  <div className="text-center text-coffee-600">
                    <MapPin className="w-16 h-16 text-amber-500 mx-auto mb-4" />
                    <p className="text-lg font-semibold">Interactive Map</p>
                    <p className="text-sm">Premium location in the heart of Coimbatore</p>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute top-4 left-4 w-3 h-3 bg-amber-400 rounded-full opacity-60"></div>
                  <div className="absolute bottom-6 right-8 w-4 h-4 bg-coffee-400 rounded-full opacity-40"></div>
                  <div className="absolute top-1/3 right-6 w-2 h-2 bg-amber-500 rounded-full opacity-70"></div>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>

        {/* Call to Action */}
        <ScrollReveal delay={0.4} className="text-center mt-16">
          <Card className="glass-morphism bg-gradient-to-r from-amber-500/10 to-amber-600/10 border border-amber-200">
            <CardContent className="p-8">
              <h3 className="font-luxury text-2xl font-bold text-coffee-800 mb-4">
                Ready to Experience Premium Coffee?
              </h3>
              <p className="text-coffee-600 mb-6">
                Visit us today or order online for delivery. We're here to serve you the perfect cup!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  className="bg-gradient-to-r from-amber-500 to-amber-600 text-coffee-900 font-semibold px-8 py-3 rounded-full hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Order Now
                </motion.button>
                <motion.button
                  className="border-2 border-amber-500 text-amber-600 font-semibold px-8 py-3 rounded-full hover:bg-amber-500 hover:text-white transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Visit Store
                </motion.button>
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>
      </div>
    </section>
  );
}
