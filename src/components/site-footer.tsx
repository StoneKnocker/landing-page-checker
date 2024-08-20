import Link from 'next/link'

import { ThemeToggle } from '@/components/theme-toggle'
import { Locale } from '@/i18n'
import { languageSupported } from '@/config/language'

interface SiteFooterProps {
  locale: Locale
}

export function SiteFooter({ locale }: SiteFooterProps) {

  return (
    <footer className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex flex-1 items-center justify-start space-x-4">
        <ThemeToggle />

          <nav className="flex flex-wrap items-center gap-4">
            {languageSupported.map((language) => (
              <Link 
                key={language.lang} 
                href={`/${language.lang}`}
                className="text-sm hover:underline transition-colors duration-200 ease-in-out"
              >
                {language.language}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}
