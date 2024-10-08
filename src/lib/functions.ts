import { JSDOM } from 'jsdom'
import { removeStopwords } from 'stopword'
// import jieba from 'nodejieba'

let loadTime, html, document

// 扣分原因, 优化点
let reasons: string[] = []

/**
 * 实现一个函数, 输入的是一个网页的完整html代码
 * 统计这个网页的<body>标签下, 出现频率最高的词
 * 注意:
 *      1.排除一些常见的停止词和数字
 *      2.统计词频时, 忽略大小写
 *      3.考虑英文和中文分词的差异
 */
function getMostFrequentWord(): string {
  // Parse HTML
  const bodyText = document.body.textContent || ''
  const lang = document.documentElement.lang.toLowerCase()

  // Convert to lowercase
  const lowerCaseText = bodyText.toLowerCase()

  let words: string[]

  // Tokenize words based on language
  // if (lang.startsWith('zh')) {
  //   // Chinese
  //   words = jieba.cut(lowerCaseText)
  // } else {
    // Default to English or other languages
    words = lowerCaseText.match(/\b[\w']+\b/g) || []
  // }

  // Remove stopwords and numbers
  const filteredWords = removeStopwords(words).filter(
    (word) => !/^\d+$/.test(word),
  )

  // Count word frequencies
  const wordFrequency: { [key: string]: number } = {}
  filteredWords.forEach((word) => {
    wordFrequency[word] = (wordFrequency[word] || 0) + 1
  })

  // Find the most frequent word
  let mostFrequentWord = ''
  let highestFrequency = 0

  for (const [word, frequency] of Object.entries(wordFrequency)) {
    if (frequency > highestFrequency) {
      mostFrequentWord = word
      highestFrequency = frequency
    }
  }

  return mostFrequentWord
}

/**
 * 实现一个函数，输入一个网页的html代码和一个关键词, 输出一个分数（0-100）
 * 判断在相关位置包含目标关键词
   - 页面标题 40分
   - 主标题(H1) 40分
   - 副标题(部分H2, H3等) 20分
 */
function calculateKeywordScore(keyword: string): number {
  let score = 0
  const h1 = document.querySelector('h1')

  if (!h1 || !h1.textContent) {
    reasons.push("Missing or empty H1 tag")
    return 0 // No h1 tag or empty h1 tag
  }

  const h1Text = h1.textContent.trim()
  // console.log("h1Text:", h1Text)

  // Check if heading contains keyword
  if (h1Text.toLowerCase().includes(keyword.toLowerCase())) {
    score += 50
  } else {
    if (keyword) {
      reasons.push(`H1 tag does not contain the main keyword: "${keyword}"`)
    } else {
      reasons.push(`H1 tag does not contain the main keyword`)
    }
  }

  // Check keyword density in the body
  const bodyText = document.body.textContent
  // console.log("bodyText:", bodyText)
  const keywordCount = (bodyText.toLowerCase().match(new RegExp(keyword.toLowerCase(), 'g')) || []).length
  const wordCount = bodyText.split(/\s+/).length
  const keywordDensity = (keywordCount / wordCount) * 100

  if (keywordDensity >= 2 && keywordDensity <= 5) {
    score += 50
  } else {
    reasons.push(`Keyword density (${keywordDensity.toFixed(2)}%) is not optimal (2-5% recommended)`)
  }

  return Math.max(0, Math.min(score, 100)) // Ensure score is between 0 and 100
}

function calculateStructureScore(): number {
  let score = 0

  // Check for presence of h2 tags
  const h2Tags = document.querySelectorAll('h2')
  if (h2Tags.length > 0) {
    score += 50
  } else {
    reasons.push("No H2 tags found on the page")
  }

  // Check for presence of h3 tags
  const h3Tags = document.querySelectorAll('h3')
  if (h3Tags.length > 0) {
    score += 20
  } else {
    reasons.push("No H3 tags found on the page")
  }

  // Check for single H1 tag (70 points)
  const h1Tags = document.querySelectorAll('h1')
  if (h1Tags.length === 1) {
    score += 70
  } else {
    reasons.push("More than one H1 tag found on the page")
  }

  return score
}

function calculateAttractiveTitleScore(keyword: string): number {
  let score = 0
  const title = document.querySelector('title')

  if (!title || !title.textContent) {
    reasons.push("Missing or empty title tag")
    return 0 // No title tag or empty title tag
  }

  const headingText = title.textContent.trim()
  const headingLength = headingText.length

  // Check heading length
  if (headingLength >= 50 && headingLength <= 70) {
    score += 50
  } else if (headingLength < 50 || headingLength > 70) {
    score += 40 // 50 - 10 for being outside the ideal range
    reasons.push(`Title length (${headingLength} characters) is not optimal (50-70 characters recommended)`)
  }

  // Check if heading contains keyword
  if (headingText.toLowerCase().includes(keyword.toLowerCase())) {
    score += 40
  } else {
    if (keyword) {
      reasons.push(`Title does not contain the main keyword: "${keyword}"`)
    } else {
      reasons.push(`Title does not contain the main keyword`)
    }
  }

  // Check if heading contains a year
  const currentYear = new Date().getFullYear()
  const yearRegex = new RegExp(`\\b(${currentYear}|${currentYear + 1})\\b`)
  if (yearRegex.test(headingText)) {
    score += 10
  } else {
    reasons.push("Title does not include the current or next year")
  }

  return Math.max(0, Math.min(score, 100)) // Ensure score is between 0 and 100
}

function calculateDescriptionScore(keyword: string): number {
  let score = 0
  const metaDescription = document.querySelector('meta[name="description"]')

  if (!metaDescription || !metaDescription.getAttribute('content')) {
    reasons.push("Missing or empty meta description")
    return 0 // No meta description or empty content
  }

  const descriptionText = metaDescription.getAttribute('content').trim()
  const descriptionLength = descriptionText.length

  // Check description length
  if (descriptionLength >= 120 && descriptionLength <= 160) {
    score += 50
  } else {
    reasons.push(`Meta description length (${descriptionLength} characters) is not optimal (120-160 characters recommended)`)
    score += 25 // Partial score for having a description, even if not optimal length
  }

  // Check if description contains keyword
  if (descriptionText.toLowerCase().includes(keyword.toLowerCase())) {
    score += 50
  } else {
    reasons.push(`Meta description does not contain the main keyword: "${keyword}"`)
  }

  return Math.max(0, Math.min(score, 100)) // Ensure score is between 0 and 100
}

function calculateImageOptimizationScore(): number {
  const images = document.querySelectorAll('img')
  if (images.length === 0) {
    return 0 // No images found
  }

  let score = 0

  // check the last image
  const img = images[images.length - 1]

  // Check for responsive images
  if (img.hasAttribute('srcset') && img.hasAttribute('sizes')) {
    score += 50
  }

  // Check for descriptive alt text
  if (img.hasAttribute('alt') && img.getAttribute('alt').trim().length > 0) {
    score += 30
  }

  // Check for descriptive filename
  const src = img.getAttribute('src')
  if (
    src &&
    /^[a-z0-9-_]+\.(?:jpg|jpeg|png|gif|webp)$/i.test(src.split('/').pop())
  ) {
    score += 10
  }

  // Check for lazy loading
  if (img.hasAttribute('loading') && img.getAttribute('loading') === 'lazy') {
    score += 10
  }

  return Math.max(0, Math.min(score, 100)) // Ensure score is between 0 and 100
}

async function calculateCWVScore(): Promise<number> {
  let score = 0

  // Check load time (assuming 2 seconds or less is fast)
  if (loadTime <= 2000) {
    score += 50
  } else if (loadTime <= 4000) {
    score += 30 // Partial score for moderate load time
  }

  // Check mobile compatibility
  const hasViewportMeta =
    document.querySelector('meta[name="viewport"]') !== null
  const hasMediaQueries = /@media\s*\(/i.test(html)

  if (hasViewportMeta || hasMediaQueries) {
    score += 50
  }

  return Math.max(0, Math.min(score, 100)) // Ensure score is between 0 and 100
}

async function loadPage(url: string) {
  if (!url.startsWith('http')) {
    url = 'https://' + url
  }
  try {
    // Fetch the webpage
    const startTime = Date.now()
    const response = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
    })
    loadTime = Date.now() - startTime

    html = await response.text()

    const dom = new JSDOM(html)
    document = dom.window.document
  } catch (error) {
    console.error('Error loading page:', error)
    throw error
  }
}

export async function calculatePageScore(url: string): Promise<{ score: number; reasons: string[] }> {
  reasons = [] // Reset reasons array

  await loadPage(url)

  const keyword = getMostFrequentWord()
  console.log("main keyword:", keyword)
  // rate 20%
  const attractiveHeadingScore = calculateAttractiveTitleScore(keyword)
  // rate 20%
  const keywordScore = calculateKeywordScore(keyword)
  // rate 20%
  const descriptionScore = calculateDescriptionScore(keyword)
  // rate 10%
  const structureScore = calculateStructureScore()
  // rate 10%
  const imageOptimizationScore = calculateImageOptimizationScore()
  // rate 20%
  const cwvScore = await calculateCWVScore()

  // return an integer number
  const score = Math.round(
    attractiveHeadingScore * 0.2 +
    keywordScore * 0.2 +
    descriptionScore * 0.2 +
    structureScore * 0.2 +
    imageOptimizationScore * 0.1 +
    cwvScore * 0.1
  )
  return { score, reasons }
}