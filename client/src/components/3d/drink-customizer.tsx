import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Coffee, Droplet, Thermometer, Scaling } from "lucide-react";
import { ScrollReveal } from "@/components/animated/scroll-reveal";
import { CoffeeCup3D } from "./coffee-cup-3d";
import { useCart } from "@/hooks/use-cart";
import { MenuItem } from "@/data/menuData";

interface DrinkCustomization {
  size: 'small' | 'medium' | 'large';
  strength: number;
  milk: 'whole' | 'oat' | 'almond' | 'coconut';
  temperature: 'hot' | 'cold';
  extras: string[];
}

const baseCoffee: MenuItem = {
  id: "custom-coffee",
  name: "Custom Coffee",
  description: "Your personalized coffee blend",
  price: 120,
  imageUrl: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e",
  category: "custom",
};

const sizeOptions = [
  { value: 'small', label: 'Small', size: '250ml', price: 0 },
  { value: 'medium', label: 'Medium', size: '300ml', price: 15 },
  { value: 'large', label: 'Large', size: '350ml', price: 30 },
];

const milkOptions = [
  { value: 'whole', label: 'Whole Milk', price: 0 },
  { value: 'oat', label: 'Oat Milk', price: 20 },
  { value: 'almond', label: 'Almond Milk', price: 15 },
  { value: 'coconut', label: 'Coconut Milk', price: 15 },
];

const temperatureOptions = [
  { value: 'hot', label: 'Hot', icon: Thermometer },
  { value: 'cold', label: 'Cold', icon: Droplet },
];

const extraOptions = [
  { value: 'extra-shot', label: 'Extra Shot', price: 25 },
  { value: 'vanilla', label: 'Vanilla Syrup', price: 15 },
  { value: 'caramel', label: 'Caramel Syrup', price: 15 },
  { value: 'whipped-cream', label: 'Whipped Cream', price: 20 },
];

export function DrinkCustomizer() {
  const { addItemToCart, loading } = useCart();
  const [customization, setCustomization] = useState<DrinkCustomization>({
    size: 'medium',
    strength: 3,
    milk: 'whole',
    temperature: 'hot',
    extras: [],
  });

  const calculatePrice = () => {
    let price = baseCoffee.price;
    
    // Size price
    const sizeOption = sizeOptions.find(opt => opt.value === customization.size);
    if (sizeOption) price += sizeOption.price;
    
    // Milk price
    const milkOption = milkOptions.find(opt => opt.value === customization.milk);
    if (milkOption) price += milkOption.price;
    
    // Extras price
    customization.extras.forEach(extra => {
      const extraOption = extraOptions.find(opt => opt.value === extra);
      if (extraOption) price += extraOption.price;
    });
    
    return price;
  };

  const handleAddToCart = async () => {
    const customItem: MenuItem = {
      ...baseCoffee,
      name: `Custom ${customization.temperature === 'hot' ? 'Hot' : 'Iced'} Coffee`,
      price: calculatePrice(),
    };

    await addItemToCart(customItem, 1, customization);
  };

  const toggleExtra = (extra: string) => {
    setCustomization(prev => ({
      ...prev,
      extras: prev.extras.includes(extra)
        ? prev.extras.filter(e => e !== extra)
        : [...prev.extras, extra]
    }));
  };

  return (
    <section className="py-20 bg-gradient-to-br from-coffee-800 to-coffee-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-coffee-700/50 to-coffee-900/50" />
      
      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal className="text-center mb-16">
          <h2 className="font-luxury text-4xl lg:text-5xl font-bold text-white mb-6">
            Build Your <span className="text-amber-400">Perfect</span> Cup
          </h2>
          <p className="text-xl text-coffee-200 max-w-3xl mx-auto">
            Experience our revolutionary drink customizer. Adjust every aspect of your coffee to create your ideal beverage.
          </p>
        </ScrollReveal>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 3D Visualization */}
          <ScrollReveal>
            <Card className="glass-morphism border-coffee-600/30 bg-white/10">
              <CardContent className="p-8">
                <CoffeeCup3D customization={customization} />
                
                {/* Preview Info */}
                <div className="mt-6 glass-morphism p-4 rounded-xl bg-white/10">
                  <div className="text-white space-y-2">
                    <div className="flex justify-between">
                      <span>Size:</span>
                      <span className="text-amber-400 capitalize">
                        {customization.size} ({sizeOptions.find(s => s.value === customization.size)?.size})
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Strength:</span>
                      <span className="text-amber-400">{customization.strength}/5</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Milk:</span>
                      <span className="text-amber-400 capitalize">{customization.milk}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Temperature:</span>
                      <span className="text-amber-400 capitalize">{customization.temperature}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg border-t border-white/20 pt-2">
                      <span>Price:</span>
                      <span className="text-amber-400">₹{calculatePrice()}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>
          
          {/* Customization Controls */}
          <ScrollReveal delay={0.2} className="space-y-8">
            {/* Size Selection */}
            <Card className="glass-morphism border-coffee-600/30 bg-white/10">
              <CardContent className="p-6">
                <h3 className="text-white font-luxury text-xl mb-4 flex items-center">
                  <Scaling className="w-5 h-5 text-amber-400 mr-2" />
                  Size Selection
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {sizeOptions.map((option) => (
                    <Button
                      key={option.value}
                      variant={customization.size === option.value ? "default" : "outline"}
                      className={`p-3 rounded-xl transition-all ${
                        customization.size === option.value
                          ? "bg-amber-500 text-coffee-900 font-semibold"
                          : "bg-coffee-600/50 text-white border-coffee-500 hover:bg-amber-500 hover:text-coffee-900"
                      }`}
                      onClick={() => setCustomization(prev => ({ ...prev, size: option.value as any }))}
                    >
                      <div className="text-center">
                        <div className="font-semibold">{option.label}</div>
                        <div className="text-xs opacity-80">{option.size}</div>
                        {option.price > 0 && (
                          <div className="text-xs">+₹{option.price}</div>
                        )}
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Strength Control */}
            <Card className="glass-morphism border-coffee-600/30 bg-white/10">
              <CardContent className="p-6">
                <h3 className="text-white font-luxury text-xl mb-4 flex items-center">
                  <Coffee className="w-5 h-5 text-amber-400 mr-2" />
                  Coffee Strength
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-white text-sm">
                    <span>Mild</span>
                    <span>Strong</span>
                  </div>
                  <Slider
                    value={[customization.strength]}
                    onValueChange={(value) => setCustomization(prev => ({ ...prev, strength: value[0] }))}
                    max={5}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="text-center">
                    <Badge variant="secondary" className="bg-amber-500 text-coffee-900">
                      Level {customization.strength}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Temperature */}
            <Card className="glass-morphism border-coffee-600/30 bg-white/10">
              <CardContent className="p-6">
                <h3 className="text-white font-luxury text-xl mb-4">Temperature</h3>
                <div className="grid grid-cols-2 gap-3">
                  {temperatureOptions.map((option) => (
                    <Button
                      key={option.value}
                      variant={customization.temperature === option.value ? "default" : "outline"}
                      className={`p-3 rounded-xl transition-all ${
                        customization.temperature === option.value
                          ? "bg-amber-500 text-coffee-900 font-semibold"
                          : "bg-coffee-600/50 text-white border-coffee-500 hover:bg-amber-500 hover:text-coffee-900"
                      }`}
                      onClick={() => setCustomization(prev => ({ ...prev, temperature: option.value as any }))}
                    >
                      <option.icon className="w-4 h-4 mr-2" />
                      {option.label}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Milk Options */}
            <Card className="glass-morphism border-coffee-600/30 bg-white/10">
              <CardContent className="p-6">
                <h3 className="text-white font-luxury text-xl mb-4 flex items-center">
                  <Droplet className="w-5 h-5 text-amber-400 mr-2" />
                  Milk Type
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {milkOptions.map((option) => (
                    <Button
                      key={option.value}
                      variant={customization.milk === option.value ? "default" : "outline"}
                      className={`p-3 rounded-xl transition-all ${
                        customization.milk === option.value
                          ? "bg-amber-500 text-coffee-900 font-semibold"
                          : "bg-coffee-600/50 text-white border-coffee-500 hover:bg-amber-500 hover:text-coffee-900"
                      }`}
                      onClick={() => setCustomization(prev => ({ ...prev, milk: option.value as any }))}
                    >
                      <div className="text-center">
                        <div>{option.label}</div>
                        {option.price > 0 && (
                          <div className="text-xs opacity-80">+₹{option.price}</div>
                        )}
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Extras */}
            <Card className="glass-morphism border-coffee-600/30 bg-white/10">
              <CardContent className="p-6">
                <h3 className="text-white font-luxury text-xl mb-4">Add Extras</h3>
                <div className="grid grid-cols-2 gap-3">
                  {extraOptions.map((option) => (
                    <Button
                      key={option.value}
                      variant={customization.extras.includes(option.value) ? "default" : "outline"}
                      className={`p-3 rounded-xl transition-all ${
                        customization.extras.includes(option.value)
                          ? "bg-amber-500 text-coffee-900 font-semibold"
                          : "bg-coffee-600/50 text-white border-coffee-500 hover:bg-amber-500 hover:text-coffee-900"
                      }`}
                      onClick={() => toggleExtra(option.value)}
                    >
                      <div className="text-center">
                        <div className="text-sm">{option.label}</div>
                        <div className="text-xs opacity-80">+₹{option.price}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Add to Cart */}
            <Button
              onClick={handleAddToCart}
              disabled={loading}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-coffee-900 font-bold text-lg py-6 hover:from-amber-600 hover:to-amber-700 shadow-lg hover:shadow-amber-500/25 transition-all duration-300"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Custom Drink - ₹{calculatePrice()}
            </Button>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
