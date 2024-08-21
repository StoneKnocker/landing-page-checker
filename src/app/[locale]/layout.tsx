import '@/styles/globals.css'
import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Locale, locales } from '@/i18n'
import { unstable_setRequestLocale } from 'next-intl/server'
import { Suspense } from 'react'
import { getTranslations } from 'next-intl/server'

import { fontSans } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { ThemeProvider } from '@/components/theme-provider'
import { NextIntlClientProvider, useTranslations } from 'next-intl'
import GoogleAnalytics from '@/components/google-analytics'
import PlausibleAnalytics from '@/components/plausible'

const inter = Inter({ subsets: ['latin'] })

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params: { locale },
}: PageProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Common' })

  return {
    title: {
      default: t('title'),
      template: `%s | Landing Page Checker`,
    },
    description: t('description'),
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
  const t = useTranslations('Common')
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
              <div className="flex-1">
                <Suspense fallback={<div>{t('loading')}</div>}>
                  {children}
                </Suspense>
              </div>
            </NextIntlClientProvider>
            <SiteFooter locale={locale} />
          </div>
          <GoogleAnalytics GA_MEASUREMENT_ID={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ''} />
          <PlausibleAnalytics domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || ''} scriptPath={process.env.NEXT_PUBLIC_PLAUSIBLE_SCRIPT_PATH || ''} />
          {/* <TailwindIndicator /> */}
        </ThemeProvider>
      </body>
    </html>
  )
}