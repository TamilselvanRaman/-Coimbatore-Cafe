import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './use-auth';
import { apiRequest } from '@/lib/queryClient';

export interface CartCustomization {
  size?: 'small' | 'medium' | 'large';
  strength?: number;
  milk?: 'whole' | 'oat' | 'almond' | 'coconut';
  extras?: string[];
  temperature?: 'hot' | 'cold';
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  customizations?: CartCustomization;
  totalPrice: number;
}

export const useCart = () => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCartItems = useCallback(async () => {
    if (!user) {
      setCartItems([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/cart/${user.id}`);
      if (!response.ok) throw new Error('Failed to fetch cart items');
      
      const data = await response.json();
      setCartItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load cart');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  const addItem = async (productId: string, quantity: number = 1, customizations?: CartCustomization) => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          userId: user.id,
          productId,
          quantity,
          customizations,
        }),
      });

      if (!response.ok) throw new Error('Failed to add item to cart');
      
      await fetchCartItems();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add item');
    } finally {
      setLoading(false);
    }
  };

  const updateItem = async (id: string, quantity: number) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/cart/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ quantity }),
      });

      if (!response.ok) throw new Error('Failed to update item');
      
      await fetchCartItems();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update item');
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/cart/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) throw new Error('Failed to remove item');
      
      await fetchCartItems();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove item');
    } finally {
      setLoading(false);
    }
  };

  const clearCartItems = async () => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/cart/clear/${user.id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) throw new Error('Failed to clear cart');
      
      setCartItems([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to clear cart');
    } finally {
      setLoading(false);
    }
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);

  return {
    cartItems,
    loading,
    error,
    addItem,
    updateItem,
    removeItem,
    clearCart: clearCartItems,
    fetchCartItems,
    totalItems,
    totalPrice,
  };
};