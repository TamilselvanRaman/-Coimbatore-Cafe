import { Leaf, Wand2, Truck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/animated/scroll-reveal";

export function FeaturesSection() {
  const features = [
    {
      icon: Leaf,
      title: "Premium Beans",
      description: "Sourced directly from the finest coffee estates in South India, our beans are carefully selected and roasted to perfection.",
    },
    {
      icon: Wand2,
      title: "Custom Brewing",
      description: "Experience our signature 3D drink customizer where you can create your perfect cup with personalized strength, size, and flavor profiles.",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Enjoy fresh, hot coffee delivered to your doorstep with real-time tracking and our premium delivery experience.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <ScrollReveal className="text-center mb-16">
          <h2 className="font-luxury text-4xl lg:text-5xl font-bold text-coffee-800 mb-6">
            Why Choose Our <span className="text-amber-500">Premium</span> Experience?
          </h2>
          <p className="text-xl text-coffee-600 max-w-3xl mx-auto">
            From traditional filter kaapi to modern brewing techniques, we bring you the perfect blend of heritage and innovation.
          </p>
        </ScrollReveal>
        
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <StaggerItem key={index}>
              <Card className="glass-morphism border border-coffee-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-luxury text-2xl font-bold text-coffee-800 mb-4 group-hover:text-amber-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-coffee-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
