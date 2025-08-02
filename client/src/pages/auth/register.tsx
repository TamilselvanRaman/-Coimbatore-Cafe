import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SocialLogin } from "@/components/auth/social-login";
import { SessionTracker } from "@/components/engagement/session-tracker";
import { useAuth } from "@/hooks/use-auth";
import { ArrowLeft } from "lucide-react";

export default function Register() {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const { googleLogin, appleLogin, register, isRegisterPending } = useAuth();

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  const handleAppleLogin = async () => {
    try {
      await appleLogin();
    } catch (error) {
      console.error("Apple login failed:", error);
    }
  };

  const handleEmailRegister = () => {
    setShowEmailForm(true);
  };

  if (showEmailForm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-coffee-50 to-cream-100 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <Button
            variant="ghost"
            onClick={() => setShowEmailForm(false)}
            className="mb-4 text-coffee-600 hover:text-coffee-800"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Social Registration
          </Button>
          
          <Card className="shadow-2xl border-coffee-200">
            <CardHeader className="text-center">
              <CardTitle className="font-luxury text-2xl text-coffee-800">Create Account</CardTitle>
              <p className="text-coffee-600">Join Coimbatore Cafe today</p>
            </CardHeader>
            <CardContent>
              <div className="text-center text-coffee-600">
                Email registration form would be implemented here with proper authentication backend.
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-coffee-50 to-cream-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <SocialLogin
          onGoogleLogin={handleGoogleLogin}
          onAppleLogin={handleAppleLogin}
          onEmailLogin={handleEmailRegister}
          isLoading={isRegisterPending}
          isRegister={true}
        />
        
        <div className="text-center mt-6">
          <p className="text-coffee-600">
            Already have an account?{" "}
            <Link href="/auth/login">
              <span className="text-amber-600 hover:text-amber-700 font-semibold cursor-pointer">
                Sign in here
              </span>
            </Link>
          </p>
        </div>
      </motion.div>
      
      <SessionTracker />
    </div>
  );
}