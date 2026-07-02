"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Zap } from "lucide-react";

export const Hero = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  
  // Parallax hook
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Transform scroll progress to translate Y
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, 120]);

  // Framer Motion variants for staggered text entry
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.215, 0.61, 0.355, 1] as const, // easeOutCubic
      },
    },
  };

  return (
    <section ref={containerRef} className="relative overflow-hidden bg-background py-20 lg:py-32">
      {/* Background Gradient Lights */}
      <div className="absolute top-0 left-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-brand-primary/10 blur-[120px] dark:bg-brand-primary/5" />
      <div className="absolute right-1/4 bottom-0 -z-10 h-[500px] w-[500px] rounded-full bg-brand-secondary/10 blur-[120px] dark:bg-brand-secondary/5" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          
          {/* Left Column: Text Content */}
          <motion.div
            className="flex flex-col items-start text-left space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Tagline */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-primary/20 bg-brand-primary/5 text-xs font-semibold tracking-wider uppercase text-brand-primary"
            >
              <Zap className="h-3 w-3" /> Bản giới hạn - Pro Edition
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-6xl font-extrabold tracking-tight text-text-primary leading-tight"
            >
              ROBOCLEAN PRO <br />
              <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
                ĐỊNH NGHĨA SẠCH SẼ MỚI
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-lg text-text-secondary max-w-lg leading-relaxed"
            >
              Trải nghiệm dòng robot hút bụi lau nhà thông minh thế hệ mới tích hợp trạm sạc đa năng 6-trong-1. Quét bản đồ LiDAR AI 3D, lực hút 6000Pa cực mạnh, tự giặt & sấy khô giẻ lau. Giải phóng đôi tay của bạn hoàn toàn!
            </motion.p>

            {/* Trust Badges */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 text-xs font-medium text-text-secondary"
            >
              <span className="flex items-center gap-1">
                <ShieldCheck className="h-4 w-4 text-brand-success" /> Bảo hành chính hãng 24 tháng
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="h-4 w-4 text-brand-success" /> Miễn phí vận chuyển toàn quốc
              </span>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <Button
                variant="primary"
                size="lg"
                className="group gap-2 w-full sm:w-auto"
                onClick={() => window.location.href = "#products"}
              >
                Trải nghiệm ngay
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
                onClick={() => window.location.href = "#specifications"}
              >
                Xem thông số kỹ thuật
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Column: Visual Product */}
          <motion.div
            style={{ y: yParallax }}
            className="relative flex justify-center items-center lg:justify-end"
          >
            {/* Ambient Shadow glow */}
            <div className="absolute top-1/2 left-1/2 -z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-primary/20 blur-3xl" />

            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative h-[300px] w-[300px] sm:h-[450px] sm:w-[450px] overflow-hidden rounded-full border border-border bg-gradient-to-tr from-brand-primary/10 to-brand-secondary/10 p-6 dark:border-white/5 shadow-2xl"
            >
              <div className="relative h-full w-full overflow-hidden rounded-full bg-card shadow-inner">
                <Image
                  src="/images/roboclean_hero.png"
                  alt="RoboClean Pro Smart Vacuum"
                  fill
                  priority
                  sizes="(max-width: 768px) 300px, 450px"
                  className="object-cover scale-95 transition-transform duration-500 hover:scale-100"
                />
              </div>
            </motion.div>

            {/* Floating Info Tag 1 */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute top-10 left-10 p-4 rounded-2xl border border-border bg-background/80 backdrop-blur-md shadow-lg hidden sm:block"
            >
              <p className="text-xs text-text-secondary font-medium">Lực hút mạnh nhất</p>
              <p className="text-xl font-bold text-brand-primary">6000 Pa</p>
            </motion.div>
            
            {/* Floating Info Tag 2 */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
              className="absolute bottom-10 right-10 p-4 rounded-2xl border border-border bg-background/80 backdrop-blur-md shadow-lg hidden sm:block"
            >
              <p className="text-xs text-text-secondary font-medium">Sấy khô khí nóng</p>
              <p className="text-xl font-bold text-brand-accent">55°C</p>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
