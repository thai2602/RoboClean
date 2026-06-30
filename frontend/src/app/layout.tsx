import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "RoboClean - Robot Hút Bụi Thông Minh Thế Hệ Mới",
  description: "Khám phá RoboClean Pro - Robot hút bụi lau nhà thông minh với lực hút 6000Pa, định vị LiDAR AI 3D, tự động đổ rác, giặt và sấy khô giẻ lau bằng khí nóng.",
  keywords: ["robot hut bui", "roboclean", "robot lau nha", "thiet bi thong minh", "don dep nha cua"],
  authors: [{ name: "RoboClean Team" }],
  alternates: {
    canonical: "https://roboclean.vn",
  },
  openGraph: {
    title: "RoboClean - Robot Hút Bụi Thông Minh Thế Hệ Mới",
    description: "Lực hút 6000Pa, định vị LiDAR AI 3D, tự động giặt sấy giẻ. Đăng ký nhận ngay ưu đãi 10%.",
    url: "https://roboclean.vn",
    siteName: "RoboClean",
    images: [
      {
        url: "https://roboclean.vn/images/roboclean_hero.png",
        width: 1200,
        height: 630,
        alt: "RoboClean Pro Smart Vacuum Robot",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RoboClean - Robot Hút Bụi Thông Minh Thế Hệ Mới",
    description: "Đột phá công nghệ dọn dẹp nhà cửa. Trạm sạc đa năng 6-trong-1 tự làm sạch.",
    images: ["https://roboclean.vn/images/roboclean_hero.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning className={`${outfit.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
