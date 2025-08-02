import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { LiveOrderTracking } from "@/components/tracking/live-order-tracking";
import { ScrollReveal } from "@/components/animated/scroll-reveal";
import { Search, MapPin, Clock, Coffee } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

export default function TrackOrder() {
  const [orderId, setOrderId] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { user } = useAuth();

  // Fetch user's recent orders
  const { data: recentOrders, isLoading } = useQuery({
    queryKey: ["/api/orders/recent"],
    enabled: !!user,
  });

  // Mock order data for demonstration
  const mockOrderData = {
    orderId: "CM2025080001",
    status: "on_the_way",
    deliveryBoyName: "Rajesh Kumar",
    deliveryBoyPhone: "+91 98765 43210",
    estimatedTime: "25 min",
    currentLocation: {
      lat: 11.0168,
      lng: 76.9558,
      address: "Near RS Puram Signal, Coimbatore"
    }
  };

  const handleSearch = () => {
    if (orderId.trim()) {
      setSelectedOrder(mockOrderData);
    }
  };

  const handleOrderSelect = (order: any) => {
    setSelectedOrder(order);
    setOrderId(order.id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-coffee-50 to-cream-100">
      <Navbar />
      
      <div className="container mx-auto px-6 py-24">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.h1 
              className="font-luxury text-5xl font-black text-coffee-900 mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Track Your <span className="text-premium">Order</span>
            </motion.h1>
            <p className="text-xl text-coffee-600 font-medium max-w-2xl mx-auto">
              Real-time order tracking with live location updates
            </p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Search & Recent Orders */}
          <div className="lg:col-span-1 space-y-6">
            {/* Order Search */}
            <ScrollReveal>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-coffee-800">
                    <Search className="w-5 h-5 mr-2" />
                    Find Your Order
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Enter Order ID (e.g. CM2025080001)"
                      value={orderId}
                      onChange={(e) => setOrderId(e.target.value)}
                      className="flex-1"
                    />
                    <Button onClick={handleSearch} className="bg-amber-500 hover:bg-amber-600">
                      Track
                    </Button>
                  </div>
                  <p className="text-sm text-coffee-600">
                    You can find your Order ID in the confirmation SMS or email
                  </p>
                </CardContent>
              </Card>
            </ScrollReveal>

            {/* Recent Orders */}
            {user && (
              <ScrollReveal>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-coffee-800">Recent Orders</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isLoading ? (
                      <div className="space-y-3">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="h-16 bg-coffee-100 rounded animate-pulse" />
                        ))}
                      </div>
                    ) : recentOrders?.length > 0 ? (
                      <div className="space-y-3">
                        {recentOrders.map((order: any) => (
                          <motion.div
                            key={order.id}
                            className="p-3 border border-coffee-200 rounded-lg cursor-pointer hover:bg-coffee-50 transition-colors"
                            whileHover={{ scale: 1.02 }}
                            onClick={() => handleOrderSelect(order)}
                          >
                            <div className="flex justify-between items-center">
                              <div>
                                <div className="font-medium text-coffee-800">#{order.orderNumber}</div>
                                <div className="text-sm text-coffee-600">₹{order.totalAmount}</div>
                              </div>
                              <Badge className={
                                order.status === "delivered" ? "bg-green-500" :
                                order.status === "on_the_way" ? "bg-blue-500" :
                                order.status === "preparing" ? "bg-amber-500" : "bg-gray-500"
                              }>
                                {order.status.replace("_", " ").toUpperCase()}
                              </Badge>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Coffee className="w-12 h-12 text-coffee-300 mx-auto mb-3" />
                        <p className="text-coffee-600">No recent orders found</p>
                        <p className="text-sm text-coffee-500 mt-1">
                          Your order history will appear here
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </ScrollReveal>
            )}
          </div>

          {/* Live Tracking */}
          <div className="lg:col-span-2">
            {selectedOrder ? (
              <ScrollReveal>
                <LiveOrderTracking {...selectedOrder} />
              </ScrollReveal>
            ) : (
              <ScrollReveal>
                <Card className="h-full flex items-center justify-center">
                  <CardContent className="text-center py-16">
                    <MapPin className="w-16 h-16 text-coffee-300 mx-auto mb-4" />
                    <h3 className="font-bold text-xl text-coffee-800 mb-2">
                      Enter Order ID to Track
                    </h3>
                    <p className="text-coffee-600 mb-6 max-w-md mx-auto">
                      Get real-time updates on your order status, delivery person details, 
                      and live location tracking.
                    </p>
                    
                    {/* Demo Features */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                      <div className="p-4 bg-coffee-50 rounded-lg">
                        <Clock className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                        <h4 className="font-semibold text-coffee-800">Live Updates</h4>
                        <p className="text-sm text-coffee-600">Real-time status updates</p>
                      </div>
                      <div className="p-4 bg-coffee-50 rounded-lg">
                        <MapPin className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                        <h4 className="font-semibold text-coffee-800">GPS Tracking</h4>
                        <p className="text-sm text-coffee-600">Live delivery location</p>
                      </div>
                      <div className="p-4 bg-coffee-50 rounded-lg">
                        <Coffee className="w-8 h-8 text-green-600 mx-auto mb-2" />
                        <h4 className="font-semibold text-coffee-800">Order Timeline</h4>
                        <p className="text-sm text-coffee-600">Complete progress view</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}