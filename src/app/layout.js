import "./globals.css";
import PageLoader from "@/components/PageLoader";
import SmoothScroll from "@/components/SmoothScroll";
import { Inter, JetBrains_Mono } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

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
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
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
      </head>
      <body>
        <PageLoader />
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
