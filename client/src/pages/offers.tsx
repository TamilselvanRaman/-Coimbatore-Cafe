import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/components/animated/scroll-reveal";
import { GoldenMembership } from "@/components/membership/golden-membership";
import { 
  Gift, 
  Clock, 
  Percent, 
  Coffee, 
  Crown, 
  Star,
  Sparkles,
  Truck,
  Heart
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

export default function Offers() {
  const { user } = useAuth();

  const currentOffers = [
    {
      id: 1,
      title: "New User Special",
      description: "Get 25% off on your first order + free delivery",
      discountValue: 25,
      discountType: "percentage",
      validUntil: "2025-08-31",
      membershipRequired: null,
      icon: Gift,
      gradient: "from-green-500 to-emerald-600",
      code: "WELCOME25"
    },
    {
      id: 2, 
      title: "Weekend Bliss",
      description: "Buy 2 get 1 free on all espresso drinks every weekend",
      discountType: "bogo",
      validUntil: "2025-12-31",
      membershipRequired: null,
      icon: Coffee,
      gradient: "from-amber-500 to-orange-600",
      code: "WEEKEND"
    },
    {
      id: 3,
      title: "Golden Hour",
      description: "30% off + priority delivery for Golden 7-Star members",
      discountValue: 30,
      discountType: "percentage",
      validUntil: "2025-12-31",
      membershipRequired: "golden7star",
      icon: Crown,
      gradient: "from-yellow-500 to-amber-600",
      code: "GOLDEN30"
    },
    {
      id: 4,
      title: "Flash Sale",
      description: "₹100 off on orders above ₹500. Limited time only!",
      discountValue: 100,
      discountType: "fixed",
      validUntil: "2025-08-15",
      membershipRequired: null,
      icon: Sparkles,
      gradient: "from-pink-500 to-purple-600",
      code: "FLASH100"
    }
  ];

  const membershipBenefits = [
    { icon: Percent, title: "Exclusive Discounts", description: "Get up to 30% off on all orders" },
    { icon: Truck, title: "Free Delivery", description: "No delivery charges on any order" },
    { icon: Coffee, title: "Priority Service", description: "Your orders get prepared first" },
    { icon: Heart, title: "Birthday Treats", description: "Special offers on your birthday" },
    { icon: Star, title: "Loyalty Points", description: "Earn points on every purchase" },
    { icon: Clock, title: "Early Access", description: "First to try new flavors & products" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-coffee-50 to-cream-100">
      <div className="container mx-auto px-6 py-20">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.h1 
              className="font-luxury text-5xl font-black text-coffee-900 mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Exclusive <span className="text-premium">Offers</span>
            </motion.h1>
            <p className="text-xl text-coffee-600 font-medium max-w-2xl mx-auto">
              Discover amazing deals and unlock premium benefits with our membership program
            </p>
          </div>
        </ScrollReveal>

        {/* Golden Membership Section */}
        {user && (
          <ScrollReveal className="mb-16">
            <GoldenMembership 
              currentSpent={user.totalSpent ? parseFloat(user.totalSpent) : 0}
              membershipTier={user.membershipTier || "regular"}
              pointsBalance={user.pointsBalance || 0}
            />
          </ScrollReveal>
        )}

        {/* Current Offers Grid */}
        <ScrollReveal>
          <div className="mb-16">
            <h2 className="font-luxury text-3xl font-bold text-coffee-800 mb-8 text-center">
              Active Offers
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {currentOffers.map((offer, index) => (
                <motion.div
                  key={offer.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="relative overflow-hidden border-2 border-coffee-200 hover:border-amber-300 transition-colors">
                    {/* Background gradient */}
                    <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-r ${offer.gradient} opacity-20 rounded-bl-full`} />
                    
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${offer.gradient} flex items-center justify-center`}>
                            <offer.icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-coffee-800 text-lg">{offer.title}</CardTitle>
                            {offer.membershipRequired && (
                              <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-yellow-900 font-bold text-xs">
                                <Crown className="w-3 h-3 mr-1" />
                                Golden Only
                              </Badge>
                            )}
                          </div>
                        </div>
                        <Badge variant="outline" className="text-coffee-600 border-coffee-300">
                          {offer.code}
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <p className="text-coffee-600 mb-4">{offer.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-coffee-500">
                          Valid until: {new Date(offer.validUntil).toLocaleDateString()}
                        </div>
                        <Button 
                          size="sm"
                          className={`bg-gradient-to-r ${offer.gradient} text-white font-bold hover:scale-105 transition-transform`}
                          disabled={offer.membershipRequired && user?.membershipTier !== offer.membershipRequired}
                        >
                          {offer.membershipRequired && user?.membershipTier !== offer.membershipRequired 
                            ? "Upgrade Required" 
                            : "Apply Offer"
                          }
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Membership Benefits */}
        <ScrollReveal>
          <div className="mb-16">
            <h2 className="font-luxury text-3xl font-bold text-coffee-800 mb-8 text-center">
              Golden 7-Star Benefits
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {membershipBenefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full border-amber-200 hover:border-amber-300 transition-colors">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <benefit.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-bold text-coffee-800 mb-2">{benefit.title}</h3>
                      <p className="text-coffee-600 text-sm">{benefit.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* CTA Section */}
        {!user?.membershipTier || user.membershipTier === "regular" ? (
          <ScrollReveal>
            <Card className="relative overflow-hidden bg-gradient-to-r from-amber-500 to-yellow-500 text-white border-0">
              <div className="absolute inset-0 bg-black/10" />
              <CardContent className="relative p-8 text-center">
                <Crown className="w-16 h-16 mx-auto mb-4 text-yellow-200" />
                <h3 className="font-luxury text-3xl font-bold mb-4">Ready for Golden 7-Star?</h3>
                <p className="text-yellow-100 mb-6 max-w-2xl mx-auto">
                  Spend ₹10,000 or more to unlock exclusive Golden 7-Star membership with amazing benefits and priority service.
                </p>
                <Button 
                  size="lg"
                  className="bg-white text-amber-700 font-bold hover:bg-yellow-50 transition-colors"
                >
                  <Coffee className="w-5 h-5 mr-2" />
                  Start Shopping
                </Button>
              </CardContent>
            </Card>
          </ScrollReveal>
        ) : null}
      </div>
    </div>
  );
}