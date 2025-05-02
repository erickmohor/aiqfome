import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { QueryClientProvider } from "./_providers/queryClient";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900", "1000"],
});

export const metadata: Metadata = {
  title: "aiqfome",
  description:
    "Peça seu delivery pelo aiqfome ou torne-se um lojista ou licenciado parceiro para fazer parte do 2º maior app de delivery do Brasil e líder do interior",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} font-main antialiased`}>
        <QueryClientProvider>{children}</QueryClientProvider>
      </body>
    </html>
  );
}
