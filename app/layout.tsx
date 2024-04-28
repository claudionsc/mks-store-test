import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { CartContextProvider } from "@/src/data/contexts/cartContext";
import { TanStackProvider } from "@/src/providers/TanStackProvider";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MK Store",
  description: "Criado por Claudio Nascimento",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <TanStackProvider>
        <CartContextProvider>
          <body className={montserrat.className}>{children}</body>
        </CartContextProvider>
      </TanStackProvider>
    </html>
  );
}
