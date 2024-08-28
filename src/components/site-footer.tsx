import Link from 'next/link'

import { ThemeToggle } from '@/components/theme-toggle'
import { Locale } from '@/i18n'
import { languageSupported } from '@/config/language'
import { useTranslations } from 'next-intl'

interface SiteFooterProps {
  locale: Locale
}

export function SiteFooter({ locale }: SiteFooterProps) {
  const t = useTranslations('Navigation');
  return (
    <footer className="sticky top-0 z-40 w-full border-b bg-background mt-8">
      <div className="container flex flex-col h-auto py-4 items-center justify-between">
        <div className="flex items-center space-x-4 mb-4">
          <ThemeToggle />
          <nav className="flex flex-wrap items-center gap-4">
            {languageSupported.map((language) => (
              <Link 
                key={language.lang} 
                href={language.lang === 'en' ? '/' : `/${language.lang}`}
                className="text-sm hover:underline transition-colors duration-200 ease-in-out"
              >
                {language.language}
              </Link>
            ))}
          </nav>
        </div>
        <nav className="flex items-center space-x-4 mb-4">
          <Link
            href={`/privacy`}
            className="text-sm hover:underline transition-colors duration-200 ease-in-out"
          >
            {t('privacy')}
          </Link>
          <Link
            href={`/terms-of-service`}
            className="text-sm hover:underline transition-colors duration-200 ease-in-out"
          >
            {t('terms')}
          </Link>
        </nav>
        <nav className="flex items-center space-x-4">
          <a href="https://aiwith.me" target="_blank" title="Discover thousands of AI Tools" className="text-sm hover:underline transition-colors duration-200 ease-in-out">AIWITH.ME</a>
          <a href="https://tap4.ai/" target="_blank" title="Tap4 AI Tools Directory" className="text-sm hover:underline transition-colors duration-200 ease-in-out">Tap4 AI Tools Diresctory</a>
        </nav>
      </div>
    </footer>
  )
}