import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { unstable_setRequestLocale } from 'next-intl/server'
import FaqItem from '@/components/faq-items'
import LandingPageChecker from '@/components/landing-page-checker'

export default function IndexPage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  unstable_setRequestLocale(locale)

  const t = useTranslations('Index')
  const tFaq = useTranslations('Faq')

  return (
    <>
      <section id="hero" className='p-16 bg-gray-100 dark:bg-gray-800'>
        <div className='text-center'>
          <a href="https://ahrefs.com/blog/on-page-seo/" target="_blank" rel="noopener noreferrer">
          <span className="inline-flex shrink-0 items-center justify-center gap-1 border border-gray-400 transition pl-1 dark:border-gray-600">
            powered by
            <Image src="/ahrefs.png" width={50} height={50} alt="ahrefs" />
          </span>
          </a>
        </div>
        <h1 className="text-center">
          <span className="text-5xl font-bold text-indigo-800 mb-2 block dark:text-indigo-300">Landing Page Checker</span>
          <span className="text-xl dark:text-gray-300">Check Your Landing Page Before Shipping</span>
        </h1>
        <LandingPageChecker />
      </section>

      <section id="display">
      </section>
      
      <section id="faq" className='text-center mt-16'>
        <h2 className='text-2xl font-bold mb-8 dark:text-gray-200'>{tFaq('title')}</h2>
        <div className="max-w-3xl mx-auto text-left">
          {tFaq.raw('items').map((item: { question: string; answer: string }, index: number) => (
            <FaqItem key={index} question={item.question} answer={item.answer} />
          ))}
        </div>
      </section>
    </>
  )
}