// Utility for Google Analytics 4 (GA4) Event Tracking and Telemetry

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

/**
 * Log custom event to Google Analytics
 */
export const trackEvent = (
  action: string,
  category?: string,
  label?: string,
  value?: number,
  params?: Record<string, unknown>
) => {
  if (typeof window !== "undefined" && typeof window.gtag === "function" && GA_MEASUREMENT_ID) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
      ...params,
    });
  } else {
    // Development / fallback telemetry logging
    if (process.env.NODE_ENV === "development") {
      console.log(`[Telemetry / GA] Action: "${action}"`, { category, label, value, ...params });
    }
  }
};

/**
 * Log pageview event
 */
export const trackPageView = (url: string) => {
  if (typeof window !== "undefined" && typeof window.gtag === "function" && GA_MEASUREMENT_ID) {
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};
