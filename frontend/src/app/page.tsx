"use client";

import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { Features } from "@/components/sections/features";
import { Products } from "@/components/sections/products";
import dynamic from "next/dynamic";

const Specifications = dynamic(
  () => import("@/components/sections/specifications").then((mod) => mod.Specifications),
  { ssr: false }
);
const Reviews = dynamic(
  () => import("@/components/sections/reviews").then((mod) => mod.Reviews),
  { ssr: false }
);
const FAQ = dynamic(
  () => import("@/components/sections/faq").then((mod) => mod.FAQ),
  { ssr: false }
);
const Newsletter = dynamic(
  () => import("@/components/sections/newsletter").then((mod) => mod.Newsletter),
  { ssr: false }
);
const Footer = dynamic(
  () => import("@/components/sections/footer").then((mod) => mod.Footer),
  { ssr: false }
);
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
