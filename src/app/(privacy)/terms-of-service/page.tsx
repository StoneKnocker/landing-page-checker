import ReactMarkdown from 'react-markdown'

const termsContent = `
# Terms of Service

Welcome to Landing Page Checker. By using our service, you agree to these Terms of Service. Please read them carefully.

## Use of Service

1. You must be at least 13 years old to use this service.
2. You are responsible for maintaining the confidentiality of your account and password.
3. You agree to use the service only for lawful purposes and in accordance with these Terms.

## User Content

1. You retain all rights to any content you submit, post or display on or through the service.
2. By submitting content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, and distribute that content in connection with the service.

## Intellectual Property

1. The service and its original content, features, and functionality are owned by us and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.

## Termination

1. We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever.

## Limitation of Liability

1. In no event shall we be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.

## Governing Law

These Terms shall be governed and construed in accordance with the laws of [Your Country/State], without regard to its conflict of law provisions.

## Changes to Terms

We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect.

## Contact Us

If you have any questions about these Terms, please contact support@landingpagechecker.com.
`

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="prose dark:prose-invert max-w-none">
        <ReactMarkdown>{termsContent}</ReactMarkdown>
      </div>
    </div>
  )
}
