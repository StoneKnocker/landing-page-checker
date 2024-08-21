import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Locale } from '@/i18n'
import { useTranslations } from 'next-intl'

interface MainNavProps {
  locale: Locale
}

export function MainNav({ locale }: MainNavProps) {
  const t = useTranslations('Navigation');
  return (
    <div className="flex gap-6 md:gap-10">
      <nav className="flex gap-6">
        <Link href={`/${locale}`} className="flex items-center space-x-2">
          <Image src="/website.svg" alt="Landing Page Checker" width={300} height={30} />
        </Link>
        <Link
          href={`/${locale}`}
          className={cn(
            'flex items-center text-sm font-medium ',
          )}
        >
          {t('home')}
        </Link>
        <Link
          href="/checklist"
          className={cn(
            'flex items-center text-sm font-medium ',
          )}
        >
          {t('checklist')}
        </Link>
      </nav>
    </div>
  )
}
