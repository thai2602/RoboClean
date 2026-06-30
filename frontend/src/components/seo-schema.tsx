import * as React from "react";

export const SEOSchema = () => {
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "RoboClean Pro Max X2",
    "image": [
      "https://roboclean.vn/images/roboclean_hero.png",
      "https://roboclean.vn/images/roboclean_dock.png"
    ],
    "description": "Robot hút bụi thông minh RoboClean Pro Max X2 sở hữu lực hút 6000Pa cực mạnh, trạm sạc tự giặt và sấy khô giẻ lau bằng khí nóng.",
    "sku": "ROBO-PRO-X2",
    "mpn": "ROBO-PRO-X2",
    "brand": {
      "@type": "Brand",
      "name": "RoboClean"
    },
    "review": [
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Nguyễn Hoàng Nam"
        },
        "reviewBody": "Robot hút bụi Pro Max này quá tuyệt vời. Nhà tôi nuôi 3 con mèo lông rụng ngập tràn nhưng từ khi có em này, sàn nhà bóng loáng."
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "230"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://roboclean.vn/#products",
      "priceCurrency": "VND",
      "price": "12990000",
      "priceValidUntil": "2027-12-31",
      "itemCondition": "https://schema.org/NewCondition",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "RoboClean Việt Nam"
      }
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Pin của robot dùng được bao lâu trong một lần sạc?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "RoboClean Pro sở hữu pin dung lượng cao 5200mAh, cho phép hoạt động liên tục tối đa 180 phút trong một lần sạc ở chế độ tiêu chuẩn."
        }
      },
      {
        "@type": "Question",
        "name": "Robot có tránh được dây điện, giầy dép và đồ chơi trẻ em không?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Có! Nhờ hệ thống cảm biến LiDAR AI 3D tiên tiến và camera quét laser, RoboClean Pro có khả năng nhận diện các vật thể nhỏ từ 1cm để chủ động tránh xa."
        }
      },
      {
        "@type": "Question",
        "name": "Chính sách bảo hành và hỗ trợ kỹ thuật tại Việt Nam như thế nào?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "RoboClean cung cấp chế độ bảo hành chính hãng 24 tháng đối với robot và dock sạc. Cam kết 1 đổi 1 trong vòng 30 ngày nếu có lỗi từ nhà sản xuất."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
};
