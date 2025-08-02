import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollReveal } from "@/components/animated/scroll-reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { useCart } from "@/hooks/use-cart";
import { useAuth } from "@/hooks/use-auth";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { CartItem } from "@/components/cart/cart-item";
import { CheckoutButton } from "@/components/payment/checkout-button";
import { 
  ShoppingCart, 
  Coffee, 
  Trash2, 
  ArrowLeft,
  Gift,
  Percent,
  CreditCard
} from "lucide-react";
import { Link, Redirect } from "wouter";

export default function Cart() {
  const { user } = useAuth();
  const { 
    cartItems, 
    loading, 
    totalPrice,
    updateItem,
    removeItem,
    clearCart
  } = useCart();
  
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [discount, setDiscount] = useState(0);

  // Redirect to login if not authenticated
  if (!user) {
    return <Redirect to="/auth/login" />;
  }

  const handleApplyPromo = () => {
    // TODO: Implement promo code validation
    if (promoCode === "WELCOME10") {
      setDiscount(totalPrice * 0.1);
      setPromoApplied(true);
    }
  };

  const subtotal = totalPrice;
  const deliveryFee = 0; // Free delivery
  const finalTotal = totalPrice - discount;

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
                Your <span className="text-amber-400">Cart</span>
              </motion.h1>
              <motion.p 
                className="text-xl text-coffee-200 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Review your items and proceed to checkout
              </motion.p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Cart Content */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-6xl">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <LoadingSpinner size="lg" />
            </div>
          ) : cartItems.length === 0 ? (
            <ScrollReveal>
              <Card className="max-w-md mx-auto">
                <CardContent className="text-center p-12">
                  <ShoppingCart className="w-16 h-16 text-coffee-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-coffee-800 mb-2">Your cart is empty</h3>
                  <p className="text-coffee-600 mb-6">
                    Looks like you haven't added any items to your cart yet.
                  </p>
                  <div className="space-y-3">
                    <Link href="/menu">
                      <Button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-coffee-900 hover:from-amber-600 hover:to-amber-700">
                        <Coffee className="w-4 h-4 mr-2" />
                        Browse Menu
                      </Button>
                    </Link>
                    <Link href="/">
                      <Button variant="outline" className="w-full">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Home
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <ScrollReveal>
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center">
                          <ShoppingCart className="w-5 h-5 mr-2" />
                          Cart Items ({cartItems.length})
                        </CardTitle>
                        <Button
                          variant="ghost"
                          onClick={clearCart}
                          className="text-red-500 hover:text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Clear All
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {cartItems.map((item) => (
                          <CartItem
                            key={item.id}
                            item={item}
                            onUpdateQuantity={(quantity) => updateItem(item.id, quantity)}
                            onRemove={() => removeItem(item.id)}
                          />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </ScrollReveal>

                {/* Continue Shopping */}
                <ScrollReveal delay={0.2} className="mt-6">
                  <Link href="/menu">
                    <Button variant="outline" className="border-coffee-200 text-coffee-600 hover:bg-coffee-50">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Continue Shopping
                    </Button>
                  </Link>
                </ScrollReveal>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <ScrollReveal delay={0.3}>
                  <Card className="sticky top-24">
                    <CardHeader>
                      <CardTitle>Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Promo Code */}
                      <div className="space-y-3">
                        <h4 className="font-semibold text-coffee-800 flex items-center">
                          <Gift className="w-4 h-4 mr-2" />
                          Promo Code
                        </h4>
                        <div className="flex space-x-2">
                          <Input
                            placeholder="Enter promo code"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                            disabled={promoApplied}
                            className="flex-1"
                          />
                          <Button
                            onClick={handleApplyPromo}
                            disabled={promoApplied}
                            variant="outline"
                            size="sm"
                          >
                            Apply
                          </Button>
                        </div>
                        {promoApplied && (
                          <motion.div
                            className="flex items-center text-green-600 text-sm"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                          >
                            <Percent className="w-4 h-4 mr-1" />
                            Promo code applied successfully!
                          </motion.div>
                        )}
                      </div>

                      <Separator />

                      {/* Price Breakdown */}
                      <div className="space-y-3">
                        <div className="flex justify-between text-coffee-600">
                          <span>Subtotal ({cartItems.length} items):</span>
                          <span>₹{subtotal.toFixed(2)}</span>
                        </div>
                        
                        {discount > 0 && (
                          <div className="flex justify-between text-green-600">
                            <span>Discount:</span>
                            <span>-₹{discount.toFixed(2)}</span>
                          </div>
                        )}
                        
                        <div className="flex justify-between text-coffee-600">
                          <span>Delivery Fee:</span>
                          <span>{deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}</span>
                        </div>
                        
                        {deliveryFee > 0 && (
                          <div className="text-sm text-coffee-500">
                            Add ₹{(500 - subtotal).toFixed(2)} more for free delivery!
                          </div>
                        )}
                        
                        <Separator />
                        
                        <div className="flex justify-between font-bold text-lg">
                          <span>Total:</span>
                          <span className="text-amber-600">₹{finalTotal.toFixed(2)}</span>
                        </div>
                      </div>

                      {/* Checkout Button */}
                      <CheckoutButton className="w-full py-4 text-lg" />

                      {/* Payment Methods */}
                      <div className="pt-4 border-t border-coffee-200">
                        <h5 className="font-semibold text-coffee-800 mb-3 flex items-center">
                          <CreditCard className="w-4 h-4 mr-2" />
                          Accepted Payments
                        </h5>
                        <div className="flex items-center space-x-4 text-sm text-coffee-600">
                          <span>Cards</span>
                          <span>•</span>
                          <span>UPI</span>
                          <span>•</span>
                          <span>Net Banking</span>
                          <span>•</span>
                          <span>Wallets</span>
                        </div>
                      </div>

                      {/* Order Benefits */}
                      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                        <h5 className="font-semibold text-coffee-800 mb-2">Order Benefits</h5>
                        <ul className="text-sm text-coffee-600 space-y-1">
                          <li className="flex items-center">
                            <div className="w-2 h-2 bg-amber-400 rounded-full mr-2"></div>
                            Fresh, hot delivery
                          </li>
                          <li className="flex items-center">
                            <div className="w-2 h-2 bg-amber-400 rounded-full mr-2"></div>
                            Real-time order tracking
                          </li>
                          <li className="flex items-center">
                            <div className="w-2 h-2 bg-amber-400 rounded-full mr-2"></div>
                            24/7 customer support
                          </li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
