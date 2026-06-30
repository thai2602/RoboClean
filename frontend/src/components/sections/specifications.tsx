"use client";

import * as React from "react";

interface SpecRowProps {
  label: string;
  standard: string;
  pro: string;
}

const SpecRow = ({ label, standard, pro }: SpecRowProps) => (
  <div className="grid grid-cols-3 py-4 border-b border-border text-sm sm:text-base">
    <div className="font-medium text-text-primary">{label}</div>
    <div className="text-text-secondary text-center">{standard}</div>
    <div className="text-brand-primary font-semibold text-center">{pro}</div>
  </div>
);

export const Specifications = () => {
  const [activeTab, setActiveTab] = React.useState<"compare" | "pro" | "standard">("compare");
  const [loading, setLoading] = React.useState(false);

  const handleTabChange = (tab: "compare" | "pro" | "standard") => {
    if (tab === activeTab) return;
    setLoading(true);
    setActiveTab(tab);
    
    // Simulate Skeleton Loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  };

  const specs = [
    { label: "Lực hút tối đa", standard: "4000 Pa", pro: "6000 Pa" },
    { label: "Dung lượng pin", standard: "3200 mAh", pro: "5200 mAh" },
    { label: "Thời lượng pin tối đa", standard: "120 phút", pro: "180 phút" },
    { label: "Hệ thống định vị", standard: "LiDAR Standard", pro: "LiDAR AI 3D Laser" },
    { label: "Tự động giặt giẻ lau", standard: "Không hỗ trợ", pro: "Có (Nước nóng)" },
    { label: "Sấy khô khí nóng", standard: "Không hỗ trợ", pro: "Có (55°C)" },
    { label: "Tự động hút rác lên dock", standard: "Hỗ trợ (Túi rác 2L)", pro: "Hỗ trợ (Túi rác 3L)" },
    { label: "Dung tích hộp nước sạch", standard: "2.5 L", pro: "4 L" },
    { label: "Độ ồn tối đa", standard: "65 dB", pro: "58 dB (Siêu êm)" },
  ];

  return (
    <section id="specifications" className="bg-background py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <h2 className="text-sm font-semibold tracking-wider uppercase text-brand-primary">Thông Số Kỹ Thuật</h2>
          <p className="text-3xl sm:text-5xl font-bold tracking-tight text-text-primary">
            SO SÁNH CÁC PHIÊN BẢN
          </p>
          <p className="text-lg text-text-secondary">
            Lựa chọn sản phẩm phù hợp với không gian và nhu cầu dọn dẹp của gia đình bạn.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-xl p-1 bg-surface border border-border">
            <button
              onClick={() => handleTabChange("compare")}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                activeTab === "compare"
                  ? "bg-brand-primary text-slate-950 shadow-sm"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              So sánh chi tiết
            </button>
            <button
              onClick={() => handleTabChange("pro")}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                activeTab === "pro"
                  ? "bg-brand-primary text-slate-950 shadow-sm"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              RoboClean Pro
            </button>
            <button
              onClick={() => handleTabChange("standard")}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                activeTab === "standard"
                  ? "bg-brand-primary text-slate-950 shadow-sm"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              RoboClean Standard
            </button>
          </div>
        </div>

        {/* Specifications Data Area */}
        <div className="max-w-4xl mx-auto rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm">
          
          {loading ? (
            /* Skeleton Loading State */
            <div className="animate-pulse space-y-6 py-4">
              <div className="grid grid-cols-3 gap-4 pb-4 border-b border-border">
                <div className="h-4 bg-border rounded w-2/3"></div>
                <div className="h-4 bg-border rounded w-1/3 mx-auto"></div>
                <div className="h-4 bg-border rounded w-1/3 mx-auto"></div>
              </div>
              {[...Array(6)].map((_, idx) => (
                <div key={idx} className="grid grid-cols-3 gap-4 py-2">
                  <div className="h-4 bg-border rounded w-1/2"></div>
                  <div className="h-4 bg-border rounded w-1/3 mx-auto"></div>
                  <div className="h-4 bg-border rounded w-1/3 mx-auto"></div>
                </div>
              ))}
            </div>
          ) : (
            /* Actual Data Content */
            <div>
              {/* Table Header */}
              <div className="grid grid-cols-3 pb-4 border-b-2 border-border text-sm font-semibold tracking-wider uppercase text-text-secondary">
                <div>Tính năng</div>
                <div className="text-center">RoboClean Standard</div>
                <div className="text-center text-brand-primary">RoboClean Pro</div>
              </div>

              {activeTab === "compare" && (
                <div className="divide-y divide-border">
                  {specs.map((spec, idx) => (
                    <SpecRow
                      key={idx}
                      label={spec.label}
                      standard={spec.standard}
                      pro={spec.pro}
                    />
                  ))}
                </div>
              )}

              {activeTab === "pro" && (
                <div className="divide-y divide-border">
                  {specs.map((spec, idx) => (
                    <div key={idx} className="grid grid-cols-2 py-4 text-sm sm:text-base">
                      <div className="font-medium text-text-primary">{spec.label}</div>
                      <div className="text-brand-primary font-semibold text-right">{spec.pro}</div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "standard" && (
                <div className="divide-y divide-border">
                  {specs.map((spec, idx) => (
                    <div key={idx} className="grid grid-cols-2 py-4 text-sm sm:text-base">
                      <div className="font-medium text-text-primary">{spec.label}</div>
                      <div className="text-text-secondary text-right">{spec.standard}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
