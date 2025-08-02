import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/use-auth";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useToast } from "@/hooks/use-toast";
import { Coffee, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { FloatingElement, CoffeeBean } from "@/components/animated/floating-elements";

export default function Login() {
  const [, setLocation] = useLocation();
  const { login, loading, error, clearError } = useAuth();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    if (!formData.email || !formData.password) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      await login(formData.email, formData.password);
      toast({
        title: "Welcome back!",
        description: "You have been successfully logged in.",
      });
      setLocation("/");
    } catch (err) {
      toast({
        title: "Login Failed",
        description: error || "Invalid email or password. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) clearError();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-coffee-800 via-coffee-700 to-coffee-900 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <CoffeeBean className="absolute top-20 left-10" size="sm" />
        <CoffeeBean className="absolute top-40 right-20" size="md" />
        <CoffeeBean className="absolute bottom-32 left-1/4" size="lg" />
        <CoffeeBean className="absolute top-60 right-1/3" size="sm" />
        <CoffeeBean className="absolute bottom-20 right-1/4" size="md" />
      </div>

      <motion.div
        className="w-full max-w-md relative z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Logo */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="w-16 h-16 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Coffee className="w-8 h-8 text-white" />
          </div>
          <h1 className="font-luxury text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-coffee-200">Sign in to your Coimbatore Cafe account</p>
        </motion.div>

        {/* Login Card */}
        <Card className="glass-morphism bg-white/10 border-white/20 backdrop-blur-md">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold text-white">Sign In</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white font-medium">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-coffee-300" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="Enter your email"
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-coffee-300 focus:border-amber-500 focus:ring-amber-500"
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-coffee-300" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    placeholder="Enter your password"
                    className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-coffee-300 focus:border-amber-500 focus:ring-amber-500"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-coffee-300 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <motion.div
                  className="bg-red-500/20 border border-red-500/30 rounded-lg p-3"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-red-200 text-sm">{error}</p>
                </motion.div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-coffee-900 font-bold py-3 rounded-full hover:from-amber-600 hover:to-amber-700 shadow-lg hover:shadow-amber-500/25 transition-all duration-300"
              >
                {loading ? (
                  <>
                    <LoadingSpinner size="sm" className="mr-2" />
                    Signing In...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <Separator className="bg-white/20" />
              <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-coffee-800 px-3 text-coffee-300 text-sm">
                or
              </span>
            </div>

            {/* Sign Up Link */}
            <div className="text-center">
              <p className="text-coffee-200 mb-4">Don't have an account?</p>
              <Link href="/auth/register">
                <Button
                  variant="outline"
                  className="w-full border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300"
                >
                  Create New Account
                </Button>
              </Link>
            </div>

            {/* Back to Home */}
            <div className="text-center mt-6">
              <Link href="/">
                <Button
                  variant="ghost"
                  className="text-coffee-200 hover:text-white hover:bg-white/10 transition-all duration-300"
                >
                  ← Back to Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Demo Credentials */}
        <motion.div
          className="mt-6 p-4 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-coffee-200 text-sm text-center mb-2">Demo Credentials:</p>
          <div className="text-coffee-300 text-xs text-center space-y-1">
            <p>Email: demo@coimbatorecafe.com</p>
            <p>Password: demo123</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating review card */}
      <FloatingElement 
        className="absolute bottom-20 right-20 max-w-xs hidden lg:block"
        duration={8}
        intensity={15}
      >
        <Card className="glass-morphism bg-white/10 border-white/20">
          <CardContent className="p-4 text-white">
            <div className="flex items-center space-x-2 mb-2">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Coffee key={i} className="w-3 h-3 fill-current" />
                ))}
              </div>
              <span className="text-sm">5.0</span>
            </div>
            <p className="text-sm">"Amazing coffee and seamless ordering experience!"</p>
            <div className="text-xs text-coffee-200 mt-2">- Sarah M.</div>
          </CardContent>
        </Card>
      </FloatingElement>
    </div>
  );
}
