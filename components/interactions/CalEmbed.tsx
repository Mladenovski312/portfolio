"use client";

import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";

type CalEmbedProps = {
  calLink: string;
  origin?: string;
};

const calThemeVars = {
  "cal-bg": "#112240",
  "cal-bg-muted": "#0A192F",
  "cal-bg-emphasis": "#1B2E4F",
  "cal-border": "#233554",
  "cal-border-subtle": "#17243C",
  "cal-text": "#E5EAFC",
  "cal-text-muted": "#AFB8D5",
  "cal-brand": "#5EEAD4",
  "cal-brand-emphasis": "#7FF0DD",
};

export function CalEmbed({ calLink, origin = "https://cal.eu" }: CalEmbedProps) {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: "30min" });
      cal("ui", {
        theme: "dark",
        cssVarsPerTheme: {
          dark: calThemeVars,
          light: calThemeVars,
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <Cal
      namespace="30min"
      calLink={calLink}
      style={{ width: "100%", minHeight: 600 }}
      config={{ layout: "month_view", theme: "dark" }}
      calOrigin={origin}
    />
  );
}
