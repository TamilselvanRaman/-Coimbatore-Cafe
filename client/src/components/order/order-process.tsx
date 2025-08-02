import { motion } from "framer-motion";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/animated/scroll-reveal";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Clock, Coffee, Truck } from "lucide-react";

export function OrderProcess() {
  const orderSteps = [
    {
      number: 1,
      title: "Choose Your Drink",
      description: "Browse our premium menu or create a custom blend with our 3D customizer.",
      icon: Coffee,
      color: "from-amber-400 to-amber-600",
    },
    {
      number: 2,
      title: "Secure Payment",
      description: "Pay safely using Razorpay with multiple payment options including UPI.",
      icon: CheckCircle,
      color: "from-green-400 to-green-600",
    },
    {
      number: 3,
      title: "Track Your Order",
      description: "Real-time updates from preparation to delivery with live tracking.",
      icon: Clock,
      color: "from-blue-400 to-blue-600",
    },
    {
      number: 4,
      title: "Enjoy Fresh Coffee",
      description: "Receive your perfectly crafted coffee delivered fresh to your doorstep.",
      icon: Truck,
      color: "from-purple-400 to-purple-600",
    },
  ];

  return (
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
        
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {orderSteps.map((step, index) => (
            <StaggerItem key={index}>
              <motion.div 
                className="text-center group"
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className={`w-24 h-24 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
                  <step.icon className="w-8 h-8" />
                </div>
                <h3 className="font-luxury text-xl font-bold text-coffee-800 mb-3 group-hover:text-amber-600 transition-colors">
                  {step.title}
                </h3>
                <p className="text-coffee-600 group-hover:text-coffee-700 transition-colors">
                  {step.description}
                </p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
        
        {/* Process Benefits */}
        <ScrollReveal delay={0.4} className="mt-16">
          <Card className="bg-gradient-to-r from-amber-50 to-amber-100 border-amber-200">
            <CardContent className="p-8">
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
                  <Coffee className="w-8 h-8 text-amber-600" />
                  <div>
                    <div className="font-bold text-coffee-800">Fresh & Hot</div>
                    <div className="text-coffee-600">Quality Guaranteed</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>
      </div>
    </section>
  );
}
