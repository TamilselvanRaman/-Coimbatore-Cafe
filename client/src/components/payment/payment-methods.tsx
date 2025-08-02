import { Card, CardContent } from "@/components/ui/card";
import { ScrollReveal } from "@/components/animated/scroll-reveal";

export function PaymentMethods() {
  const paymentFeatures = [
    { icon: "fas fa-check-circle", text: "UPI Payments (PhonePe, GooglePay, Paytm)" },
    { icon: "fas fa-check-circle", text: "Credit & Debit Cards" },
    { icon: "fas fa-check-circle", text: "Net Banking" },
    { icon: "fas fa-check-circle", text: "Digital Wallets" },
  ];

  const upiApps = [
    { name: "Google Pay", icon: "fab fa-google-pay", color: "text-blue-500" },
    { name: "PhonePe", icon: "fas fa-mobile-alt", color: "text-purple-500" },
    { name: "Paytm", icon: "fas fa-wallet", color: "text-blue-600" },
  ];

  return (
    <section className="py-20 bg-coffee-800">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal className="text-white">
            <h2 className="font-luxury text-4xl lg:text-5xl font-bold mb-6">
              Secure <span className="text-amber-400">Payments</span>
            </h2>
            <p className="text-xl text-coffee-200 mb-8 leading-relaxed">
              Pay with confidence using our integrated Razorpay payment system. Multiple payment options for your convenience.
            </p>
            
            <div className="space-y-4 mb-8">
              {paymentFeatures.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <i className="fas fa-check-circle text-amber-400"></i>
                  <span>{feature.text}</span>
                </div>
              ))}
            </div>
            
            <button className="bg-gradient-to-r from-amber-500 to-amber-600 text-coffee-900 font-semibold px-8 py-4 rounded-full text-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-lg">
              Start Your Order
              <i className="fas fa-arrow-right ml-2"></i>
            </button>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <Card className="glass-morphism border-coffee-600/30 bg-white/10">
              <CardContent className="p-8 text-center">
                <h3 className="text-white font-luxury text-2xl mb-6">Quick Pay with UPI</h3>
                
                {/* QR Code Display */}
                <div className="bg-white p-6 rounded-2xl mb-6 inline-block">
                  <div className="w-48 h-48 bg-black mx-auto rounded-lg flex items-center justify-center">
                    {/* QR Code placeholder */}
                    <div className="grid grid-cols-8 gap-1">
                      {[...Array(64)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 ${Math.random() > 0.5 ? 'bg-black' : 'bg-white'}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="text-white">
                  <p className="mb-2">UPI ID: <span className="text-amber-400 font-mono">maddydinesh5578@okicici</span></p>
                  <p className="text-sm text-coffee-200">Scan to pay with any UPI app</p>
                </div>
                
                <div className="flex justify-center space-x-6 mt-6">
                  {upiApps.map((app) => (
                    <div key={app.name} className="text-center">
                      <i className={`${app.icon} text-2xl ${app.color}`}></i>
                      <div className="text-xs text-coffee-200 mt-1">{app.name}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
