import "./globals.css";
import PageLoader from "@/components/PageLoader";

export const metadata = {
  title: "Badrinath M H — Software Developer",
  description:
    "Full-stack developer with 2.8+ years of experience building and deploying production-grade web applications, ERP systems, logistics platforms, and IoT solutions.",
  keywords: [
    "Badrinath M H",
    "Software Developer",
    "Full-Stack Developer",
    "Node.js",
    "React.js",
    "Next.js",
    "MongoDB",
    "Express.js",
    "REST APIs",
  ],
  authors: [{ name: "Badrinath M H" }],
  openGraph: {
    title: "Badrinath M H — Software Developer",
    description:
      "Full-stack developer with 2.8+ years of experience building scalable web apps, backend systems, and responsive user interfaces.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var t = localStorage.getItem('portfolio-theme') || 'light';
                  document.documentElement.setAttribute('data-theme', t);
                } catch (e) {
                  document.documentElement.setAttribute('data-theme', 'light');
                }
              })();
            `,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <PageLoader />
        {children}
      </body>
    </html>
  );
}
