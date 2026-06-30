"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  sender: "USER" | "BOT";
  text: string;
}

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [showBalloon, setShowBalloon] = React.useState(false);
  const [messages, setMessages] = React.useState<Message[]>([
    {
      sender: "BOT",
      text: "Chào bạn! Tôi là trợ lý ảo RoboClean AI. Tôi có thể giúp gì cho bạn trong việc tìm hiểu robot hút bụi thông minh ạ?",
    },
  ]);
  const [inputVal, setInputVal] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const chatEndRef = React.useRef<HTMLDivElement>(null);

  // 5 seconds auto-welcome balloon popup
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        setShowBalloon(true);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [isOpen]);

  // Auto-scroll to bottom of chat list
  React.useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  const handleOpenToggle = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    if (nextState) {
      setShowBalloon(false);
      // Telemetry trigger
      try {
        const sessId = localStorage.getItem("roboclean-session-id") || "sess_unknown";
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";
        fetch(`${apiUrl}/tracking/events`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId: sessId,
            eventType: "CHAT_OPEN",
            page: window.location.pathname || "/",
            target: "chat-widget-icon",
            metadata: { timestamp: new Date().toISOString() },
          }),
        });
      } catch (err) {
        // ignore
      }
    }
  };

  const handleSend = async (text: string) => {
    if (!text.trim() || loading) return;

    // Append User Message
    const userMsg: Message = { sender: "USER", text };
    setMessages((prev) => [...prev, userMsg]);
    setInputVal("");
    setLoading(true);

    try {
      const sessId = localStorage.getItem("roboclean-session-id") || "chat_sess_local";
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

      const res = await fetch(`${apiUrl}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId: sessId,
          message: text,
        }),
      });

      const data = await res.json();
      if (data.success && data.data && data.data.reply) {
        setMessages((prev) => [...prev, { sender: "BOT", text: data.data.reply }]);
      } else {
        throw new Error();
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "BOT",
          text: "Xin lỗi bạn, kết nối của tôi đang gián đoạn một chút. RoboClean Pro Max X2 có lực hút 6000Pa đang bán chạy nhất với giá ưu đãi 12.990.000đ. Bạn cần thêm thông tin gì khác không ạ?",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const suggestedQuestions = [
    "RoboClean Pro giá bao nhiêu?",
    "Có tự làm sạch giẻ lau không?",
    "Chính sách bảo hành thế nào?",
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* 1. Welcoming Popup Balloon next to bubble */}
      <AnimatePresence>
        {showBalloon && !isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            onClick={handleOpenToggle}
            className="mb-3 mr-2 max-w-[240px] cursor-pointer rounded-2xl border border-brand-primary/20 bg-card p-4 shadow-xl text-xs text-text-primary leading-relaxed hover:border-brand-primary transition-all"
          >
            <div className="absolute right-6 bottom-[-6px] h-3 w-3 rotate-45 border-r border-b border-brand-primary/20 bg-card" />
            <p className="font-semibold text-brand-primary mb-1 flex items-center gap-1">
              <Sparkles className="h-3 w-3" /> Trợ lý RoboClean
            </p>
            Chào bạn! Bạn cần tư vấn thông tin về robot hút bụi RoboClean không ạ? Click để chat ngay nhé!
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Interactive Chat Dialog Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="mb-4 h-[500px] w-[360px] sm:w-[380px] rounded-3xl border border-border bg-card shadow-2xl flex flex-col justify-between overflow-hidden"
          >
            {/* Header Area */}
            <div className="flex items-center justify-between border-b border-border p-4 bg-surface">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-secondary/10 border border-brand-secondary/20 text-brand-secondary">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-text-primary">RoboClean AI Advisor</h3>
                  <span className="flex items-center gap-1.5 text-[10px] text-brand-success font-medium">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-success animate-pulse" /> Đang hoạt động
                  </span>
                </div>
              </div>
              <button
                onClick={handleOpenToggle}
                className="p-2 rounded-xl text-text-secondary hover:text-text-primary hover:bg-text-primary/5 transition-all focus:outline-none"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages Body Area */}
            <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-background/30">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex gap-3 max-w-[85%] ${
                    msg.sender === "USER" ? "ml-auto flex-row-reverse" : "mr-auto"
                  }`}
                >
                  <div
                    className={`flex-shrink-0 flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold border ${
                      msg.sender === "USER"
                        ? "bg-brand-primary/10 border-brand-primary/20 text-brand-primary"
                        : "bg-brand-secondary/10 border-brand-secondary/20 text-brand-secondary"
                    }`}
                  >
                    {msg.sender === "USER" ? <User className="h-3.5 w-3.5" /> : <Bot className="h-3.5 w-3.5" />}
                  </div>
                  <div
                    className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      msg.sender === "USER"
                        ? "bg-brand-primary text-slate-950 font-medium"
                        : "bg-surface border border-border text-text-primary shadow-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {/* Pulsing Loading Skeleton when Bot is thinking */}
              {loading && (
                <div className="flex gap-3 max-w-[85%] mr-auto">
                  <div className="flex-shrink-0 flex h-7 w-7 items-center justify-center rounded-full bg-brand-secondary/10 border border-brand-secondary/20 text-brand-secondary text-xs">
                    <Bot className="h-3.5 w-3.5" />
                  </div>
                  <div className="rounded-2xl px-4 py-3 bg-surface border border-border flex items-center gap-1 shadow-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-text-secondary/50 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="h-1.5 w-1.5 rounded-full bg-text-secondary/50 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="h-1.5 w-1.5 rounded-full bg-text-secondary/50 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Quick Suggested Chips */}
            {messages.length === 1 && !loading && (
              <div className="px-4 py-2 flex flex-wrap gap-2 border-t border-border/40 bg-background/10">
                {suggestedQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(q)}
                    className="text-xs px-3 py-1.5 rounded-full border border-border bg-card text-text-secondary hover:text-brand-primary hover:border-brand-primary/30 transition-all font-medium"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input Action Form Area */}
            <div className="border-t border-border p-3 bg-surface flex items-center gap-2">
              <input
                type="text"
                placeholder="Nhập câu hỏi của bạn..."
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend(inputVal)}
                disabled={loading}
                className="flex-grow px-4 py-2.5 rounded-xl border border-border bg-background/50 text-text-primary text-sm placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-brand-primary/30 transition-all"
              />
              <button
                onClick={() => handleSend(inputVal)}
                disabled={!inputVal.trim() || loading}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-primary text-slate-950 hover:bg-brand-primary/95 transition-colors focus:outline-none disabled:opacity-40 disabled:pointer-events-none"
              >
                <Send className="h-4.5 w-4.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Main Floating Chat Bubble Icon */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleOpenToggle}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-secondary text-white shadow-2xl hover:bg-brand-secondary/90 transition-colors focus:outline-none"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close-icon"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-6 w-6" />
            </motion.div>
          ) : (
            <motion.div
              key="chat-icon"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="h-6 w-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

    </div>
  );
};
