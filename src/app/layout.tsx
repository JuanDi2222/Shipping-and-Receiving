import "~/styles/globals.css";

import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "MTC Shipping and Receiving",
  description: "Import/Export managing system for MTC",
  icons: [{ rel: "icon", url: "/PHIN.ico" }],
};

export default function RootLayout({children,}: {children: React.ReactNode;}) {
    return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>{children}</body>
    </html>
  );
}

