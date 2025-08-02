import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface MenuCategoryTabsProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function MenuCategoryTabs({ categories, activeCategory, onCategoryChange }: MenuCategoryTabsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-12">
      {categories.map((category) => (
        <motion.div key={category} layout>
          <Button
            variant={activeCategory === category ? "default" : "outline"}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
              activeCategory === category
                ? "bg-gradient-to-r from-amber-500 to-amber-600 text-coffee-900 shadow-lg hover:from-amber-600 hover:to-amber-700"
                : "bg-coffee-100 text-coffee-800 border-coffee-200 hover:bg-coffee-200 hover:border-coffee-300"
            }`}
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </Button>
        </motion.div>
      ))}
    </div>
  );
}
