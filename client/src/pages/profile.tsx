import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollReveal } from "@/components/animated/scroll-reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/use-auth";
import { useCart } from "@/hooks/use-cart";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Coffee, 
  Star, 
  Heart,
  Gift,
  Crown,
  Calendar,
  Edit3,
  Save,
  ShoppingBag
} from "lucide-react";
import { Link, Redirect } from "wouter";

export default function Profile() {
  const { user, loading: authLoading } = useAuth();
  const { cartItems, getTotalItems } = useCart();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: user?.user_metadata?.full_name || "",
    phone: user?.user_metadata?.phone || "",
    address: user?.user_metadata?.address || "",
  });

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

  const handleSaveProfile = () => {
    // TODO: Implement profile update
    setIsEditing(false);
  };

  const membershipLevel = "Gold"; // TODO: Calculate based on order history
  const totalOrders = 23; // TODO: Get from orders
  const favoriteItems = 5; // TODO: Get from wishlist
  const loyaltyPoints = 450; // TODO: Calculate from orders

  return (
    <div className="min-h-screen bg-coffee-50">
      <Navbar />
      
      {/* Profile Header */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-coffee-800 to-coffee-900">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="text-center text-white">
              <motion.div
                className="w-24 h-24 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-6"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <User className="w-12 h-12 text-white" />
              </motion.div>
              
              <motion.h1 
                className="font-luxury text-4xl lg:text-5xl font-bold mb-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Welcome back, {profileData.fullName || "Coffee Lover"}!
              </motion.h1>
              
              <motion.div
                className="flex items-center justify-center space-x-2 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Crown className="w-5 h-5 text-amber-400" />
                <Badge className="bg-amber-500 text-coffee-900 font-semibold">
                  {membershipLevel} Member
                </Badge>
              </motion.div>

              <motion.div 
                className="flex justify-center space-x-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-amber-400">{totalOrders}</div>
                  <div className="text-coffee-200">Total Orders</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-amber-400">{favoriteItems}</div>
                  <div className="text-coffee-200">Favorites</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-amber-400">{loyaltyPoints}</div>
                  <div className="text-coffee-200">Points</div>
                </div>
              </motion.div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Profile Content */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <Tabs defaultValue="profile" className="space-y-8">
            <TabsList className="grid w-full grid-cols-4 bg-white border border-coffee-200">
              <TabsTrigger value="profile" className="data-[state=active]:bg-amber-500 data-[state=active]:text-coffee-900">
                Profile
              </TabsTrigger>
              <TabsTrigger value="orders" className="data-[state=active]:bg-amber-500 data-[state=active]:text-coffee-900">
                Orders
              </TabsTrigger>
              <TabsTrigger value="favorites" className="data-[state=active]:bg-amber-500 data-[state=active]:text-coffee-900">
                Favorites
              </TabsTrigger>
              <TabsTrigger value="rewards" className="data-[state=active]:bg-amber-500 data-[state=active]:text-coffee-900">
                Rewards
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <ScrollReveal>
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center">
                        <User className="w-5 h-5 mr-2" />
                        Profile Information
                      </CardTitle>
                      <Button
                        variant="outline"
                        onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                        className="border-amber-200 text-amber-600 hover:bg-amber-50"
                      >
                        {isEditing ? (
                          <>
                            <Save className="w-4 h-4 mr-2" />
                            Save Changes
                          </>
                        ) : (
                          <>
                            <Edit3 className="w-4 h-4 mr-2" />
                            Edit Profile
                          </>
                        )}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={user?.email || ""}
                          disabled
                          className="bg-coffee-50"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          type="text"
                          value={profileData.fullName}
                          onChange={(e) => setProfileData(prev => ({ ...prev, fullName: e.target.value }))}
                          disabled={!isEditing}
                          className={!isEditing ? "bg-coffee-50" : ""}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={profileData.phone}
                          onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                          disabled={!isEditing}
                          className={!isEditing ? "bg-coffee-50" : ""}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="joinDate">Member Since</Label>
                        <Input
                          id="joinDate"
                          type="text"
                          value={new Date(user?.created_at || "").toLocaleDateString()}
                          disabled
                          className="bg-coffee-50"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="address">Delivery Address</Label>
                      <Input
                        id="address"
                        type="text"
                        value={profileData.address}
                        onChange={(e) => setProfileData(prev => ({ ...prev, address: e.target.value }))}
                        disabled={!isEditing}
                        className={!isEditing ? "bg-coffee-50" : ""}
                        placeholder="Enter your complete delivery address"
                      />
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            </TabsContent>

            {/* Orders Tab */}
            <TabsContent value="orders">
              <ScrollReveal>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <ShoppingBag className="w-5 h-5 mr-2" />
                      Order History
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <Coffee className="w-16 h-16 text-coffee-300 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-coffee-800 mb-2">No orders yet</h3>
                      <p className="text-coffee-600 mb-6">Start your coffee journey with us!</p>
                      <Link href="/menu">
                        <Button className="bg-gradient-to-r from-amber-500 to-amber-600 text-coffee-900 hover:from-amber-600 hover:to-amber-700">
                          Browse Menu
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            </TabsContent>

            {/* Favorites Tab */}
            <TabsContent value="favorites">
              <ScrollReveal>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Heart className="w-5 h-5 mr-2" />
                      Favorite Items
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <Heart className="w-16 h-16 text-coffee-300 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-coffee-800 mb-2">No favorites yet</h3>
                      <p className="text-coffee-600 mb-6">Add items to your favorites for quick access!</p>
                      <Link href="/menu">
                        <Button className="bg-gradient-to-r from-amber-500 to-amber-600 text-coffee-900 hover:from-amber-600 hover:to-amber-700">
                          Explore Menu
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            </TabsContent>

            {/* Rewards Tab */}
            <TabsContent value="rewards">
              <ScrollReveal>
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Gift className="w-5 h-5 mr-2" />
                        Loyalty Points
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-8">
                        <motion.div
                          className="w-32 h-32 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-6"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        >
                          <div className="text-center">
                            <div className="text-3xl font-bold text-white">{loyaltyPoints}</div>
                            <div className="text-amber-100 text-sm">Points</div>
                          </div>
                        </motion.div>
                        
                        <h3 className="text-xl font-semibold text-coffee-800 mb-2">Earn & Redeem Points</h3>
                        <p className="text-coffee-600 mb-6">
                          Earn 1 point for every ₹10 spent. Redeem 100 points for ₹10 off!
                        </p>
                        
                        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                          <div className="text-coffee-800 font-semibold mb-2">Next Reward at 500 points</div>
                          <div className="w-full bg-amber-200 rounded-full h-3 mb-2">
                            <div 
                              className="bg-gradient-to-r from-amber-500 to-amber-600 h-3 rounded-full transition-all duration-500"
                              style={{ width: `${(loyaltyPoints / 500) * 100}%` }}
                            ></div>
                          </div>
                          <div className="text-coffee-600 text-sm">
                            {500 - loyaltyPoints} points to go
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Available Rewards</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-8">
                        <Gift className="w-16 h-16 text-coffee-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-coffee-800 mb-2">No rewards available</h3>
                        <p className="text-coffee-600">Keep earning points to unlock exclusive rewards!</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </ScrollReveal>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
}
