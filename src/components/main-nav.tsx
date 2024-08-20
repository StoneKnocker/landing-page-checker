import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Locale } from '@/i18n'

interface MainNavProps {
  locale: Locale
}

export function MainNav({ locale }: MainNavProps) {

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
          Home
        </Link>
        <Link
          href="/checklist"
          className={cn(
            'flex items-center text-sm font-medium ',
          )}
        >
          Full Checklist
        </Link>
      </nav>
    </div>
  )
}
