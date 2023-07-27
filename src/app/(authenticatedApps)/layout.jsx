import Header from "@/components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { cookies } from "next/dist/client/components/headers";
import { Inter } from "next/font/google";
import { redirect } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  const nextCookie = cookies();

  const userExistsOrNot = nextCookie.get("user")?.value;

  if (!userExistsOrNot) {
     redirect("/login");
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
