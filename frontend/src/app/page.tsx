"use client";

import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { Features } from "@/components/sections/features";
import { Products } from "@/components/sections/products";
import { Specifications } from "@/components/sections/specifications";
import { Reviews } from "@/components/sections/reviews";
import { FAQ } from "@/components/sections/faq";
import { Newsletter } from "@/components/sections/newsletter";
import { Footer } from "@/components/sections/footer";

import dynamic from "next/dynamic";

const ChatWidget = dynamic(
  () => import("@/components/sections/chat-widget").then((mod) => mod.ChatWidget),
  { ssr: false }
);

import { SEOSchema } from "@/components/seo-schema";
import { useTracking } from "@/hooks/use-tracking";

export default function Home() {
  // Activate click & scroll event telemetry tracking
  useTracking();

  return (
    <div className="flex min-h-screen flex-col">
      {/* Sticky Navigation Bar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero />

        {/* Key Features Section */}
        <Features />

        {/* Products Grid & E-commerce Section */}
        <Products />

        {/* Tech Specifications Comparison Section */}
        <Specifications />

        {/* Customer Reviews Section */}
        <Reviews />

        {/* Frequently Asked Questions */}
        <FAQ />

        {/* Newsletter Signup Form */}
        <Newsletter />
      </main>

      {/* Footer Details */}
      <Footer />

      {/* Floating AI Chat Assistant */}
      <ChatWidget />

      {/* SEO Structured JSON-LD Markup */}
      <SEOSchema />
    </div>
  );
}
