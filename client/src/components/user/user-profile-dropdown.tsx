import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, 
  Heart, 
  ShoppingBag, 
  MapPin, 
  Settings, 
  LogOut, 
  Crown,
  Star,
  Gift,
  CreditCard
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/use-auth";
import { Link } from "wouter";

export function UserProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  if (!user) return null;

  const getMembershipBadge = (tier: string) => {
    if (tier === "golden7star") {
      return (
        <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-yellow-900 font-bold">
          <Crown className="w-3 h-3 mr-1" />
          Golden 7★
        </Badge>
      );
    }
    return (
      <Badge variant="secondary" className="text-coffee-700">
        <Star className="w-3 h-3 mr-1" />
        Regular
      </Badge>
    );
  };

  const menuItems = [
    { icon: User, label: "Profile", href: "/profile" },
    { icon: Heart, label: "Wishlist", href: "/wishlist", badge: "3" },
    { icon: ShoppingBag, label: "Orders", href: "/orders" },
    { icon: MapPin, label: "Track Order", href: "/track-order" },
    { icon: Gift, label: "Offers", href: "/offers", badge: "New" },
    { icon: CreditCard, label: "Payments", href: "/payments" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  return (
    <div className="relative">
      <Button
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 hover:bg-coffee-100 rounded-full transition-colors"
      >
        <Avatar className="w-8 h-8">
          <AvatarImage src={user.profileImageUrl} alt={user.fullName} />
          <AvatarFallback className="bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold">
            {user.fullName.split(' ').map(n => n[0]).join('').toUpperCase()}
          </AvatarFallback>
        </Avatar>
        {user.membershipTier === "golden7star" && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
            <Crown className="w-2 h-2 text-yellow-900" />
          </div>
        )}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Dropdown */}
            <motion.div
              className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-2xl border border-coffee-200 z-50 overflow-hidden"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              {/* User Info Header */}
              <div className="p-4 bg-gradient-to-r from-coffee-800 to-coffee-900 text-white">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={user.profileImageUrl} alt={user.fullName} />
                    <AvatarFallback className="bg-amber-500 text-white font-bold text-lg">
                      {user.fullName.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{user.fullName}</h3>
                    <p className="text-coffee-200 text-sm">{user.email}</p>
                    <div className="mt-1">
                      {getMembershipBadge(user.membershipTier || "regular")}
                    </div>
                  </div>
                </div>
                
                {/* Points & Spent */}
                <div className="flex justify-between mt-3 text-sm">
                  <div className="text-center">
                    <div className="font-bold text-amber-300">{user.pointsBalance || 0}</div>
                    <div className="text-coffee-200">Points</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-amber-300">₹{user.totalSpent || "0"}</div>
                    <div className="text-coffee-200">Total Spent</div>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="py-2">
                {menuItems.map((item, index) => (
                  <Link key={index} href={item.href}>
                    <motion.div
                      className="flex items-center justify-between px-4 py-3 hover:bg-coffee-50 cursor-pointer transition-colors"
                      whileHover={{ x: 4 }}
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="flex items-center space-x-3">
                        <item.icon className="w-5 h-5 text-coffee-600" />
                        <span className="font-medium text-coffee-800">{item.label}</span>
                      </div>
                      {item.badge && (
                        <Badge variant="secondary" className="text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </motion.div>
                  </Link>
                ))}
              </div>

              <Separator />

              {/* Logout */}
              <motion.button
                className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-red-50 text-red-600 transition-colors"
                whileHover={{ x: 4 }}
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Sign Out</span>
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}