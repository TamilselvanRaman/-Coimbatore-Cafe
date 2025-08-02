import { motion, AnimatePresence } from "framer-motion";
import { MenuItemCard } from "./menu-item-card";
import { MenuItem } from "@/data/menuData";
import { StaggerContainer, StaggerItem } from "@/components/animated/scroll-reveal";

interface MenuSectionProps {
  items: MenuItem[];
  category: string;
}

export function MenuSection({ items, category }: MenuSectionProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={category}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <StaggerItem key={item.id}>
              <MenuItemCard item={item} delay={index * 0.1} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </motion.div>
    </AnimatePresence>
  );
}
