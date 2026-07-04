"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { Button } from "@/components/ui/button";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
  const { items, updateQuantity, removeItem, getTotalPrice, clearCart } = useCartStore();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const handleCheckout = () => {
    // Phase 4: Feedback trigger for order simulation
    alert("Cảm ơn bạn đã trải nghiệm! Đơn hàng thử nghiệm của bạn đã được ghi nhận thành công.");
    clearCart();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Shadow overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black backdrop-blur-sm"
          />

          {/* Drawer Body Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md border-l border-border bg-white dark:bg-slate-950 shadow-2xl flex flex-col justify-between"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-border p-6 bg-slate-50 dark:bg-slate-900">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-brand-primary" />
                <h2 className="text-xl font-bold text-text-primary">Giỏ Hàng</h2>
                <span className="rounded-full bg-brand-primary/10 text-brand-primary text-xs font-semibold px-2 py-0.5 border border-brand-primary/20">
                  {items.length}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-xl text-text-secondary hover:text-text-primary hover:bg-text-primary/5 transition-all focus:outline-none"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Drawer Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                /* Empty Cart State */
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="rounded-full bg-slate-100 dark:bg-slate-900 p-6">
                    <ShoppingBag className="h-12 w-12 text-text-secondary/50" />
                  </div>
                  <h3 className="text-lg font-bold text-text-primary">Giỏ hàng của bạn đang trống</h3>
                  <p className="text-sm text-text-secondary max-w-xs">
                    Hãy tham khảo các sản phẩm robot hút bụi và phụ kiện của chúng tôi để thêm vào giỏ hàng.
                  </p>
                  <Button variant="primary" size="sm" onClick={onClose}>
                    Tiếp tục khám phá
                  </Button>
                </div>
              ) : (
                /* Cart Items List */
                <div className="divide-y divide-border">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                      {/* Product Image */}
                      <div className="relative h-20 w-20 bg-slate-50 dark:bg-slate-900 rounded-xl p-1 flex items-center justify-center border border-border/50 flex-shrink-0">
                        <Image src={item.image} alt={item.name} width={60} height={60} className="object-contain" />
                      </div>

                      {/* Item Details */}
                      <div className="flex-grow flex flex-col justify-between">
                        <div>
                          <h4 className="font-bold text-text-primary text-sm line-clamp-1">{item.name}</h4>
                          <p className="text-xs text-text-secondary mb-1">SKU: {item.sku}</p>
                          <p className="text-sm font-semibold text-brand-primary">{formatPrice(item.price)}</p>
                        </div>

                        {/* Quantity controls */}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-border rounded-lg bg-slate-50 dark:bg-slate-900">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1.5 hover:text-brand-primary focus:outline-none"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="text-xs font-semibold px-2 w-8 text-center text-text-primary">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1.5 hover:text-brand-primary focus:outline-none"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          
                          {/* Remove button */}
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-text-secondary hover:text-brand-danger transition-colors p-1"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Drawer Footer Details */}
            {items.length > 0 && (
              <div className="border-t border-border p-6 bg-slate-50 dark:bg-slate-900 space-y-4 shadow-[0_-8px_24px_rgba(0,0,0,0.03)]">
                <div className="flex justify-between items-baseline">
                  <span className="text-sm text-text-secondary font-medium">Tổng tiền tạm tính:</span>
                  <span className="text-2xl font-extrabold text-brand-primary">{formatPrice(getTotalPrice())}</span>
                </div>
                <Button variant="primary" className="w-full py-3.5" onClick={handleCheckout}>
                  Tiến hành thanh toán
                </Button>
              </div>
            )}

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
