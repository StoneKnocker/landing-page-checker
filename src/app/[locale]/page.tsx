import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { unstable_setRequestLocale } from 'next-intl/server'
import FaqItem from '@/components/faq-items'

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
      <section id="hero" className='p-16 bg-gray-100'>
        <div className='text-center'>
          <a href="https://ahrefs.com/blog/on-page-seo/" target="_blank" rel="noopener noreferrer">
          <span className="inline-flex shrink-0 items-center justify-center gap-1 border border-gray-400 transition pl-1">
            powered by
            <Image src="/ahrefs.png" width={50} height={50} alt="ahrefs" />
          </span>
          </a>
        </div>
        <h1 className="text-center">
          <span className="text-5xl font-bold text-indigo-800 mb-2 block">Landing Page Checker</span>
          <span className="text-xl">Check Your Landing Page Score Before Shipping</span>
        </h1>
        <div className="max-w-xl mx-auto mt-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Enter your landing page URL"
              className="w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-blue-500 focus:outline-none focus:ring"
            />
            <button
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Check
            </button>
          </div>
        </div>
      </section>
      <section id="display">

      </section>
      <section id="faq" className='text-center mt-16'>
        <h2 className='text-2xl font-bold mb-8'>{tFaq('title')}</h2>
        <div className="max-w-3xl mx-auto text-left">
          {tFaq.raw('items').map((item: { question: string; answer: string }, index: number) => (
            <FaqItem key={index} question={item.question} answer={item.answer} />
          ))}
        </div>
      </section>
    </>
  )
}