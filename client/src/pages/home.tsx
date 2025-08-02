import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/hero/hero-section";
import { FeaturesSection } from "@/components/features/features-section";
import { MenuCategoryTabs } from "@/components/menu/menu-category-tabs";
import { MenuSection } from "@/components/menu/menu-section";
import { DrinkCustomizer } from "@/components/3d/drink-customizer";
import { PaymentMethods } from "@/components/payment/payment-methods";
import { AboutSection } from "@/components/about/about-section";
import { ContactSection } from "@/components/contact/contact-section";
import { CartSidebar } from "@/components/cart/cart-sidebar";
import { ScrollReveal } from "@/components/animated/scroll-reveal";
import { Button } from "@/components/ui/button";
import { ArrowRight, Coffee, Sparkles, Clock, CheckCircle } from "lucide-react";
import { menuData, getMenuByCategory } from "@/data/menuData";
import { Link } from "wouter";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("Classic Coffees");
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const categories = Object.keys(menuData);
  const menuItems = getMenuByCategory(activeCategory.toLowerCase().replace(" ", "-"));

  const orderSteps = [
    {
      number: 1,
      title: "Choose Your Drink",
      description: "Browse our premium menu or create a custom blend with our 3D customizer.",
    },
    {
      number: 2,
      title: "Secure Payment",
      description: "Pay safely using Razorpay with multiple payment options including UPI.",
    },
    {
      number: 3,
      title: "Track Your Order",
      description: "Real-time updates from preparation to delivery with live tracking.",
    },
    {
      number: 4,
      title: "Enjoy Fresh Coffee",
      description: "Receive your perfectly crafted coffee delivered fresh to your doorstep.",
    },
  ];

  return (
    <div className="min-h-screen bg-coffee-50">
      <Navbar />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Features Section */}
      <FeaturesSection />
      
      {/* Premium Menu Preview */}
      <section className="py-20 bg-gradient-to-br from-coffee-50 to-coffee-100">
        <div className="container mx-auto px-6">
          <ScrollReveal className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-luxury text-4xl lg:text-5xl font-bold text-coffee-800 mb-6">
                Our <span className="text-amber-500">Signature</span> Menu
              </h2>
              <p className="text-xl text-coffee-600 max-w-3xl mx-auto mb-8">
                Discover our carefully crafted selection of premium coffees, traditional drinks, and artisanal snacks.
              </p>
            </motion.div>
          </ScrollReveal>
          
          <MenuCategoryTabs 
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
          
          <MenuSection items={menuItems.slice(0, 6)} category={activeCategory} />
          
          <ScrollReveal className="text-center mt-12">
            <Link href="/menu">
              <Button className="bg-gradient-to-r from-amber-500 to-amber-600 text-coffee-900 font-semibold px-8 py-4 rounded-full text-lg hover:from-amber-600 hover:to-amber-700 shadow-lg hover:shadow-amber-500/25 transition-all duration-300">
                View Full Menu
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </ScrollReveal>
        </div>
      </section>
      
      {/* 3D Drink Customizer */}
      <DrinkCustomizer />
      
      {/* Order Process */}
      <section className="py-20 bg-gradient-to-br from-coffee-100 to-white">
        <div className="container mx-auto px-6">
          <ScrollReveal className="text-center mb-16">
            <h2 className="font-luxury text-4xl lg:text-5xl font-bold text-coffee-800 mb-6">
              Simple <span className="text-amber-500">Ordering</span> Process
            </h2>
            <p className="text-xl text-coffee-600 max-w-3xl mx-auto">
              From selection to delivery, enjoy a seamless experience with real-time tracking and premium service.
            </p>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {orderSteps.map((step, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <motion.div 
                  className="text-center group"
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                    {step.number}
                  </div>
                  <h3 className="font-luxury text-xl font-bold text-coffee-800 mb-3 group-hover:text-amber-600 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-coffee-600 group-hover:text-coffee-700 transition-colors">
                    {step.description}
                  </p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
          
          {/* Process Benefits */}
          <ScrollReveal delay={0.4} className="mt-16">
            <div className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-3xl p-8 border border-amber-200">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="flex items-center justify-center space-x-3">
                  <Clock className="w-8 h-8 text-amber-600" />
                  <div>
                    <div className="font-bold text-coffee-800">15-30 mins</div>
                    <div className="text-coffee-600">Average Delivery</div>
                  </div>
                </div>
                <div className="flex items-center justify-center space-x-3">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                  <div>
                    <div className="font-bold text-coffee-800">100% Secure</div>
                    <div className="text-coffee-600">Payment Gateway</div>
                  </div>
                </div>
                <div className="flex items-center justify-center space-x-3">
                  <Sparkles className="w-8 h-8 text-amber-600" />
                  <div>
                    <div className="font-bold text-coffee-800">Fresh & Hot</div>
                    <div className="text-coffee-600">Quality Guaranteed</div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
      
      {/* Payment Integration */}
      <PaymentMethods />
      
      {/* About Section */}
      <AboutSection />
      
      {/* Contact Section */}
      <ContactSection />
      
      {/* Footer */}
      <Footer />
      
      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}
