import Script from "next/script";

const PROJECT_ID =
  process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID ?? "wkafuvbq8l";

export function Clarity() {
  if (!PROJECT_ID) return null;

  return (
    <Script id="ms-clarity" strategy="afterInteractive">
      {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${PROJECT_ID}");`}
    </Script>
  );
}
