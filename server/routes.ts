import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { loginSchema, registerSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Authentication routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      const userData = registerSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(userData.email);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists with this email" });
      }

      const user = await storage.createUser({
        email: userData.email,
        password: userData.password, // TODO: Hash password in production
        fullName: userData.fullName,
        phone: userData.phone,
      });

      res.status(201).json({ 
        message: "User created successfully",
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          phone: user.phone,
        }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Validation error", 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const credentials = loginSchema.parse(req.body);
      
      const user = await storage.getUserByEmail(credentials.email);
      if (!user || user.password !== credentials.password) { // TODO: Use proper password hashing
        return res.status(401).json({ message: "Invalid email or password" });
      }

      res.json({
        message: "Login successful",
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          phone: user.phone,
        }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Validation error", 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Menu routes
  app.get("/api/menu/categories", async (req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });

  app.get("/api/menu/products", async (req, res) => {
    try {
      const { category } = req.query;
      const products = await storage.getProducts(category as string);
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  app.get("/api/menu/product/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const product = await storage.getProduct(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  // Cart routes
  app.get("/api/cart/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const cartItems = await storage.getCartItems(userId);
      res.json(cartItems);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch cart items" });
    }
  });

  app.post("/api/cart", async (req, res) => {
    try {
      const cartItem = await storage.addToCart(req.body);
      res.status(201).json(cartItem);
    } catch (error) {
      res.status(500).json({ message: "Failed to add item to cart" });
    }
  });

  app.put("/api/cart/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { quantity } = req.body;
      const updatedItem = await storage.updateCartItem(id, quantity);
      if (!updatedItem) {
        return res.status(404).json({ message: "Cart item not found" });
      }
      res.json(updatedItem);
    } catch (error) {
      res.status(500).json({ message: "Failed to update cart item" });
    }
  });

  app.delete("/api/cart/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.removeFromCart(id);
      res.json({ message: "Item removed from cart" });
    } catch (error) {
      res.status(500).json({ message: "Failed to remove item from cart" });
    }
  });

  app.delete("/api/cart/user/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      await storage.clearCart(userId);
      res.json({ message: "Cart cleared successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to clear cart" });
    }
  });

  // Order routes
  app.get("/api/orders/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const orders = await storage.getUserOrders(userId);
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch orders" });
    }
  });

  app.post("/api/orders", async (req, res) => {
    try {
      const order = await storage.createOrder(req.body);
      res.status(201).json(order);
    } catch (error) {
      res.status(500).json({ message: "Failed to create order" });
    }
  });

  app.put("/api/orders/:id/status", async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const updatedOrder = await storage.updateOrderStatus(id, status);
      if (!updatedOrder) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.json(updatedOrder);
    } catch (error) {
      res.status(500).json({ message: "Failed to update order status" });
    }
  });

  // Payment routes
  app.post("/api/create-razorpay-order", async (req, res) => {
    try {
      const { amount, currency = "INR" } = req.body;
      
      // TODO: Integrate with actual Razorpay API
      // For now, return a mock order
      const order = {
        id: `order_${Date.now()}`,
        amount: amount * 100, // Convert to paise
        currency,
        receipt: `receipt_${Date.now()}`,
        status: "created",
      };
      
      res.json(order);
    } catch (error) {
      res.status(500).json({ message: "Failed to create payment order" });
    }
  });

  app.post("/api/verify-payment", async (req, res) => {
    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature, cartItems, userId, totalAmount } = req.body;
      
      // TODO: Verify payment signature with Razorpay
      // For now, assume payment is valid
      
      // Create order in database
      const orderNumber = `ORD${Date.now()}`;
      const order = await storage.createOrder({
        userId,
        totalAmount: totalAmount.toString(),
        status: "confirmed",
        paymentId: razorpay_payment_id,
        paymentStatus: "completed",
      });

      // Add order items
      for (const item of cartItems) {
        await storage.addOrderItem({
          orderId: order.id,
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: item.price.toString(),
          customizations: item.customizations,
          totalPrice: (item.price * item.quantity).toString(),
        });
      }

      // Clear cart
      await storage.clearCart(userId);

      res.json({ 
        message: "Payment verified successfully",
        order: {
          id: order.id,
          orderNumber: order.orderNumber,
          status: order.status,
        }
      });
    } catch (error) {
      res.status(500).json({ message: "Payment verification failed" });
    }
  });

  // Wishlist routes
  app.get("/api/wishlist/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const wishlistItems = await storage.getWishlistItems(userId);
      res.json(wishlistItems);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch wishlist items" });
    }
  });

  app.post("/api/wishlist", async (req, res) => {
    try {
      const wishlistItem = await storage.addToWishlist(req.body);
      res.status(201).json(wishlistItem);
    } catch (error) {
      res.status(500).json({ message: "Failed to add item to wishlist" });
    }
  });

  app.delete("/api/wishlist/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.removeFromWishlist(id);
      res.json({ message: "Item removed from wishlist" });
    } catch (error) {
      res.status(500).json({ message: "Failed to remove item from wishlist" });
    }
  });

  // Enhanced API routes for new features

  // Social login endpoints (Google/Apple)
  app.post("/api/auth/google", async (req, res) => {
    try {
      const { token, email, name, picture } = req.body;
      
      // In real implementation, verify Google token
      let user = await storage.getUserByEmail(email);
      
      if (!user) {
        user = await storage.createUser({
          email,
          fullName: name,
          profileImageUrl: picture,
        });
      }

      res.json({ user, message: "Google login successful" });
    } catch (error) {
      console.error("Google login error:", error);
      res.status(500).json({ message: "Google login failed" });
    }
  });

  app.post("/api/auth/apple", async (req, res) => {
    try {
      const { token, email, name } = req.body;
      
      // In real implementation, verify Apple token
      let user = await storage.getUserByEmail(email);
      
      if (!user) {
        user = await storage.createUser({
          email,
          fullName: name,
        });
      }

      res.json({ user, message: "Apple login successful" });
    } catch (error) {
      console.error("Apple login error:", error);
      res.status(500).json({ message: "Apple login failed" });
    }
  });

  // Offer management routes
  app.get("/api/offers", async (req, res) => {
    try {
      const offers = await storage.getActiveOffers();
      res.json(offers);
    } catch (error) {
      console.error("Error fetching offers:", error);
      res.status(500).json({ message: "Failed to fetch offers" });
    }
  });

  app.get("/api/offers/membership/:tier", async (req, res) => {
    try {
      const { tier } = req.params;
      const offers = await storage.getOffersByMembership(tier);
      res.json(offers);
    } catch (error) {
      console.error("Error fetching membership offers:", error);
      res.status(500).json({ message: "Failed to fetch membership offers" });
    }
  });

  // Session tracking for user engagement
  app.post("/api/sessions", async (req, res) => {
    try {
      const sessionData = {
        userId: req.body.userId,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent'),
        startTime: new Date(),
      };
      
      const session = await storage.createSession(sessionData);
      res.json(session);
    } catch (error) {
      console.error("Error creating session:", error);
      res.status(500).json({ message: "Failed to create session" });
    }
  });

  app.patch("/api/sessions/:sessionId", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const updates = req.body;
      
      const session = await storage.updateSession(sessionId, updates);
      res.json(session);
    } catch (error) {
      console.error("Error updating session:", error);
      res.status(500).json({ message: "Failed to update session" });
    }
  });

  // Order tracking routes
  app.get("/api/orders/:orderId/tracking", async (req, res) => {
    try {
      const { orderId } = req.params;
      const trackingEvents = await storage.getOrderTracking(orderId);
      res.json(trackingEvents);
    } catch (error) {
      console.error("Error fetching order tracking:", error);
      res.status(500).json({ message: "Failed to fetch order tracking" });
    }
  });

  app.post("/api/orders/:orderId/tracking", async (req, res) => {
    try {
      const { orderId } = req.params;
      const event = req.body;
      
      const trackingEvent = await storage.addTrackingEvent(orderId, event);
      res.json(trackingEvent);
    } catch (error) {
      console.error("Error adding tracking event:", error);
      res.status(500).json({ message: "Failed to add tracking event" });
    }
  });

  // Recent orders for tracking page
  app.get("/api/orders/recent", async (req, res) => {
    try {
      // Mock recent orders for demo
      const recentOrders = [
        {
          id: "order-1",
          orderNumber: "CM2025080001",
          totalAmount: "450",
          status: "on_the_way",
          createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        },
        {
          id: "order-2", 
          orderNumber: "CM2025080002",
          totalAmount: "320",
          status: "delivered",
          createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
        }
      ];
      
      res.json(recentOrders);
    } catch (error) {
      console.error("Error fetching recent orders:", error);
      res.status(500).json({ message: "Failed to fetch recent orders" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
