import { useState } from "react";
import { CreditCard, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useCart } from "@/hooks/use-cart";
import { createRazorpayOrder, initiatePayment, getDefaultRazorpayOptions } from "@/lib/razorpay";
import { useToast } from "@/hooks/use-toast";

interface CheckoutButtonProps {
  onSuccess?: () => void;
  className?: string;
}

export function CheckoutButton({ onSuccess, className }: CheckoutButtonProps) {
  const { user } = useAuth();
  const { cartItems, getFinalTotal, clearAllItems } = useCart();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to proceed with payment",
        variant: "destructive",
      });
      return;
    }

    if (cartItems.length === 0) {
      toast({
        title: "Empty Cart",
        description: "Please add items to your cart before checkout",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Create Razorpay order
      const amount = getFinalTotal();
      const orderData = await createRazorpayOrder(amount);
      
      // Add customer information
      const orderWithCustomer = {
        ...orderData,
        customerName: user.user_metadata?.full_name || user.email,
        customerEmail: user.email,
        customerPhone: user.user_metadata?.phone || '',
        deliveryAddress: user.user_metadata?.address || 'Coimbatore, Tamil Nadu',
      };

      // Success handler
      const handlePaymentSuccess = async (response: any) => {
        try {
          // Verify payment on backend
          const verificationResponse = await fetch('/api/verify-payment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              cartItems,
              userId: user.id,
              totalAmount: amount,
            }),
            credentials: 'include',
          });

          if (verificationResponse.ok) {
            toast({
              title: "Payment Successful!",
              description: "Your order has been placed successfully. You'll receive a confirmation email shortly.",
            });
            
            // Clear cart and redirect
            await clearAllItems();
            onSuccess?.();
          } else {
            throw new Error('Payment verification failed');
          }
        } catch (error) {
          console.error('Payment verification error:', error);
          toast({
            title: "Payment Verification Failed",
            description: "Your payment was processed but verification failed. Please contact support.",
            variant: "destructive",
          });
        }
      };

      // Get Razorpay options and initiate payment
      const razorpayOptions = getDefaultRazorpayOptions(orderWithCustomer, handlePaymentSuccess);
      await initiatePayment(razorpayOptions);

    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Payment Failed",
        description: error instanceof Error ? error.message : "Failed to initiate payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handlePayment}
      disabled={loading || cartItems.length === 0}
      className={`bg-gradient-to-r from-amber-500 to-amber-600 text-coffee-900 font-bold hover:from-amber-600 hover:to-amber-700 shadow-lg hover:shadow-amber-500/25 transition-all duration-300 ${className}`}
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Processing...
        </>
      ) : (
        <>
          <CreditCard className="w-4 h-4 mr-2" />
          Pay ₹{getFinalTotal().toFixed(2)}
        </>
      )}
    </Button>
  );
}
