'use client'

import { useState } from 'react'

export default function LandingPageChecker() {
  const [url, setUrl] = useState('')
  const [score, setScore] = useState<number | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (url) {
      try {
        const response = await fetch('/api/calculatePageScore', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url }),
        })
        if (!response.ok) {
          throw new Error('API request failed')
        }
        const data = await response.json()
        setScore(data.score)
      } catch (error) {
        console.error('Error calculating page score:', error)
        // 可以在这里添加错误处理逻辑，比如设置一个错误状态
      }
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto mt-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Enter your landing page URL"
            className="w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-blue-500 focus:outline-none focus:ring"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Check
          </button>
        </div>
      </form>

      {score !== null && (
        <div className="text-center mt-8">
          <div className="text-2xl font-bold">
            Your Landing Page Score: {score}
          </div>
        </div>
      )}
    </>
  )
}