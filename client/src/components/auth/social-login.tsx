import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { FaGoogle, FaApple } from "react-icons/fa";
import { Mail, Phone, Lock } from "lucide-react";

interface SocialLoginProps {
  onGoogleLogin: () => void;
  onAppleLogin: () => void;
  onEmailLogin: () => void;
  isLoading?: boolean;
}

export function SocialLogin({ onGoogleLogin, onAppleLogin, onEmailLogin, isLoading }: SocialLoginProps) {
  return (
    <Card className="w-full max-w-md mx-auto shadow-2xl border-coffee-200">
      <CardHeader className="text-center pb-4">
        <CardTitle className="font-luxury text-2xl text-coffee-800">
          Welcome to Coimbatore Cafe
        </CardTitle>
        <p className="text-coffee-600 font-medium">
          Sign in to unlock exclusive offers & track your orders
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Social Login Buttons */}
        <div className="space-y-3">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              onClick={onGoogleLogin}
              disabled={isLoading}
              className="w-full h-12 bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 shadow-lg"
            >
              <FaGoogle className="w-5 h-5 mr-3 text-red-500" />
              <span className="font-medium">Continue with Google</span>
            </Button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              onClick={onAppleLogin}
              disabled={isLoading}
              className="w-full h-12 bg-black text-white hover:bg-gray-800 transition-all duration-300 shadow-lg"
            >
              <FaApple className="w-5 h-5 mr-3" />
              <span className="font-medium">Continue with Apple</span>
            </Button>
          </motion.div>
        </div>

        <div className="relative my-6">
          <Separator />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="bg-white px-4 text-coffee-500 font-medium">OR</span>
          </div>
        </div>

        {/* Email Login Button */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            onClick={onEmailLogin}
            disabled={isLoading}
            className="w-full h-12 bg-gradient-to-r from-amber-500 to-amber-600 text-coffee-900 font-bold hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-lg"
          >
            <Mail className="w-5 h-5 mr-3" />
            <span>Continue with Email</span>
          </Button>
        </motion.div>

        {/* Benefits Preview */}
        <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-cream-100 rounded-lg border border-amber-200">
          <h4 className="font-semibold text-coffee-800 mb-2 flex items-center">
            <Lock className="w-4 h-4 mr-2 text-amber-600" />
            Member Benefits
          </h4>
          <ul className="text-sm text-coffee-700 space-y-1">
            <li>• Exclusive offers & discounts</li>
            <li>• Live order tracking with GPS</li>
            <li>• Golden 7-Star membership program</li>
            <li>• Wishlist & personalized recommendations</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}