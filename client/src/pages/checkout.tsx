import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollReveal } from "@/components/animated/scroll-reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/use-cart";
import { useAuth } from "@/hooks/use-auth";
import { CheckoutButton } from "@/components/payment/checkout-button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { 
  MapPin, 
  Phone, 
  Mail, 
  User, 
  Clock,
  ShoppingBag,
  CreditCard,
  ArrowLeft,
  CheckCircle
} from "lucide-react";
import { Link, Redirect, useLocation } from "wouter";

export default function Checkout() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const { 
    cartItems, 
    loading, 
    getTotalPrice, 
    getDeliveryFee, 
    getFinalTotal 
  } = useCart();
  
  const [deliveryInfo, setDeliveryInfo] = useState({
    fullName: user?.user_metadata?.full_name || "",
    phone: user?.user_metadata?.phone || "",
    email: user?.email || "",
    address: user?.user_metadata?.address || "",
    landmark: "",
    instructions: "",
  });

  // Redirect to login if not authenticated
  if (!user) {
    return <Redirect to="/auth/login" />;
  }

  // Redirect to cart if empty
  if (!loading && cartItems.length === 0) {
    return <Redirect to="/cart" />;
  }

  const handleInputChange = (field: string, value: string) => {
    setDeliveryInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckoutSuccess = () => {
    setLocation("/orders");
  };

  const subtotal = getTotalPrice();
  const deliveryFee = getDeliveryFee();
  const finalTotal = getFinalTotal();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-coffee-50">
      <Navbar />
      
      {/* Header */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-coffee-800 to-coffee-900">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="text-center text-white">
              <motion.h1 
                className="font-luxury text-4xl lg:text-5xl font-bold mb-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="text-amber-400">Checkout</span>
              </motion.h1>
              <motion.p 
                className="text-xl text-coffee-200 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Almost there! Complete your order details
              </motion.p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Checkout Content */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Delivery Information */}
            <div className="lg:col-span-2 space-y-8">
              <ScrollReveal>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MapPin className="w-5 h-5 mr-2" />
                      Delivery Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name *</Label>
                        <Input
                          id="fullName"
                          value={deliveryInfo.fullName}
                          onChange={(e) => handleInputChange("fullName", e.target.value)}
                          placeholder="Enter your full name"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={deliveryInfo.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          placeholder="Enter your phone number"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={deliveryInfo.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="Enter your email"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Delivery Address *</Label>
                      <Textarea
                        id="address"
                        value={deliveryInfo.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        placeholder="Enter your complete delivery address"
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="landmark">Landmark (Optional)</Label>
                      <Input
                        id="landmark"
                        value={deliveryInfo.landmark}
                        onChange={(e) => handleInputChange("landmark", e.target.value)}
                        placeholder="Any nearby landmark"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="instructions">Delivery Instructions (Optional)</Label>
                      <Textarea
                        id="instructions"
                        value={deliveryInfo.instructions}
                        onChange={(e) => handleInputChange("instructions", e.target.value)}
                        placeholder="Any special instructions for delivery"
                        rows={2}
                      />
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Clock className="w-5 h-5 mr-2" />
                      Delivery Time
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                        <div>
                          <div className="font-semibold text-coffee-800">
                            Estimated delivery: 25-35 minutes
                          </div>
                          <div className="text-coffee-600 text-sm">
                            Our team will prepare your order fresh and deliver it hot to your doorstep
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <ScrollReveal delay={0.3}>
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <ShoppingBag className="w-5 h-5 mr-2" />
                      Order Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Order Items */}
                    <div className="space-y-3">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex items-center space-x-3 pb-3 border-b border-coffee-100 last:border-b-0">
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold text-coffee-800 text-sm">{item.name}</h4>
                            {item.customizations && (
                              <p className="text-coffee-600 text-xs">
                                {Object.entries(item.customizations).map(([key, value]) => 
                                  value ? `${key}: ${value}` : ""
                                ).filter(Boolean).join(", ")}
                              </p>
                            )}
                            <div className="flex items-center justify-between mt-1">
                              <Badge variant="secondary" className="text-xs">Qty: {item.quantity}</Badge>
                              <span className="font-bold text-amber-600 text-sm">₹{item.totalPrice}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Separator />

                    {/* Price Breakdown */}
                    <div className="space-y-3">
                      <div className="flex justify-between text-coffee-600">
                        <span>Subtotal ({cartItems.length} items):</span>
                        <span>₹{subtotal.toFixed(2)}</span>
                      </div>
                      
                      <div className="flex justify-between text-coffee-600">
                        <span>Delivery Fee:</span>
                        <span>{deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}</span>
                      </div>
                      
                      {deliveryFee > 0 && (
                        <div className="text-sm text-coffee-500">
                          You're ₹{(500 - subtotal).toFixed(2)} away from free delivery!
                        </div>
                      )}
                      
                      <Separator />
                      
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total:</span>
                        <span className="text-amber-600">₹{finalTotal.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Checkout Button */}
                    <CheckoutButton 
                      onSuccess={handleCheckoutSuccess}
                      className="w-full py-4 text-lg" 
                    />

                    {/* Back to Cart */}
                    <Link href="/cart">
                      <Button variant="outline" className="w-full">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Cart
                      </Button>
                    </Link>

                    {/* Security Note */}
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <CreditCard className="w-4 h-4 text-green-600" />
                        <span className="font-semibold text-green-800 text-sm">Secure Payment</span>
                      </div>
                      <p className="text-green-600 text-xs">
                        Your payment information is encrypted and secure. We use industry-standard security measures.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
