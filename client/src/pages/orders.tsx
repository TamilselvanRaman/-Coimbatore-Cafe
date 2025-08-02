import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollReveal } from "@/components/animated/scroll-reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { 
  Package, 
  Search, 
  Clock, 
  CheckCircle, 
  Truck, 
  MapPin,
  Phone,
  RefreshCw,
  Coffee,
  Calendar
} from "lucide-react";
import { Link, Redirect } from "wouter";

export default function Orders() {
  const { user, loading: authLoading } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  // Redirect if not authenticated
  if (!authLoading && !user) {
    return <Redirect to="/auth/login" />;
  }

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const orderStatuses = [
    { value: "all", label: "All Orders", count: 0 },
    { value: "pending", label: "Pending", count: 0 },
    { value: "confirmed", label: "Confirmed", count: 0 },
    { value: "preparing", label: "Preparing", count: 0 },
    { value: "out_for_delivery", label: "Out for Delivery", count: 0 },
    { value: "delivered", label: "Delivered", count: 0 },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending": return <Clock className="w-4 h-4" />;
      case "confirmed": return <CheckCircle className="w-4 h-4" />;
      case "preparing": return <Coffee className="w-4 h-4" />;
      case "out_for_delivery": return <Truck className="w-4 h-4" />;
      case "delivered": return <CheckCircle className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "confirmed": return "bg-blue-100 text-blue-800 border-blue-200";
      case "preparing": return "bg-orange-100 text-orange-800 border-orange-200";
      case "out_for_delivery": return "bg-purple-100 text-purple-800 border-purple-200";
      case "delivered": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // TODO: Fetch actual orders from API
  const orders: any[] = [];

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
                Order <span className="text-amber-400">History</span>
              </motion.h1>
              <motion.p 
                className="text-xl text-coffee-200 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Track your current orders and view your complete order history.
              </motion.p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b border-coffee-100">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-coffee-400" />
              <Input
                type="text"
                placeholder="Search by order number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-coffee-200 focus:border-amber-500 focus:ring-amber-500"
              />
            </div>

            {/* Status Filter */}
            <div className="flex flex-wrap gap-2">
              {orderStatuses.map((status) => (
                <Button
                  key={status.value}
                  variant={selectedStatus === status.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedStatus(status.value)}
                  className={selectedStatus === status.value 
                    ? "bg-amber-500 text-coffee-900 hover:bg-amber-600" 
                    : "border-coffee-200 text-coffee-600 hover:bg-coffee-50"
                  }
                >
                  {status.label}
                  {status.count > 0 && (
                    <Badge variant="secondary" className="ml-1 bg-white text-amber-600">
                      {status.count}
                    </Badge>
                  )}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Orders Content */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          {orders.length === 0 ? (
            <ScrollReveal>
              <Card className="max-w-md mx-auto">
                <CardContent className="text-center p-12">
                  <Package className="w-16 h-16 text-coffee-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-coffee-800 mb-2">No orders found</h3>
                  <p className="text-coffee-600 mb-6">
                    {searchQuery 
                      ? `No orders match "${searchQuery}"`
                      : "You haven't placed any orders yet. Start your coffee journey!"
                    }
                  </p>
                  <div className="space-y-3">
                    <Link href="/menu">
                      <Button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-coffee-900 hover:from-amber-600 hover:to-amber-700">
                        Browse Menu
                      </Button>
                    </Link>
                    {searchQuery && (
                      <Button
                        variant="outline"
                        onClick={() => setSearchQuery("")}
                        className="w-full border-coffee-200 text-coffee-600 hover:bg-coffee-50"
                      >
                        Clear Search
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          ) : (
            <div className="space-y-4">
              {/* Sample Order Cards would go here */}
              {/* TODO: Map through actual orders */}
            </div>
          )}

          {/* Quick Actions */}
          {orders.length === 0 && !searchQuery && (
            <ScrollReveal delay={0.2} className="mt-12">
              <Card className="bg-gradient-to-r from-amber-50 to-amber-100 border-amber-200">
                <CardContent className="p-8 text-center">
                  <Coffee className="w-12 h-12 text-amber-500 mx-auto mb-4" />
                  <h3 className="font-luxury text-2xl font-bold text-coffee-800 mb-4">
                    Ready for Your First Order?
                  </h3>
                  <p className="text-coffee-600 mb-6">
                    Discover our premium coffee collection and place your first order today!
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/menu">
                      <Button className="bg-gradient-to-r from-amber-500 to-amber-600 text-coffee-900 hover:from-amber-600 hover:to-amber-700">
                        <Coffee className="w-4 h-4 mr-2" />
                        View Menu
                      </Button>
                    </Link>
                    <Link href="/#customize">
                      <Button variant="outline" className="border-amber-300 text-amber-700 hover:bg-amber-200">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Customize Drink
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* Order Tracking Help */}
      <section className="py-16 bg-coffee-100">
        <div className="container mx-auto px-6 max-w-4xl">
          <ScrollReveal>
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Order Status Guide</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="text-center p-4">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Clock className="w-6 h-6 text-yellow-600" />
                    </div>
                    <h4 className="font-semibold text-coffee-800 mb-2">Order Placed</h4>
                    <p className="text-coffee-600 text-sm">Your order has been received and is awaiting confirmation.</p>
                  </div>
                  
                  <div className="text-center p-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <CheckCircle className="w-6 h-6 text-blue-600" />
                    </div>
                    <h4 className="font-semibold text-coffee-800 mb-2">Confirmed</h4>
                    <p className="text-coffee-600 text-sm">Order confirmed and payment processed successfully.</p>
                  </div>
                  
                  <div className="text-center p-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Coffee className="w-6 h-6 text-orange-600" />
                    </div>
                    <h4 className="font-semibold text-coffee-800 mb-2">Preparing</h4>
                    <p className="text-coffee-600 text-sm">Your coffee is being freshly prepared by our baristas.</p>
                  </div>
                  
                  <div className="text-center p-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Truck className="w-6 h-6 text-purple-600" />
                    </div>
                    <h4 className="font-semibold text-coffee-800 mb-2">Out for Delivery</h4>
                    <p className="text-coffee-600 text-sm">Your order is on the way to your location.</p>
                  </div>
                  
                  <div className="text-center p-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <h4 className="font-semibold text-coffee-800 mb-2">Delivered</h4>
                    <p className="text-coffee-600 text-sm">Order successfully delivered. Enjoy your coffee!</p>
                  </div>
                  
                  <div className="text-center p-4">
                    <div className="w-12 h-12 bg-coffee-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Phone className="w-6 h-6 text-coffee-600" />
                    </div>
                    <h4 className="font-semibold text-coffee-800 mb-2">Need Help?</h4>
                    <p className="text-coffee-600 text-sm">Contact our support team for any order issues.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
