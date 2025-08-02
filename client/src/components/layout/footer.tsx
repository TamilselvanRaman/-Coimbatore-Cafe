import { Coffee, MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter } from "lucide-react";
import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-coffee-900 text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-500 to-amber-700 flex items-center justify-center">
                <Coffee className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-luxury text-xl font-bold">Coimbatore Cafe</h3>
                <p className="text-coffee-300 text-sm">Premium Coffee Experience</p>
              </div>
            </div>
            <p className="text-coffee-300 leading-relaxed">
              Crafting exceptional coffee experiences with traditional South Indian flavors and modern innovation.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-coffee-300">
              <li>
                <Link href="/menu">
                  <a className="hover:text-amber-400 transition-colors">Menu</a>
                </Link>
              </li>
              <li>
                <Link href="/#about">
                  <a className="hover:text-amber-400 transition-colors">About Us</a>
                </Link>
              </li>
              <li>
                <Link href="/#contact">
                  <a className="hover:text-amber-400 transition-colors">Contact</a>
                </Link>
              </li>
              <li>
                <Link href="/orders">
                  <a className="hover:text-amber-400 transition-colors">Track Order</a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Services</h4>
            <ul className="space-y-2 text-coffee-300">
              <li>
                <a href="#" className="hover:text-amber-400 transition-colors">Online Ordering</a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-400 transition-colors">Delivery Tracking</a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-400 transition-colors">Custom Drinks</a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-400 transition-colors">Catering</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact Info</h4>
            <div className="space-y-3 text-coffee-300">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-amber-400" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-amber-400" />
                <span>hello@coimbatorecafe.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>Coimbatore, Tamil Nadu</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-amber-400" />
                <div>
                  <div>Mon-Sun: 7:00 AM - 11:00 PM</div>
                  <div className="text-sm">24/7 Online Delivery</div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-6">
              <h5 className="font-semibold mb-3">Follow Us</h5>
              <div className="flex space-x-3">
                <a
                  href="#"
                  className="w-10 h-10 bg-coffee-700 rounded-full flex items-center justify-center text-white hover:bg-amber-500 transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-coffee-700 rounded-full flex items-center justify-center text-white hover:bg-amber-500 transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-coffee-700 rounded-full flex items-center justify-center text-white hover:bg-amber-500 transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-coffee-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-coffee-300 mb-4 md:mb-0">
            © 2024 Razerbills Groups Private Ltd. All rights reserved.
          </p>
          <div className="flex space-x-6 text-coffee-300">
            <a href="#" className="hover:text-amber-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-amber-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-amber-400 transition-colors">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
