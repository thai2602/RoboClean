"use client";

import * as React from "react";
import { createPortal } from "react-dom";
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
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const handleCheckout = () => {
    alert("Cảm ơn bạn đã trải nghiệm! Đơn hàng thử nghiệm của bạn đã được ghi nhận thành công.");
    clearCart();
    onClose();
  };

  // SSR Safety check
  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Shadow overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer Body Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md border-l border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-2xl flex flex-col justify-between"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 p-6 bg-slate-50 dark:bg-slate-900">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-brand-primary/10 rounded-xl border border-brand-primary/20">
                  <ShoppingBag className="h-5 w-5 text-brand-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Giỏ Hàng</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {items.length} sản phẩm trong giỏ
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {items.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-brand-danger dark:hover:text-brand-danger transition-colors px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                  >
                    Xóa tất cả
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all focus:outline-none cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Drawer Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white dark:bg-slate-950">
              {items.length === 0 ? (
                /* Empty Cart State */
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="rounded-full bg-slate-50 dark:bg-slate-900 p-6 border border-slate-100 dark:border-slate-800/50">
                    <ShoppingBag className="h-12 w-12 text-slate-400 dark:text-slate-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Giỏ hàng của bạn đang trống</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed">
                    Hãy tham khảo các sản phẩm robot hút bụi và phụ kiện của chúng tôi để thêm vào giỏ hàng.
                  </p>
                  <Button variant="primary" size="sm" onClick={onClose} className="mt-2">
                    Tiếp tục khám phá
                  </Button>
                </div>
              ) : (
                /* Cart Items List */
                <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                      {/* Product Image */}
                      <div className="relative h-20 w-20 bg-slate-50 dark:bg-slate-900/60 rounded-xl p-1.5 flex items-center justify-center border border-slate-200/60 dark:border-slate-800/40 flex-shrink-0">
                        <Image src={item.image} alt={item.name} width={60} height={60} className="object-contain" />
                      </div>

                      {/* Item Details */}
                      <div className="flex-grow flex flex-col justify-between">
                        <div>
                          <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm line-clamp-1">{item.name}</h4>
                          <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium mt-0.5">SKU: {item.sku}</p>
                          <p className="text-sm font-semibold text-brand-primary mt-1">{formatPrice(item.price)}</p>
                        </div>

                        {/* Quantity controls */}
                        <div className="flex items-center justify-between mt-2.5">
                          <div className="flex items-center border border-slate-200 dark:border-slate-800 rounded-lg bg-slate-50 dark:bg-slate-900/40 p-0.5">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 hover:text-brand-primary dark:hover:text-brand-primary text-slate-500 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800 rounded-md transition-colors focus:outline-none cursor-pointer"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="text-xs font-bold px-2 w-8 text-center text-slate-900 dark:text-slate-100">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 hover:text-brand-primary dark:hover:text-brand-primary text-slate-500 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800 rounded-md transition-colors focus:outline-none cursor-pointer"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          
                          {/* Remove button */}
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-slate-400 hover:text-brand-danger dark:hover:text-brand-danger transition-colors p-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900/60 cursor-pointer"
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
              <div className="border-t border-slate-200 dark:border-slate-800 p-6 bg-slate-50 dark:bg-slate-900 space-y-4 shadow-[0_-8px_24px_rgba(0,0,0,0.03)]">
                <div className="space-y-2.5 text-sm">
                  <div className="flex justify-between text-slate-500 dark:text-slate-400">
                    <span>Tạm tính:</span>
                    <span className="font-semibold text-slate-900 dark:text-slate-100">{formatPrice(getTotalPrice())}</span>
                  </div>
                  <div className="flex justify-between text-slate-500 dark:text-slate-400">
                    <span>Phí vận chuyển:</span>
                    <span className="text-brand-success font-semibold">Miễn phí</span>
                  </div>
                  <div className="border-t border-slate-200 dark:border-slate-800/80 pt-2.5 flex justify-between items-baseline">
                    <span className="font-bold text-slate-900 dark:text-slate-100">Tổng cộng:</span>
                    <span className="text-2xl font-extrabold text-brand-primary">{formatPrice(getTotalPrice())}</span>
                  </div>
                </div>
                
                <Button variant="primary" className="w-full py-3.5 mt-2 shadow-lg shadow-brand-primary/10" onClick={handleCheckout}>
                  Tiến hành thanh toán
                </Button>
              </div>
            )}

          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
};
