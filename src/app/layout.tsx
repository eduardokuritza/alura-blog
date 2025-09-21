import "@/scss/main.scss";
import type { Metadata } from "next";
import { Inter, Chakra_Petch } from "next/font/google";
import ThemeProvider from "@/providers/ThemeProvider/ThemeProvider";
import TanstackProvider from "@/providers/TanstackProvider/TanstackProvider";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

const chakraPetch = Chakra_Petch({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-chakra"
});

export const metadata: Metadata = {
  title: "Fernanda Mascheti",
  description:
    "Sou Engenheira de Computação e Pedagoga. Ensino pensamento computacional para estudantes do Ensino Fundamental e Médio. Ensino sobre pensamento computacional usando HTML, CSS e JavaScript. Veja os projetos que já desenvolvi!",
  icons: {
    icon: {
      sizes: "500x500",
      url: "/icon.png",
      href: "/icon.png",
      type: "image/png"
    }
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body
        className={`${inter.variable} ${chakraPetch.variable} bg-background text-foreground flex w-full flex-col items-center font-sans antialiased`}
      >
        <ThemeProvider>
          <TanstackProvider>
            <Header />
            {children}
            <Footer />
          </TanstackProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
