import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Crown, 
  Star, 
  Gift, 
  Truck, 
  Coffee, 
  Heart,
  Zap,
  Award,
  Sparkles
} from "lucide-react";

interface GoldenMembershipProps {
  currentSpent: number;
  membershipTier: string;
  pointsBalance: number;
}

export function GoldenMembership({ currentSpent, membershipTier, pointsBalance }: GoldenMembershipProps) {
  const goldenThreshold = 10000; // ₹10,000 to become Golden 7-Star
  const progressPercentage = Math.min((currentSpent / goldenThreshold) * 100, 100);
  const remainingAmount = Math.max(goldenThreshold - currentSpent, 0);
  
  const isGoldenMember = membershipTier === "golden7star";

  const benefits = [
    { icon: Gift, title: "30% off on all orders", description: "Exclusive discount on every purchase" },
    { icon: Truck, title: "Free premium delivery", description: "No delivery charges ever" },
    { icon: Coffee, title: "Priority brewing", description: "Your orders get prepared first" },
    { icon: Heart, title: "Birthday specials", description: "Free cake & special offers" },
    { icon: Zap, title: "Express checkout", description: "Skip queues with VIP access" },
    { icon: Award, title: "Exclusive events", description: "Coffee tasting & workshops" },
  ];

  if (isGoldenMember) {
    return (
      <Card className="relative overflow-hidden bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 border-2 border-yellow-300">
        {/* Golden Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-4 text-yellow-400">
            <Crown className="w-20 h-20" />
          </div>
          <div className="absolute bottom-4 left-4 text-yellow-400">
            <Sparkles className="w-16 h-16" />
          </div>
        </div>

        <CardHeader className="relative z-10">
          <div className="flex items-center justify-between">
            <CardTitle className="font-luxury text-2xl text-yellow-800 flex items-center">
              <Crown className="w-7 h-7 mr-3 text-yellow-600" />
              Golden 7-Star Member
            </CardTitle>
            <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-yellow-900 font-bold px-3 py-1">
              PREMIUM
            </Badge>
          </div>
          <p className="text-yellow-700 font-medium">
            Congratulations! You're part of our exclusive Golden 7-Star program
          </p>
        </CardHeader>

        <CardContent className="relative z-10 space-y-6">
          {/* Current Points */}
          <div className="bg-white/60 rounded-lg p-4 border border-yellow-200">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-yellow-800">Available Points</h4>
                <div className="flex items-center mt-1">
                  <Star className="w-5 h-5 text-yellow-500 mr-2" />
                  <span className="text-2xl font-black text-yellow-700">{pointsBalance}</span>
                </div>
              </div>
              <Button className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-yellow-900 font-bold">
                Redeem Points
              </Button>
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-2 gap-3">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="bg-white/60 rounded-lg p-3 border border-yellow-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <benefit.icon className="w-5 h-5 text-yellow-600 mb-2" />
                <h5 className="font-semibold text-yellow-800 text-sm">{benefit.title}</h5>
                <p className="text-yellow-700 text-xs">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="relative overflow-hidden border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50">
      <CardHeader>
        <CardTitle className="font-luxury text-xl text-coffee-800 flex items-center">
          <Crown className="w-6 h-6 mr-2 text-amber-600" />
          Golden 7-Star Membership
        </CardTitle>
        <p className="text-coffee-600">
          Unlock exclusive benefits with premium membership
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Progress to Golden */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="font-medium text-coffee-700">Progress to Golden</span>
            <span className="font-bold text-amber-600">₹{currentSpent.toFixed(0)} / ₹{goldenThreshold}</span>
          </div>
          <Progress value={progressPercentage} className="h-3 bg-amber-100">
            <div className="h-full bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full transition-all duration-500" />
          </Progress>
          <p className="text-sm text-coffee-600">
            Spend ₹{remainingAmount.toFixed(0)} more to unlock Golden 7-Star benefits!
          </p>
        </div>

        {/* Benefits Preview */}
        <div className="space-y-3">
          <h4 className="font-semibold text-coffee-800 flex items-center">
            <Sparkles className="w-4 h-4 mr-2 text-amber-500" />
            Golden Member Benefits
          </h4>
          <div className="grid grid-cols-1 gap-2">
            {benefits.slice(0, 3).map((benefit, index) => (
              <div key={index} className="flex items-center space-x-3 p-2 bg-white/60 rounded border border-amber-200">
                <benefit.icon className="w-4 h-4 text-amber-600" />
                <div className="flex-1">
                  <span className="font-medium text-coffee-800 text-sm">{benefit.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Button className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 text-coffee-900 font-bold hover:from-amber-600 hover:to-yellow-600">
          <Crown className="w-4 h-4 mr-2" />
          Upgrade to Golden 7-Star
        </Button>
      </CardContent>
    </Card>
  );
}