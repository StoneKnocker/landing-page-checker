import { JSDOM } from 'jsdom'
import { removeStopwords } from 'stopword'
import jieba from 'nodejieba'

let loadTime, html, document

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
  if (lang.startsWith('zh')) {
    // Chinese
    words = jieba.cut(lowerCaseText)
  } else {
    // Default to English or other languages
    words = lowerCaseText.match(/\b[\w']+\b/g) || []
  }

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
  const lowercaseKeyword = keyword.toLowerCase()

  // Check page title (40 points)
  const title = document.querySelector('title')
  if (title && title.textContent?.toLowerCase().includes(lowercaseKeyword)) {
    score += 40
  }

  // Check main heading H1 (40 points)
  const h1 = document.querySelector('h1')
  if (h1 && h1.textContent?.toLowerCase().includes(lowercaseKeyword)) {
    score += 40
  }

  // Check subheadings H2, H3 (20 points)
  const subheadings = document.querySelectorAll('h2, h3')
  for (const subheading of subheadings) {
    if (subheading.textContent?.toLowerCase().includes(lowercaseKeyword)) {
      score += 20
      break // Only add 20 points once for subheadings
    }
  }

  return Math.min(score, 100) // Ensure the score doesn't exceed 100
}

/**
 * 实现一个函数，输入一个网页的html代码, 输出一个分数（0-100）
 * 判断是否使用标题标签结构化页面
   - 有且仅有一个<h1>标签 70分
   - 使用<h2>标签表示主要观点 20分
   - 使用<h3>及以下标签表示支持性内容 10分
 */
function calculateStructureScore(): number {
  let score = 0

  // Check for single H1 tag (70 points)
  const h1Tags = document.querySelectorAll('h1')
  if (h1Tags.length === 1) {
    score += 70
  }

  // Check for H2 tags (20 points)
  const h2Tags = document.querySelectorAll('h2')
  if (h2Tags.length > 0) {
    score += 20
  }

  // Check for H3 and below tags (10 points)
  const h3AndBelowTags = document.querySelectorAll('h3, h4, h5, h6')
  if (h3AndBelowTags.length > 0) {
    score += 10
  }

  return score
}

/**
 * 实现一个函数，输入一个网页的html代码, 输出一个分数（0-100）
 * 判断title是否符合引人注目
   - 保持简短(70字符以内) 50分
     - 如果没有 0分
     - 如果少于50个 或 多与70个字符 40分
   - 包含关键词 40分
   - 适当时包含年份 10分
 */
function calculateAttractiveTitleScore(keyword: string): number {
  let score = 0
  const title = document.querySelector('title')

  if (!title || !title.textContent) {
    return 0 // No h1 tag or empty h1 tag
  }

  const headingText = title.textContent.trim()
  const headingLength = headingText.length

  // Check heading length
  if (headingLength >= 50 && headingLength <= 70) {
    score += 50
  } else if (headingLength < 50 || headingLength > 70) {
    score += 40 // 50 - 10 for being outside the ideal range
  }

  // Check if heading contains keyword
  if (headingText.toLowerCase().includes(keyword.toLowerCase())) {
    score += 40
  }

  // Check if heading contains a year
  const currentYear = new Date().getFullYear()
  const yearRegex = new RegExp(`\\b(${currentYear}|${currentYear + 1})\\b`)
  if (yearRegex.test(headingText)) {
    score += 10
  }

  return Math.max(0, Math.min(score, 100)) // Ensure score is between 0 and 100
}

/**
 * 实现一个函数，输入一个网页的html代码, 输出一个分数（0-100）
 * 评估页面 description 的质量
   - 保持简短(160字符以内) 50分
      - 如果多于 170 个字符 40分
      - 如果少于 100 个字符 40分
      - 如果少于 50 个字符 30分
      - 如果少于 10 个字符 20分
      - 如果没有 0分
   - 包含关键词 50分
 */
function calculateDescriptionScore(keyword: string): number {
  let score = 0
  const metaDescription = document.querySelector('meta[name="description"]')

  if (!metaDescription || !metaDescription.getAttribute('content')) {
    return 0 // No description or empty description
  }

  const descriptionText = metaDescription.getAttribute('content').trim()
  const descriptionLength = descriptionText.length

  // Check description length
  if (descriptionLength <= 160) {
    score += 50
  } else if (descriptionLength > 170) {
    score += 40
  } else if (descriptionLength < 100) {
    score += 40
  } else if (descriptionLength < 50) {
    score += 30
  } else if (descriptionLength < 10) {
    score += 20
  }

  // Check if description contains keyword
  if (descriptionText.toLowerCase().includes(keyword.toLowerCase())) {
    score += 50
  }

  return Math.max(0, Math.min(score, 100)) // Ensure score is between 0 and 100
}

/**
 * 实现一个函数，输入一个网页的html代码, 输出一个分数（0-100）
 * 判断网页上的图片是否优化过
   - 如果没有图片 0分
   - 如果有图片 100分
    - 根据<img>属性判断，如果压缩过 25分
    - 添加描述性alt文本 30分
    - 使用描述性文件名 20分
    - 懒加载 10分
 */
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

/**
 * 实现一个函数，输入一个网页的url, 输出一个分数（0-100）
 * 判断一个网页的指标:
 * - 页面加载时间是否很快 30分
 * - 是否使用https 30分
 * - 是否移动端适配 40分
 */
async function calculateCWVScore(url: string): Promise<number> {
  await loadPage(url)
  let score = 0

  // Check if HTTPS is used
  if (url.startsWith('https://')) {
    score += 30
  }

  // Check load time (assuming 2 seconds or less is fast)
  if (loadTime <= 2000) {
    score += 30
  } else if (loadTime <= 4000) {
    score += 15 // Partial score for moderate load time
  }

  // Check mobile compatibility
  const hasViewportMeta =
    document.querySelector('meta[name="viewport"]') !== null
  const hasMediaQueries = /@media\s*\(/i.test(html)

  if (hasViewportMeta || hasMediaQueries) {
    score += 40
  }

  return Math.max(0, Math.min(score, 100)) // Ensure score is between 0 and 100
}

async function loadPage(url: string) {
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
  }
}

export async function calculatePageScore(url: string): Promise<number> {
  const keyword = getMostFrequentWord()
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
  const cwvScore = await calculateCWVScore(url)

  // return an integer number
  const score = (
    attractiveHeadingScore * 0.2 +
    keywordScore * 0.2 +
    descriptionScore * 0.2 +
    structureScore * 0.2 +
    imageOptimizationScore * 0.1 +
    cwvScore * 0.1
  )
  return Math.round(score);
}
