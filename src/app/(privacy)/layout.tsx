import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import "@/styles/globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({ locale: "en", namespace: "metadata" });

  return {
    title: {
      template: `%s | ${t("title")}`,
      default: t("title"),
    },
    description: t("description"),
  };
}

function Navigation() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <Link href="/" className="hover:underline">
        Home
      </Link>
    </nav>
  );
}

function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white shadow-md rounded-lg p-6 prose">
          {children}
        </div>
      </main>
    </div>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <PrivacyLayout>{children}</PrivacyLayout>
      </body>
    </html>
  );
}