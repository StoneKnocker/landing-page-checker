import Link from 'next/link'

import { ThemeToggle } from '@/components/theme-toggle'
import { Locale } from '@/i18n'
import { LanguageToggle } from './language-toggle'

interface SiteFooterProps {
  locale: Locale
}

export function SiteFooter({ locale }: SiteFooterProps) {

  return (
    <footer className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <LanguageToggle locale={locale} />
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </footer>
  )
}
