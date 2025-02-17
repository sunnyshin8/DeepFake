import SessionWrapper from "@/components/SessionWrapper";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata = {
  title: "ShaniAegis",
  description: "Deepfae detection tool",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <SessionWrapper>
      <body className={`antialiased`}>
        {children}
        <Toaster />
      </body>
      </SessionWrapper>
    </html >
  );
}
