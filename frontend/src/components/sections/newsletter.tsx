"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { CheckCircle2, AlertCircle, Sparkles } from "lucide-react";

// Form Schema Definition using Zod
const newsletterSchema = z.object({
  fullName: z.string().min(2, "Họ và tên phải có ít nhất 2 ký tự"),
  email: z.string().email("Địa chỉ email không đúng định dạng"),
  phone: z.string().refine((val) => val === "" || /^[0-9]{9,11}$/.test(val), {
    message: "Số điện thoại phải chứa 9-11 số",
  }),
});

type NewsletterFormValues = z.infer<typeof newsletterSchema>;

export const Newsletter = () => {
  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle");
  const [successMessage, setSuccessMessage] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = async (data: NewsletterFormValues) => {
    setStatus("loading");
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";
      const res = await fetch(`${apiUrl}/subscribers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const resData = await res.json();
      if (!res.ok) {
        throw new Error(resData.message || "Đăng ký nhận tin thất bại.");
      }
      
      setStatus("success");
      setSuccessMessage("Đăng ký nhận ưu đãi thành công! Mã giảm giá 10% đã được gửi tới email của bạn.");
      reset();
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || "Có lỗi xảy ra trong quá trình xử lý. Vui lòng thử lại sau.");
    }
  };

  return (
    <section id="newsletter" className="bg-background py-20 lg:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-brand-primary/20 bg-card p-8 sm:p-16 shadow-2xl">
          
          {/* Background lights decoration */}
          <div className="absolute -top-24 -left-24 h-48 w-48 rounded-full bg-brand-primary/20 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-brand-secondary/20 blur-3xl" />

          {/* Form Header */}
          <div className="relative text-center max-w-2xl mx-auto space-y-4 mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-accent/20 bg-brand-accent/5 text-xs font-semibold tracking-wider uppercase text-brand-accent">
              <Sparkles className="h-3.5 w-3.5" /> Ưu Đãi Đặc Biệt
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text-primary">
              NHẬN NGAY MÃ GIẢM GIÁ 10%
            </h2>
            <p className="text-text-secondary text-base sm:text-lg">
              Đăng ký thông tin để nhận mã giảm giá cho đơn hàng đầu tiên và thông tin ưu đãi sớm nhất từ RoboClean.
            </p>
          </div>

          {/* Form Action Area */}
          <div className="relative max-w-lg mx-auto">
            {status === "success" ? (
              /* Success Message */
              <div className="rounded-2xl border border-brand-success/20 bg-brand-success/5 p-6 text-center space-y-4">
                <CheckCircle2 className="h-12 w-12 text-brand-success mx-auto" />
                <h3 className="text-xl font-bold text-text-primary">Đăng Ký Thành Công!</h3>
                <p className="text-text-secondary text-sm">{successMessage}</p>
                <Button variant="outline" size="sm" onClick={() => setStatus("idle")}>
                  Đăng ký lại
                </Button>
              </div>
            ) : (
              /* Actual Signup Form */
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                
                {/* Full Name */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="fullName" className="text-sm font-semibold text-text-primary">
                    Họ và tên
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    placeholder="Nguyễn Văn A"
                    disabled={status === "loading"}
                    className={`w-full px-4 py-3 rounded-xl border bg-background/50 text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all ${
                      errors.fullName ? "border-brand-danger" : "border-border"
                    }`}
                    {...register("fullName")}
                  />
                  {errors.fullName && (
                    <span className="text-xs text-brand-danger flex items-center gap-1 mt-1">
                      <AlertCircle className="h-3 w-3" /> {errors.fullName.message}
                    </span>
                  )}
                </div>

                {/* Email Address */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-sm font-semibold text-text-primary">
                    Địa chỉ Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="nguyenvana@gmail.com"
                    disabled={status === "loading"}
                    className={`w-full px-4 py-3 rounded-xl border bg-background/50 text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all ${
                      errors.email ? "border-brand-danger" : "border-border"
                    }`}
                    {...register("email")}
                  />
                  {errors.email && (
                    <span className="text-xs text-brand-danger flex items-center gap-1 mt-1">
                      <AlertCircle className="h-3 w-3" /> {errors.email.message}
                    </span>
                  )}
                </div>

                {/* Phone Number */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="phone" className="text-sm font-semibold text-text-primary">
                    Số điện thoại <span className="text-xs text-text-secondary/60">(Tùy chọn)</span>
                  </label>
                  <input
                    id="phone"
                    type="text"
                    placeholder="0987654321"
                    disabled={status === "loading"}
                    className={`w-full px-4 py-3 rounded-xl border bg-background/50 text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all ${
                      errors.phone ? "border-brand-danger" : "border-border"
                    }`}
                    {...register("phone")}
                  />
                  {errors.phone && (
                    <span className="text-xs text-brand-danger flex items-center gap-1 mt-1">
                      <AlertCircle className="h-3 w-3" /> {errors.phone.message}
                    </span>
                  )}
                </div>

                {/* Submit button */}
                <Button
                  variant="primary"
                  type="submit"
                  isLoading={status === "loading"}
                  className="w-full py-3.5"
                >
                  Đăng ký nhận ưu đãi
                </Button>

                {status === "error" && (
                  <div className="rounded-xl border border-brand-danger/20 bg-brand-danger/5 p-4 text-xs text-brand-danger flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" /> {errorMessage}
                  </div>
                )}
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
