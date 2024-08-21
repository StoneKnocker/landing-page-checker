import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'

// languages supported
export const locales = ['en', 'fr', 'de', 'es'] as const;

export type Locale = (typeof locales)[number]
export const defaultLocale = 'en'
// Use the default: `always`，设置为 as-needed可不显示默认路由
export const localePrefix = 'as-needed';

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound()

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
  }
})
