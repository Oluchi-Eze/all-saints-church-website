import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "All Saints' Church Lelystad | English-Speaking Church Netherlands",
    template: "%s | All Saints' Church"
  },
  description: "A vibrant, multicultural English-speaking church in Lelystad. Part of the Nigerian Anglican Chaplaincy Europe. Join our family for worship, community, and grace.",
  keywords: [
    "English church Lelystad", 
    "Anglican church Netherlands", 
    "International church Flevoland", 
    "Nigerian Anglican Chaplaincy Europe", 
    "Worship in Lelystad",
    "Expat church Netherlands"
  ],
  openGraph: {
    title: "All Saints' Church Lelystad",
    description: "Welcome Home. Join our multicultural community in the heart of Lelystad.",
    url: "https://your-domain.nl", // Replace with your actual domain later
    siteName: "All Saints' Church",
    images: [
      {
        url: "/og-image.jpg", // We will create this later
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer /> {/* Add it here */}
      </body>
    </html>
  );
}