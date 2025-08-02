import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { MenuCategoryTabs } from "@/components/menu/menu-category-tabs";
import { MenuSection } from "@/components/menu/menu-section";
import { CartSidebar } from "@/components/cart/cart-sidebar";
import { ScrollReveal } from "@/components/animated/scroll-reveal";
import { Search, Filter, Coffee, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { menuData, snacksData, getAllMenuItems } from "@/data/menuData";

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState("Classic Coffees");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showSpecialOnly, setShowSpecialOnly] = useState(false);

  const categories = [...Object.keys(menuData), "Snacks & Desserts"];
  const allItems = getAllMenuItems();

  const getFilteredItems = () => {
    let items;

    if (activeCategory === "Snacks & Desserts") {
      items = snacksData;
    } else {
      const categoryKey = activeCategory.toLowerCase().replace(" ", "-");
      items = menuData[activeCategory] || [];
    }

    // Apply search filter
    if (searchQuery) {
      items = items.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply special filter
    if (showSpecialOnly) {
      items = items.filter(item => item.isSpecial);
    }

    return items;
  };

  const filteredItems = getFilteredItems();
  const specialCount = allItems.filter(item => item.isSpecial).length;

  return (
    <div className="min-h-screen bg-coffee-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-coffee-800 to-coffee-900 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <ScrollReveal>
            <div className="text-center text-white">
              <motion.h1 
                className="font-luxury text-5xl lg:text-6xl font-bold mb-6"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Our Premium <span className="text-amber-400">Menu</span>
              </motion.h1>
              <motion.p 
                className="text-xl text-coffee-200 max-w-3xl mx-auto mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Explore our carefully curated selection of premium coffees, traditional South Indian specialties, and artisanal treats.
              </motion.p>
              
              {/* Menu Stats */}
              <motion.div 
                className="flex justify-center space-x-8 mt-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-400">{allItems.length}+</div>
                  <div className="text-coffee-200">Menu Items</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-400">{specialCount}</div>
                  <div className="text-coffee-200">Signature Specials</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-400">{categories.length}</div>
                  <div className="text-coffee-200">Categories</div>
                </div>
              </motion.div>
            </div>
          </ScrollReveal>
        </div>
        
        {/* Floating elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-4 h-4 bg-amber-400/30 rounded-full animate-ping"></div>
          <div className="absolute top-40 right-20 w-6 h-6 bg-coffee-300/20 rounded-full animate-pulse"></div>
          <div className="absolute bottom-32 left-1/4 w-3 h-3 bg-amber-500/40 rounded-full animate-bounce"></div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white border-b border-coffee-100">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-coffee-400" />
              <Input
                type="text"
                placeholder="Search menu items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-coffee-200 focus:border-amber-500 focus:ring-amber-500"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center space-x-4">
              <Button
                variant={showSpecialOnly ? "default" : "outline"}
                onClick={() => setShowSpecialOnly(!showSpecialOnly)}
                className={showSpecialOnly 
                  ? "bg-amber-500 text-coffee-900 hover:bg-amber-600" 
                  : "border-amber-200 text-amber-600 hover:bg-amber-50"
                }
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Specials Only
                {showSpecialOnly && (
                  <Badge variant="secondary" className="ml-2 bg-white text-amber-600">
                    {specialCount}
                  </Badge>
                )}
              </Button>
              
              {searchQuery && (
                <Button
                  variant="ghost"
                  onClick={() => setSearchQuery("")}
                  className="text-coffee-600 hover:text-coffee-800"
                >
                  Clear Search
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Menu Content */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          {/* Category Tabs */}
          <MenuCategoryTabs 
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />

          {/* Results Info */}
          <div className="flex items-center justify-between mb-8">
            <div className="text-coffee-600">
              {searchQuery ? (
                <span>
                  Found <strong>{filteredItems.length}</strong> results for "{searchQuery}"
                  {activeCategory !== "All" && ` in ${activeCategory}`}
                </span>
              ) : (
                <span>
                  Showing <strong>{filteredItems.length}</strong> items in <strong>{activeCategory}</strong>
                </span>
              )}
            </div>
            
            {filteredItems.length > 0 && (
              <div className="text-sm text-coffee-500">
                Prices starting from ₹{Math.min(...filteredItems.map(item => item.price))}
              </div>
            )}
          </div>

          {/* Menu Items */}
          {filteredItems.length > 0 ? (
            <MenuSection items={filteredItems} category={activeCategory} />
          ) : (
            <ScrollReveal>
              <Card className="max-w-md mx-auto">
                <CardContent className="text-center p-12">
                  <Coffee className="w-16 h-16 text-coffee-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-coffee-800 mb-2">No items found</h3>
                  <p className="text-coffee-600 mb-6">
                    {searchQuery 
                      ? `No items match "${searchQuery}" in ${activeCategory}`
                      : `No items available in ${activeCategory} right now`
                    }
                  </p>
                  {searchQuery && (
                    <Button
                      onClick={() => setSearchQuery("")}
                      className="bg-gradient-to-r from-amber-500 to-amber-600 text-coffee-900 hover:from-amber-600 hover:to-amber-700"
                    >
                      Clear Search
                    </Button>
                  )}
                </CardContent>
              </Card>
            </ScrollReveal>
          )}

          {/* Recommendation Section */}
          {!searchQuery && activeCategory === "Classic Coffees" && (
            <ScrollReveal delay={0.4} className="mt-20">
              <Card className="bg-gradient-to-r from-amber-50 to-amber-100 border-amber-200">
                <CardContent className="p-8 text-center">
                  <Sparkles className="w-12 h-12 text-amber-500 mx-auto mb-4" />
                  <h3 className="font-luxury text-2xl font-bold text-coffee-800 mb-4">
                    Try Our Signature Specials!
                  </h3>
                  <p className="text-coffee-600 mb-6">
                    Don't miss our exclusive South Indian coffee varieties and premium cold brews.
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setActiveCategory("Local Specials")}
                      className="border-amber-300 text-amber-700 hover:bg-amber-200"
                    >
                      Local Specials
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setActiveCategory("Special Drinks")}
                      className="border-amber-300 text-amber-700 hover:bg-amber-200"
                    >
                      Special Drinks
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* Footer */}
      <Footer />
      
      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}
