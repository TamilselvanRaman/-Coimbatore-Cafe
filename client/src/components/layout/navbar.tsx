import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, User, Menu, X, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/use-auth";
import { useCart } from "@/hooks/use-cart";

export function Navbar() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Menu", href: "/menu" },
    { label: "About", href: "/#about" },
    { label: "Contact", href: "/#contact" },
  ];

  // totalItems already defined above

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-coffee-100"
          : "bg-white/10 backdrop-blur-sm"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <motion.div 
              className="flex items-center space-x-3 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-600 to-amber-800 flex items-center justify-center">
                <Coffee className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`font-luxury text-xl font-bold transition-colors ${
                  isScrolled ? "text-coffee-800" : "text-white"
                }`}>
                  Coimbatore Cafe
                </h1>
                <p className={`text-sm transition-colors ${
                  isScrolled ? "text-coffee-600" : "text-coffee-100"
                }`}>
                  Premium Coffee Experience
                </p>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <motion.a
                  className={`transition-colors hover:text-amber-500 ${
                    isScrolled ? "text-coffee-700" : "text-white"
                  } ${location === item.href ? "text-amber-500 font-semibold" : ""}`}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  {item.label}
                </motion.a>
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Link href="/cart">
              <motion.div
                className="relative cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ShoppingCart className={`w-6 h-6 transition-colors ${
                  isScrolled ? "text-coffee-700" : "text-white"
                }`} />
                {totalItems > 0 && (
                  <Badge 
                    className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center bg-amber-500 text-coffee-900 text-xs font-bold animate-pulse"
                  >
                    {totalItems}
                  </Badge>
                )}
              </motion.div>
            </Link>

            {/* User Menu */}
            {user ? (
              <div className="hidden md:flex items-center space-x-2">
                <Link href="/profile">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className={`transition-colors ${
                      isScrolled ? "text-coffee-700 hover:text-amber-500" : "text-white hover:text-amber-200"
                    }`}
                  >
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={logout}
                  className={`transition-colors ${
                    isScrolled ? "text-coffee-700 hover:text-amber-500" : "text-white hover:text-amber-200"
                  }`}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Link href="/auth/login">
                <Button 
                  className="bg-gradient-to-r from-amber-500 to-amber-600 text-coffee-900 font-semibold hover:from-amber-600 hover:to-amber-700 shadow-lg hover:shadow-amber-500/25 transition-all duration-300"
                >
                  Login
                </Button>
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              className={`md:hidden transition-colors ${
                isScrolled ? "text-coffee-700" : "text-white"
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden mt-4 p-4 bg-white/95 backdrop-blur-md rounded-xl shadow-lg"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-4">
                {navItems.map((item) => (
                  <Link key={item.href} href={item.href}>
                    <a
                      className="block text-coffee-700 hover:text-amber-500 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  </Link>
                ))}
                {user ? (
                  <>
                    <Link href="/profile">
                      <a
                        className="block text-coffee-700 hover:text-amber-500 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Profile
                      </a>
                    </Link>
                    <button
                      className="block w-full text-left text-coffee-700 hover:text-amber-500 transition-colors"
                      onClick={() => {
                        logout();
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link href="/auth/login">
                    <a
                      className="block text-coffee-700 hover:text-amber-500 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Login
                    </a>
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
