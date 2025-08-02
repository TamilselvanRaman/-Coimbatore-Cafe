import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Coffee, Gift, Clock, Sparkles } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

export function SessionTracker() {
  const [sessionTime, setSessionTime] = useState(0);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [showOfferPrompt, setShowOfferPrompt] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) return; // Don't track if user is already logged in

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      setSessionTime(elapsed);
      
      // Show login prompt after 4 minutes (240 seconds)
      if (elapsed >= 240 && !showLoginPrompt) {
        setShowLoginPrompt(true);
        trackUserEngagement(elapsed);
      }
      
      // Show special offer after 6 minutes
      if (elapsed >= 360 && !showOfferPrompt) {
        setShowOfferPrompt(true);
      }
    }, 1000);

    // Track page visibility changes
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // User left the page, prepare exit intent tracking
        trackUserExit(sessionTime);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [user, showLoginPrompt, showOfferPrompt, sessionTime]);

  const trackUserEngagement = async (timeSpent: number) => {
    try {
      await fetch('/api/analytics/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionDuration: timeSpent,
          trigger: 'login_prompt',
          ipAddress: await getClientIP(),
          userAgent: navigator.userAgent,
          currentPage: window.location.pathname
        })
      });
    } catch (error) {
      console.error('Analytics tracking failed:', error);
    }
  };

  const trackUserExit = async (timeSpent: number) => {
    if (timeSpent < 60) return; // Only track meaningful sessions
    
    try {
      await fetch('/api/analytics/exit-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionDuration: timeSpent,
          ipAddress: await getClientIP(),
          exitPage: window.location.pathname,
          triggerSmsReminder: timeSpent >= 180 // 3+ minutes
        })
      });
    } catch (error) {
      console.error('Exit tracking failed:', error);
    }
  };

  const getClientIP = async () => {
    try {
      const response = await fetch('/api/get-client-ip');
      const data = await response.json();
      return data.ip;
    } catch {
      return 'unknown';
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (user) return null; // Don't show prompts for logged in users

  return (
    <>
      {/* Login Prompt Modal */}
      <AnimatePresence>
        {showLoginPrompt && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLoginPrompt(false)}
            />
            
            <motion.div
              className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
            >
              <div className="absolute top-4 right-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowLoginPrompt(false)}
                  className="rounded-full p-2"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-6 text-center">
                <Coffee className="w-12 h-12 text-white mx-auto mb-3 animate-bounce" />
                <h3 className="font-luxury text-xl font-bold text-white mb-2">
                  Loving Our Coffee?
                </h3>
                <div className="flex items-center justify-center text-white/90 text-sm">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>You've been browsing for {formatTime(sessionTime)}</span>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="text-center">
                  <h4 className="font-bold text-coffee-800 mb-2">
                    Sign up now to unlock exclusive benefits!
                  </h4>
                  <ul className="text-sm text-coffee-600 space-y-1 text-left max-w-sm mx-auto">
                    <li>✨ 20% off on your first order</li>
                    <li>🚚 Free delivery on orders above ₹299</li>
                    <li>⭐ Early access to new flavors</li>
                    <li>🎁 Birthday special offers</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <Button 
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-coffee-900 font-bold hover:from-amber-600 hover:to-amber-700"
                    onClick={() => {
                      window.location.href = '/auth/register';
                    }}
                  >
                    <Gift className="w-4 h-4 mr-2" />
                    Sign Up for Free Benefits
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full border-coffee-300 text-coffee-700 hover:bg-coffee-50"
                    onClick={() => {
                      window.location.href = '/auth/login';
                    }}
                  >
                    Already have an account? Sign In
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Special Offer Prompt */}
      <AnimatePresence>
        {showOfferPrompt && !showLoginPrompt && (
          <div className="fixed bottom-6 right-6 z-40">
            <motion.div
              initial={{ opacity: 0, x: 100, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.8 }}
              className="bg-white rounded-xl shadow-2xl border-2 border-amber-300 max-w-sm overflow-hidden"
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowOfferPrompt(false)}
                className="absolute top-2 right-2 rounded-full p-1 z-10"
              >
                <X className="w-3 h-3" />
              </Button>

              <div className="bg-gradient-to-r from-amber-400 to-yellow-500 p-4 text-center">
                <Sparkles className="w-8 h-8 text-white mx-auto mb-2 animate-spin" />
                <h4 className="font-bold text-white text-sm">Limited Time Offer!</h4>
              </div>

              <div className="p-4">
                <h5 className="font-bold text-coffee-800 mb-2">Get 25% OFF</h5>
                <p className="text-sm text-coffee-600 mb-3">
                  Your first order when you sign up today!
                </p>
                <Button 
                  size="sm" 
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold"
                  onClick={() => {
                    window.location.href = '/auth/register?offer=25OFF';
                  }}
                >
                  Grab This Deal
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}