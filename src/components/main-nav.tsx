import * as React from 'react'
import Link from 'next/link'

import { getSiteConfig } from '@/config/site-i18n'
import { cn } from '@/lib/utils'
import { Locale } from '@/i18n'

interface MainNavProps {
  locale: Locale
}

export function MainNav({ locale }: MainNavProps) {
  const siteConfig = getSiteConfig(locale)

  return (
    <div className="flex gap-6 md:gap-10">
      <Link href={`/${locale}`} className="flex items-center space-x-2">
        <h1 className="max-w-[66vw] truncate text-lg font-bold normal-case sm:max-w-full sm:text-3xl">
          {siteConfig.name}
        </h1>
      </Link>
        <nav className="flex gap-6">
              <Link
                href="/"
                className={cn(
                  'flex items-center text-sm font-medium text-muted-foreground',
                  // item.disabled && 'cursor-not-allowed opacity-80',
                )}
              >
                Home
              </Link>
              <Link
                href="/checklist"
                className={cn(
                  'flex items-center text-sm font-medium text-muted-foreground',
                  // item.disabled && 'cursor-not-allowed opacity-80',
                )}
              >
                Full Checklist
              </Link>
        </nav>
    </div>
  )
}
