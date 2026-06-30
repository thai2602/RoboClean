"use client";

import * as React from "react";

export const useTracking = () => {
  const [sessionId, setSessionId] = React.useState("");

  // Retrieve or generate Session ID
  React.useEffect(() => {
    let sessId = localStorage.getItem("roboclean-session-id");
    if (!sessId) {
      sessId = `sess_${Math.random().toString(36).substring(2, 11)}_${Date.now()}`;
      localStorage.setItem("roboclean-session-id", sessId);
    }
    setSessionId(sessId);
  }, []);

  const sendEvent = React.useCallback(
    async (eventType: string, target: string, extraMetadata?: Record<string, any>) => {
      if (!sessionId) return;

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";
      const payload = {
        sessionId,
        eventType,
        page: window.location.pathname || "/",
        target,
        metadata: {
          userAgent: navigator.userAgent,
          screenWidth: window.innerWidth,
          screenHeight: window.innerHeight,
          timestamp: new Date().toISOString(),
          ...extraMetadata,
        },
      };

      try {
        await fetch(`${apiUrl}/tracking/events`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
      } catch (err) {
        console.error("[Tracking] Failed to post telemetry: ", err);
      }
    },
    [sessionId]
  );

  // Bind Listeners for Click and Scroll Telemetry
  React.useEffect(() => {
    if (!sessionId) return;

    // 1. Click Listener
    const handleGlobalClick = (e: MouseEvent) => {
      const targetElement = e.target as HTMLElement;
      
      // Check if clicked element or parent has a data-track attribute or id
      const trackable = targetElement.closest("[id], [data-track], button, a");
      if (trackable) {
        const targetName =
          trackable.getAttribute("data-track") ||
          trackable.id ||
          trackable.textContent?.trim().substring(0, 30) ||
          "unnamed-element";
        
        sendEvent("CLICK", targetName);
      }
    };

    // 2. Scroll Depth Listener
    const sentThresholds = { 25: false, 50: false, 75: false, 100: false };
    
    const handleGlobalScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;

      const scrollPercent = Math.round((scrollTop / docHeight) * 100);

      // Check thresholds
      const thresholds = [25, 50, 75, 100] as const;
      for (const t of thresholds) {
        if (scrollPercent >= t && !sentThresholds[t]) {
          sentThresholds[t] = true;
          sendEvent("SCROLL", `scroll-depth-${t}%`, { scrollPercentage: scrollPercent });
        }
      }
    };

    window.addEventListener("click", handleGlobalClick);
    window.addEventListener("scroll", handleGlobalScroll);

    // Initial click trigger for page visit
    sendEvent("CHAT_OPEN", "page-session-start"); // Custom event to mark session init

    return () => {
      window.removeEventListener("click", handleGlobalClick);
      window.removeEventListener("scroll", handleGlobalScroll);
    };
  }, [sessionId, sendEvent]);

  return { sessionId, sendEvent };
};
