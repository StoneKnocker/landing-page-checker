import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['storage.ko-fi.com'],
    },
}

export default withNextIntl(nextConfig)
