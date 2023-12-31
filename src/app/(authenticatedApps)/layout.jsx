import Header from "@/components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { cookies } from "next/dist/client/components/headers";
import { Inter } from "next/font/google";
import { redirect } from "next/navigation";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children, modal }) {
  const nextCookie = cookies();

  const userExistsOrNot = nextCookie.get("user")?.value;

  if (!userExistsOrNot) {
    redirect("/login");
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster />
        <Header />
        {children}
      </body>
    </html>
  );
}
