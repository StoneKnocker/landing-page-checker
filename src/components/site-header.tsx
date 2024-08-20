import Link from 'next/link'
import Image from 'next/image'
import { getSiteConfig } from '@/config/site-i18n'
import { buttonVariants } from '@/components/ui/button'
import { Icons } from '@/components/icons'
import { MainNav } from '@/components/main-nav'
import { Locale } from '@/i18n'

interface SiteHeaderProps {
  locale: Locale
}

export function SiteHeader({ locale }: SiteHeaderProps) {

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav locale={locale} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <Link
              href="https://github.com/StoneKnocker/landing-page-checker"
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={buttonVariants({
                  size: 'icon',
                  variant: 'ghost',
                })}
              >
                <Icons.gitHub className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
            <Link
              href="https://ko-fi.com/stoneknocker"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div
                className={buttonVariants({
                  size: 'icon',
                  variant: 'ghost',
                })}
              >
                <Image 
                  className="h-5 w-6"
                  src="https://storage.ko-fi.com/cdn/nav-logo-stroke.png" 
                  alt="Ko-fi Logo" 
                  width={24}
                  height={24}
                />
                <span className="sr-only">Ko-fi</span>
              </div>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
