'use client'

import { useState } from 'react'
import Loading from '@/app/[locale]/loading'

export default function LandingPageChecker() {
  const [url, setUrl] = useState('')
  const [score, setScore] = useState<number | null>(null)
  const [reasons, setReasons] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (url) {
      setIsLoading(true)
      setScore(null)
      setReasons([])
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
        setReasons(data.reasons)
      } catch (error) {
        console.error('Error calculating page score:', error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const getScoreColor = (score: number) => {
    if (score > 90) return 'border-green-500 text-green-500 dark:border-green-400 dark:text-green-400';
    if (score > 60) return 'border-yellow-500 text-yellow-500 dark:border-yellow-400 dark:text-yellow-400';
    return 'border-red-500 text-red-500 dark:border-red-400 dark:text-red-400';
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto mt-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Enter your landing page URL"
            className="w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-blue-500 focus:outline-none focus:ring dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:focus:border-blue-400"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-400"
          >
            Check
          </button>
        </div>
      </form>

      {isLoading ? (
        <div className="mt-8">
          <Loading />
          <p className="text-center mt-4 text-gray-600 dark:text-gray-400">Analyzing your landing page...</p>
        </div>
      ) : score !== null && (
        <div className="text-center mt-8">
          <div className="text-xl font-bold mt-4 mb-4 dark:text-gray-200">
            Your Landing Page Score
          </div>
          <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full border-4 ${getScoreColor(score)}`}>
            <span className="text-2xl font-bold">{score}</span>
          </div>
          {reasons.length > 0 && (
            <div className="mt-4">
              <p className="text-xl font-semibold my-4 dark:text-gray-200">Areas for Improvement:</p>
              <ul className="list-disc list-inside text-left max-w-xl mx-auto space-y-2">
                {reasons.map((reason, index) => (
                  <li key={index} className="text-gray-700 dark:text-gray-300">{reason}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </>
  )
}