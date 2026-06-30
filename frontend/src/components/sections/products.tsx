"use client";

import * as React from "react";
import Image from "next/image";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { useRecentlyViewedStore } from "@/store/recently-viewed-store";

export const Products = () => {
  const [mounted, setMounted] = React.useState(false);

  const addItem = useCartStore((state) => state.addItem);
  const { toggleWishlist, hasItem } = useWishlistStore();
  const { items: recentlyViewed, addViewedItem } = useRecentlyViewedStore();

  const STATIC_LIST = [
    {
      id: "pro-max-x2",
      name: "RoboClean Pro Max X2",
      sku: "ROBO-PRO-X2",
      price: 12990000,
      originalPrice: 14990000,
      image: "/images/roboclean_hero.png",
      rating: 5,
      description: "Đầy đủ trạm sạc thông minh 6-trong-1, tự giặt và sấy khô giẻ lau bằng khí nóng.",
    },
    {
      id: "standard-s1",
      name: "RoboClean Standard S1",
      sku: "ROBO-STD-S1",
      price: 7990000,
      originalPrice: 9990000,
      image: "/images/roboclean_hero.png",
      rating: 4,
      description: "Lực hút 4000Pa cực mạnh, kèm dock sạc cơ bản tự thu gom rác.",
    },
    {
      id: "dock-pro",
      name: "Trạm Sạc Đa Năng RoboDock",
      sku: "ROBO-DOCK-PRO",
      price: 4990000,
      originalPrice: 5990000,
      image: "/images/roboclean_dock.png",
      rating: 5,
      description: "Nâng cấp dock sạc thường thành tự động đổ rác, tự giặt giẻ tiện lợi.",
    },
  ];

  const [productList, setProductList] = React.useState<any[]>(STATIC_LIST);

  React.useEffect(() => {
    setMounted(true);
    
    const fetchProducts = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";
        const res = await fetch(`${apiUrl}/products`);
        const data = await res.json();
        if (data.success && data.data && data.data.length > 0) {
          // Normalize API fields to match FE names (imageUrl -> image)
          const normalized = data.data.map((p: any) => ({
            ...p,
            image: p.imageUrl || p.image,
            rating: p.rating || 5 // default to 5 stars if not set
          }));
          setProductList(normalized);
        }
      } catch (err) {
        console.warn("[Products] Backend API offline. Using static catalog data.");
      }
    };

    fetchProducts();
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const handleCardInteraction = (product: typeof productList[0]) => {
    addViewedItem({
      id: product.id,
      name: product.name,
      price: product.price,
      sku: product.sku,
      image: product.image || product.imageUrl,
    });
  };


  return (
    <section id="products" className="bg-surface py-20 lg:py-32 border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <ScrollReveal duration={0.6} className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h2 className="text-sm font-semibold tracking-wider uppercase text-brand-primary">Cửa Hàng RoboClean</h2>
          <p className="text-3xl sm:text-5xl font-bold tracking-tight text-text-primary">
            SẢN PHẨM & PHỤ KIỆN CHÍNH HÃNG
          </p>
          <p className="text-lg text-text-secondary">
            Đặt hàng ngay hôm nay để nhận thêm quà tặng trị giá tới 1.500.000đ và gói bảo hành vàng.
          </p>
        </ScrollReveal>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {productList.map((product, idx) => {
            const isWishlisted = mounted ? hasItem(product.id) : false;
            return (
              <ScrollReveal
                key={product.id}
                direction="up"
                duration={0.6}
                delay={idx * 0.1}
                onViewportEnter={() => handleCardInteraction(product)}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-text-primary/10"
              >
                {/* Add to Wishlist Heart */}
                <button
                  onClick={() =>
                    toggleWishlist({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      sku: product.sku,
                      image: product.image,
                    })
                  }
                  className="absolute top-4 right-4 z-10 p-2 rounded-full border border-border bg-background/80 text-text-secondary hover:text-brand-danger hover:bg-brand-danger/5 transition-all focus:outline-none active:scale-90"
                >
                  <Heart className={`h-5 w-5 ${isWishlisted ? "fill-brand-danger text-brand-danger" : ""}`} />
                </button>

                {/* Product Visual */}
                <div
                  onClick={() => handleCardInteraction(product)}
                  className="relative aspect-square w-full overflow-hidden rounded-2xl bg-surface p-4 mb-6 flex justify-center items-center border border-border/50 cursor-pointer"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="object-contain scale-90 transition-transform duration-500 group-hover:scale-100"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < product.rating ? "text-brand-accent fill-brand-accent" : "text-border"
                          }`}
                        />
                      ))}
                      <span className="text-xs text-text-secondary font-medium ml-1">({product.rating}.0)</span>
                    </div>

                    {/* Title */}
                    <h3
                      onClick={() => handleCardInteraction(product)}
                      className="text-xl font-bold text-text-primary mb-2 group-hover:text-brand-primary transition-colors cursor-pointer"
                    >
                      {product.name}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-text-secondary mb-4 leading-relaxed line-clamp-2">
                      {product.description}
                    </p>
                  </div>

                  {/* Price and CTA */}
                  <div>
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-2xl font-extrabold text-brand-primary">
                        {formatPrice(product.price)}
                      </span>
                      <span className="text-sm text-text-secondary line-through font-light">
                        {formatPrice(product.originalPrice)}
                      </span>
                    </div>

                    <Button
                      variant="primary"
                      onClick={() =>
                        addItem({
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          sku: product.sku,
                          image: product.image,
                        })
                      }
                      className="w-full gap-2 py-2.5"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      Thêm giỏ hàng
                    </Button>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Recently Viewed Sub-Section (Dynamic) */}
        {mounted && recentlyViewed.length > 0 && (
          <ScrollReveal duration={0.6} className="mt-20 pt-10 border-t border-border">
            <h4 className="text-sm font-semibold tracking-wider text-text-secondary uppercase mb-6">
              Sản phẩm đã xem gần đây
            </h4>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-border">
              {recentlyViewed.map((product) => (
                <div
                  key={`viewed-${product.id}`}
                  className="flex items-center gap-4 min-w-[280px] p-3 rounded-2xl border border-border bg-card hover:border-brand-primary/20 transition-all flex-shrink-0"
                >
                  <div className="relative h-16 w-16 bg-surface rounded-xl p-1 flex items-center justify-center border border-border/50 flex-shrink-0">
                    <Image src={product.image} alt={product.name} width={50} height={50} className="object-contain" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-text-primary line-clamp-1">{product.name}</p>
                    <p className="text-xs text-brand-primary font-bold">{formatPrice(product.price)}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        )}

      </div>
    </section>
  );
};
