import { motion } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollReveal } from "@/components/animated/scroll-reveal";
import { apiRequest } from "@/lib/queryClient";
import { Heart, ShoppingCart, Trash2, Coffee, Star, Plus } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";

export default function Wishlist() {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: wishlistItems, isLoading } = useQuery({
    queryKey: ["/api/wishlist"],
    enabled: !!user,
  });

  const removeFromWishlistMutation = useMutation({
    mutationFn: async (productId: string) => {
      return apiRequest(`/api/wishlist/${productId}`, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/wishlist"] });
      toast({
        title: "Removed from wishlist",
        description: "Item has been removed from your wishlist",
      });
    },
  });

  const handleAddToCart = (item: any) => {
    addToCart(item, 1);
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart`,
    });
  };

  const handleRemoveFromWishlist = (productId: string) => {
    removeFromWishlistMutation.mutate(productId);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-coffee-50 to-cream-100">
        <Navbar />
        <div className="container mx-auto px-6 py-24">
          <div className="text-center">
            <Heart className="w-16 h-16 text-coffee-300 mx-auto mb-4" />
            <h1 className="font-luxury text-3xl font-bold text-coffee-800 mb-4">
              Sign in to view your wishlist
            </h1>
            <p className="text-coffee-600 mb-8">
              Save your favorite coffee items and access them anytime
            </p>
            <Button className="bg-gradient-to-r from-amber-500 to-amber-600 text-coffee-900 font-bold">
              Sign In
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

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
              My <span className="text-premium">Wishlist</span>
            </motion.h1>
            <p className="text-xl text-coffee-600 font-medium">
              Your saved favorite coffee items
            </p>
          </div>
        </ScrollReveal>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-80 bg-coffee-100 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : wishlistItems?.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItems.map((item: any, index: number) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="group relative overflow-hidden border-coffee-200 hover:border-amber-300 transition-all duration-300 hover:shadow-xl">
                  {/* Remove from wishlist button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 z-10 p-2 bg-white/80 hover:bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleRemoveFromWishlist(item.productId)}
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>

                  <div className="aspect-square bg-gradient-to-br from-coffee-100 to-cream-200 flex items-center justify-center relative overflow-hidden">
                    {item.product?.imageUrl ? (
                      <img 
                        src={item.product.imageUrl} 
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Coffee className="w-16 h-16 text-coffee-400" />
                    )}
                    
                    {item.product?.isSpecial && (
                      <Badge className="absolute top-2 left-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-coffee-900 font-bold">
                        <Star className="w-3 h-3 mr-1" />
                        Special
                      </Badge>
                    )}
                  </div>

                  <CardContent className="p-4">
                    <h3 className="font-bold text-coffee-800 mb-2 line-clamp-2">
                      {item.product?.name || "Coffee Item"}
                    </h3>
                    <p className="text-coffee-600 text-sm mb-3 line-clamp-2">
                      {item.product?.description || "Delicious premium coffee"}
                    </p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-2xl font-black text-coffee-900">
                        ₹{item.product?.price || "299"}
                      </div>
                      <div className="flex items-center text-amber-500">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm font-medium ml-1">4.8</span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        onClick={() => handleAddToCart(item.product)}
                        className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 text-coffee-900 font-bold hover:from-amber-600 hover:to-amber-700"
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <ScrollReveal>
            <Card className="max-w-md mx-auto">
              <CardContent className="text-center py-16">
                <Heart className="w-16 h-16 text-coffee-300 mx-auto mb-4" />
                <h3 className="font-bold text-xl text-coffee-800 mb-2">
                  Your wishlist is empty
                </h3>
                <p className="text-coffee-600 mb-6">
                  Start adding your favorite coffee items to save them for later
                </p>
                <Button className="bg-gradient-to-r from-amber-500 to-amber-600 text-coffee-900 font-bold">
                  <Plus className="w-4 h-4 mr-2" />
                  Browse Menu
                </Button>
              </CardContent>
            </Card>
          </ScrollReveal>
        )}
      </div>

      <Footer />
    </div>
  );
}