import ReactMarkdown from 'react-markdown'

const privacyContent = `
# Privacy Policy

This Privacy Policy describes how we collect, use, and protect your personal information when you use our Landing Page Checker tool.

## Information We Collect

We collect the URL of the landing page you submit for analysis. We do not collect any personal information unless you explicitly provide it to us.

## How We Use Your Information

We use the submitted URL solely for the purpose of analyzing and providing feedback on your landing page. We do not share this information with third parties.

## Data Protection

We implement appropriate technical and organizational measures to ensure the security of your information.

## Cookies

Our website may use cookies to enhance your browsing experience. You can choose to disable cookies in your browser settings.

## Changes to This Privacy Policy

We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.

## Contact Us

If you have any questions about this Privacy Policy, please contact us.
`

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="prose dark:prose-invert max-w-none">
        <ReactMarkdown>{privacyContent}</ReactMarkdown>
      </div>
    </div>
  )
}
