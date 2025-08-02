import { motion } from "framer-motion";
import { Plus, Minus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartItem as CartItemType } from "@/hooks/use-cart";

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (quantity: number) => void;
  onRemove: () => void;
}

export function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  const formatCustomizations = (customizations?: any) => {
    if (!customizations) return "";
    
    const parts = [];
    if (customizations.size) parts.push(customizations.size);
    if (customizations.strength) parts.push(`Strength: ${customizations.strength}/5`);
    if (customizations.milk) parts.push(`${customizations.milk} milk`);
    if (customizations.temperature) parts.push(customizations.temperature);
    
    return parts.join(", ");
  };

  return (
    <motion.div
      className="flex items-center space-x-4 p-4 border border-coffee-100 rounded-xl bg-coffee-50/50"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <img
        src={item.imageUrl}
        alt={item.name}
        className="w-16 h-16 object-cover rounded-lg shadow-md"
      />
      
      <div className="flex-1">
        <h4 className="font-semibold text-coffee-800">{item.name}</h4>
        {item.customizations && (
          <p className="text-coffee-600 text-sm mt-1">
            {formatCustomizations(item.customizations)}
          </p>
        )}
        
        <div className="flex items-center justify-between mt-3">
          <span className="font-bold text-amber-600">₹{item.price}</span>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              className="w-8 h-8 rounded-full border-coffee-200 hover:bg-coffee-100"
              onClick={() => onUpdateQuantity(item.quantity - 1)}
            >
              <Minus className="w-3 h-3" />
            </Button>
            
            <span className="font-semibold min-w-[2rem] text-center">{item.quantity}</span>
            
            <Button
              variant="outline"
              size="icon"
              className="w-8 h-8 rounded-full border-coffee-200 hover:bg-coffee-100"
              onClick={() => onUpdateQuantity(item.quantity + 1)}
            >
              <Plus className="w-3 h-3" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8 text-red-500 hover:text-red-600 hover:bg-red-50"
              onClick={onRemove}
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
