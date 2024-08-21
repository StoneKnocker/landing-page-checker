import Script from 'next/script'

export default function PlausibleAnalytics({ domain, scriptPath }: { domain: string, scriptPath: string }) {
  return (
    <Script
      strategy="lazyOnload"
      data-domain={domain}
      src={scriptPath}
    />
  )
}