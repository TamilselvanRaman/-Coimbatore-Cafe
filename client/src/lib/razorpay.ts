declare global {
  interface Window {
    Razorpay: any;
  }
}

export interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  image?: string;
  order_id: string;
  handler: (response: any) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: Record<string, string>;
  theme?: {
    color?: string;
  };
}

export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const createRazorpayOrder = async (amount: number, currency = 'INR') => {
  try {
    const response = await fetch('/api/create-razorpay-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount, currency }),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to create order');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    throw error;
  }
};

export const initiatePayment = async (options: RazorpayOptions): Promise<void> => {
  const scriptLoaded = await loadRazorpayScript();
  
  if (!scriptLoaded) {
    throw new Error('Razorpay SDK failed to load. Please check your internet connection.');
  }

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
};

export const verifyPayment = async (paymentData: {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}) => {
  try {
    const response = await fetch('/api/verify-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Payment verification failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Error verifying payment:', error);
    throw error;
  }
};

export const getDefaultRazorpayOptions = (orderData: any, onSuccess: (response: any) => void): RazorpayOptions => {
  return {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_key',
    amount: orderData.amount,
    currency: orderData.currency || 'INR',
    name: 'Coimbatore Cafe',
    description: 'Premium Coffee Order',
    image: '/logo.png',
    order_id: orderData.id,
    handler: onSuccess,
    prefill: {
      name: orderData.customerName || '',
      email: orderData.customerEmail || '',
      contact: orderData.customerPhone || '',
    },
    notes: {
      address: orderData.deliveryAddress || 'Coimbatore, Tamil Nadu',
    },
    theme: {
      color: '#FFD700',
    },
  };
};
