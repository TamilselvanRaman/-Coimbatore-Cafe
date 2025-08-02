import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Plus, Minus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/use-cart";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { CartItem } from "./cart-item";
import { Link } from "wouter";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { 
    cartItems, 
    loading, 
    totalPrice,
    updateItem,
    removeItem 
  } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-50 flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            {/* Header */}
            <div className="p-6 border-b border-coffee-200">
              <div className="flex items-center justify-between">
                <h3 className="font-luxury text-2xl font-bold text-coffee-800 flex items-center">
                  <ShoppingBag className="w-6 h-6 mr-2" />
                  Your Order
                </h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="hover:bg-coffee-100"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col">
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <LoadingSpinner size="lg" />
                </div>
              ) : cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center p-6">
                  <ShoppingBag className="w-16 h-16 text-coffee-300 mb-4" />
                  <h4 className="text-xl font-semibold text-coffee-800 mb-2">Your cart is empty</h4>
                  <p className="text-coffee-600 mb-6">Add some delicious items to get started!</p>
                  <Link href="/menu">
                    <Button 
                      onClick={onClose}
                      className="bg-gradient-to-r from-amber-500 to-amber-600 text-coffee-900 font-semibold hover:from-amber-600 hover:to-amber-700"
                    >
                      Browse Menu
                    </Button>
                  </Link>
                </div>
              ) : (
                <>
                  {/* Items */}
                  <ScrollArea className="flex-1 p-6">
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
                  </ScrollArea>

                  {/* Footer */}
                  <div className="border-t border-coffee-200 p-6">
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between text-coffee-600">
                        <span>Subtotal:</span>
                        <span>₹{totalPrice.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-coffee-600">
                        <span>Delivery:</span>
                        <span>FREE</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total:</span>
                        <span className="text-amber-600">₹{totalPrice.toFixed(2)}</span>
                      </div>
                      {totalPrice < 500 && (
                        <p className="text-sm text-coffee-500">
                          Add ₹{(500 - totalPrice).toFixed(2)} more for free delivery!
                        </p>
                      )}
                    </div>

                    <Link href="/checkout">
                      <Button
                        className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-coffee-900 font-bold text-lg py-6 hover:from-amber-600 hover:to-amber-700 shadow-lg hover:shadow-amber-500/25 transition-all duration-300"
                        onClick={onClose}
                      >
                        Proceed to Checkout
                      </Button>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
