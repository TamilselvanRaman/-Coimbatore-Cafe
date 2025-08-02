import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  MapPin, 
  Phone, 
  Clock, 
  CheckCircle, 
  Truck, 
  Coffee,
  Navigation,
  User,
  Star
} from "lucide-react";

interface OrderTrackingProps {
  orderId: string;
  status: string;
  deliveryBoyName?: string;
  deliveryBoyPhone?: string;
  estimatedTime?: string;
  currentLocation?: { lat: number; lng: number; address: string };
}

export function LiveOrderTracking({ 
  orderId, 
  status, 
  deliveryBoyName, 
  deliveryBoyPhone, 
  estimatedTime,
  currentLocation 
}: OrderTrackingProps) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const trackingSteps = [
    { 
      id: "pending", 
      title: "Order Placed", 
      description: "Your order has been received",
      icon: CheckCircle,
      completed: true
    },
    { 
      id: "confirmed", 
      title: "Order Confirmed", 
      description: "We're preparing your coffee",
      icon: Coffee,
      completed: ["confirmed", "preparing", "on_the_way", "delivered"].includes(status)
    },
    { 
      id: "preparing", 
      title: "Being Prepared", 
      description: "Our baristas are crafting your order",
      icon: Coffee,
      completed: ["preparing", "on_the_way", "delivered"].includes(status)
    },
    { 
      id: "on_the_way", 
      title: "On the Way", 
      description: "Your order is being delivered",
      icon: Truck,
      completed: ["on_the_way", "delivered"].includes(status)
    },
    { 
      id: "delivered", 
      title: "Delivered", 
      description: "Enjoy your premium coffee!",
      icon: CheckCircle,
      completed: status === "delivered"
    }
  ];

  const getStatusColor = (stepStatus: string) => {
    switch (stepStatus) {
      case "delivered": return "text-green-600";
      case "on_the_way": return "text-blue-600";
      case "preparing": return "text-amber-600";
      case "confirmed": return "text-purple-600";
      default: return "text-coffee-600";
    }
  };

  const getStatusBadge = (orderStatus: string) => {
    const statusConfig = {
      pending: { label: "Pending", class: "bg-gray-500" },
      confirmed: { label: "Confirmed", class: "bg-purple-500" },
      preparing: { label: "Preparing", class: "bg-amber-500" },
      on_the_way: { label: "On the Way", class: "bg-blue-500" },
      delivered: { label: "Delivered", class: "bg-green-500" },
      cancelled: { label: "Cancelled", class: "bg-red-500" }
    };
    
    const config = statusConfig[orderStatus as keyof typeof statusConfig] || statusConfig.pending;
    return <Badge className={`${config.class} text-white font-bold`}>{config.label}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Order Status Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="font-luxury text-xl text-coffee-800">
              Order #{orderId.slice(-8)}
            </CardTitle>
            {getStatusBadge(status)}
          </div>
          <div className="flex items-center space-x-4 text-sm text-coffee-600">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span>Estimated: {estimatedTime || "30-45 min"}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              <span>Live Tracking Active</span>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Live Map Placeholder */}
      {status === "on_the_way" && currentLocation && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg text-coffee-800">
              <Navigation className="w-5 h-5 mr-2 text-blue-600" />
              Live Location
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 text-center">
              <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-3 animate-bounce" />
              <h4 className="font-bold text-blue-800 mb-2">Your order is on the way!</h4>
              <p className="text-blue-700 mb-3">{currentLocation.address}</p>
              <div className="flex items-center justify-center space-x-4 text-sm">
                <span className="bg-blue-100 px-3 py-1 rounded-full text-blue-800 font-medium">
                  Updated: {currentTime.toLocaleTimeString()}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Delivery Person Info */}
      {status === "on_the_way" && deliveryBoyName && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg text-coffee-800">
              <User className="w-5 h-5 mr-2" />
              Delivery Partner
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-coffee-800">{deliveryBoyName}</h4>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 mr-1" />
                    <span className="text-sm text-coffee-600">4.8 • 500+ deliveries</span>
                  </div>
                </div>
              </div>
              {deliveryBoyPhone && (
                <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white">
                  <Phone className="w-4 h-4 mr-2" />
                  Call
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tracking Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-coffee-800">Order Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {trackingSteps.map((step, index) => (
              <motion.div
                key={step.id}
                className="flex items-start space-x-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={`relative flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  step.completed 
                    ? 'bg-green-500 border-green-500 text-white' 
                    : status === step.id
                    ? 'bg-amber-500 border-amber-500 text-white animate-pulse'
                    : 'bg-gray-200 border-gray-300 text-gray-500'
                }`}>
                  <step.icon className="w-5 h-5" />
                  {index < trackingSteps.length - 1 && (
                    <div className={`absolute top-10 left-1/2 transform -translate-x-1/2 w-0.5 h-8 ${
                      step.completed ? 'bg-green-500' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
                <div className="flex-1 pb-8">
                  <h4 className={`font-semibold ${step.completed ? 'text-green-700' : status === step.id ? 'text-amber-700' : 'text-gray-500'}`}>
                    {step.title}
                  </h4>
                  <p className={`text-sm ${step.completed ? 'text-green-600' : status === step.id ? 'text-amber-600' : 'text-gray-400'}`}>
                    {step.description}
                  </p>
                  {status === step.id && (
                    <Badge variant="secondary" className="mt-2 text-xs">
                      Current Status
                    </Badge>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}