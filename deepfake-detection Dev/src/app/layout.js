import { Toaster } from "sonner";
import "./globals.css";

export const metadata = {
  title: "ShaniAegis",
  description: "Deepfae detection tool",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        {children}
        <Toaster />
      </body>
    </html >
  );
}
