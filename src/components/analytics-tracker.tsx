"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

export function trackEvent(name: string, data: Record<string, string | number | boolean> = {}) {
  const body = JSON.stringify({ name, path: window.location.pathname, data });
  if (navigator.sendBeacon) navigator.sendBeacon("/api/analytics", new Blob([body], { type: "application/json" }));
  else void fetch("/api/analytics", { method: "POST", headers: { "content-type": "application/json" }, body, keepalive: true });
}

function Tracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => {
    if (pathname.startsWith("/admin")) return;
    trackEvent("page_view", { query: searchParams.toString() });
  }, [pathname, searchParams]);
  return null;
}

export function AnalyticsTracker() {
  return <Suspense fallback={null}><Tracker /></Suspense>;
}
