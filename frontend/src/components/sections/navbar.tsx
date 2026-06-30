"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Heart, ShoppingCart, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { CartDrawer } from "@/components/sections/cart-drawer";

export const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [cartOpen, setCartOpen] = React.useState(false);

  // Zustand dynamic items loading
  const cartItems = useCartStore((state) => state.items);
  const wishlistItems = useWishlistStore((state) => state.items);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const wishlistCount = wishlistItems.length;

  // Force mounted state to prevent hydration mismatch for theme buttons
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks = [
    { name: "Tính năng", href: "#features" },
    { name: "Sản phẩm", href: "#products" },
    { name: "Thông số", href: "#specifications" },
    { name: "Đánh giá", href: "#reviews" },
    { name: "Hỏi đáp", href: "#faq" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/70 backdrop-blur-md transition-all duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="#" className="flex items-center gap-2">
              <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
                ROBOCLEAN
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-text-secondary hover:text-brand-primary font-medium text-sm transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {/* Theme Toggle */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-xl text-text-secondary hover:text-text-primary hover:bg-text-primary/5 transition-colors focus:outline-none"
              aria-label="Toggle Theme"
            >
              {mounted && theme === "dark" ? (
                <Sun className="h-5 w-5 text-brand-accent" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </motion.button>

            {/* Favorites Icon */}
            <a
              href="#products"
              className="relative p-2 rounded-xl text-text-secondary hover:text-text-primary hover:bg-text-primary/5 transition-colors"
            >
              <Heart className="h-5 w-5" />
              {mounted && wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-danger text-[10px] font-bold text-white animate-pulse">
                  {wishlistCount}
                </span>
              )}
            </a>

            {/* Cart Icon */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 rounded-xl text-text-secondary hover:text-text-primary hover:bg-text-primary/5 transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              {mounted && cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-primary text-[10px] font-bold text-slate-950">
                  {cartCount}
                </span>
              )}
            </button>

            <Button variant="primary" size="sm" onClick={() => window.location.href = "#newsletter"}>
              Mua ngay
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-xl text-text-secondary hover:bg-text-primary/5"
            >
              {mounted && theme === "dark" ? <Sun className="h-5 w-5 text-brand-accent" /> : <Moon className="h-5 w-5" />}
            </button>
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-text-secondary hover:bg-text-primary/5 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer (Animated) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden border-b border-border bg-background px-4 pt-2 pb-4 space-y-1"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-xl text-base font-medium text-text-secondary hover:bg-text-primary/5 hover:text-text-primary transition-all"
              >
                {link.name}
              </a>
            ))}
            <div className="flex items-center justify-between px-3 py-3 border-t border-border mt-3">
              <div className="flex gap-4">
                <a href="#products" className="relative text-text-secondary" onClick={() => setMobileMenuOpen(false)}>
                  <Heart className="h-6 w-6" />
                  {mounted && wishlistCount > 0 && (
                    <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-brand-danger text-[10px] font-bold text-white">
                      {wishlistCount}
                    </span>
                  )}
                </a>
                <button
                  className="relative text-text-secondary"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setCartOpen(true);
                  }}
                >
                  <ShoppingCart className="h-6 w-6" />
                  {mounted && cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-brand-primary text-[10px] font-bold text-slate-950">
                      {cartCount}
                    </span>
                  )}
                </button>
              </div>
              <Button variant="primary" size="sm" onClick={() => { setMobileMenuOpen(false); window.location.href = "#newsletter"; }}>
                Mua ngay
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Slider Drawer */}
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </header>
  );
};
