import '@/styles/globals.css'
import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Locale, locales } from '@/i18n'
import { unstable_setRequestLocale } from 'next-intl/server'

import { fontSans } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { ThemeProvider } from '@/components/theme-provider'
import { NextIntlClientProvider } from 'next-intl'

const inter = Inter({ subsets: ['latin'] })

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params: { locale },
}: PageProps): Promise<Metadata> {
  return {
    title: {
      default: "Landing Page Checker: Optimize Your Web Pages for SEO",
      template: `%s | Landing Page Checker`,
    },
    description: "Improve your website's SEO with our Landing Page Checker. Analyze and optimize your web pages for better search engine rankings and user experience.",
    icons: {
      icon: '/favicon.svg',
    },
  }
}

export type PageProps = Readonly<{
  children: React.ReactNode
  params: { locale: Locale }
}>

export default function RootLayout({
  children,
  params: { locale },
}: PageProps) {
  unstable_setRequestLocale(locale)
  return (
    <html lang={locale} suppressHydrationWarning>
      <head />
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
          inter.className,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader locale={locale} />
            <NextIntlClientProvider locale={locale}>
              <div className="flex-1">{children}</div>
            </NextIntlClientProvider>
            <SiteFooter locale={locale} />
          </div>
          {/* <TailwindIndicator /> */}
        </ThemeProvider>
      </body>
    </html>
  )
}
