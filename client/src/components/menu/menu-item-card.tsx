import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Star, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MenuItem } from "@/data/menuData";
import { useCart } from "@/hooks/use-cart";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

interface MenuItemCardProps {
  item: MenuItem;
  delay?: number;
}

export function MenuItemCard({ item, delay = 0 }: MenuItemCardProps) {
  const { addItem, loading } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      await addItem(item.id, 1);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    } catch (error) {
      console.error("Failed to add item to cart:", error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <motion.div
      className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.02]"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -8 }}
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <motion.img
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Special Badge */}
        {item.isSpecial && (
          <Badge className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-amber-600 text-coffee-900 font-semibold">
            <Star className="w-3 h-3 mr-1" />
            Special
          </Badge>
        )}
        
        {/* Wishlist Button */}
        <motion.button
          className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-coffee-600 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Heart className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-luxury text-xl font-bold text-coffee-800 mb-2 group-hover:text-amber-600 transition-colors">
          {item.name}
        </h3>
        
        <p className="text-coffee-600 mb-4 line-clamp-2 group-hover:text-coffee-700 transition-colors">
          {item.description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-amber-600">₹{item.price}</span>
          
          <Button
            onClick={handleAddToCart}
            disabled={isAdding || loading}
            className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
              showSuccess
                ? "bg-green-500 hover:bg-green-600 text-white"
                : "bg-gradient-to-r from-amber-500 to-amber-600 text-coffee-900 hover:from-amber-600 hover:to-amber-700 shadow-lg hover:shadow-amber-500/25"
            }`}
          >
            {isAdding ? (
              <LoadingSpinner size="sm" className="mr-1" />
            ) : showSuccess ? (
              "Added!"
            ) : (
              <>
                <Plus className="w-4 h-4 mr-1" />
                Add
              </>
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
