import { TComponentData } from '@/types'

export function searchComponents(
  query: string,
  components: TComponentData[]
): TComponentData[] {
  const stopWords = [
    'using',
    'has',
    'with',
    'styled',
    'ui',
    'a',
    'and',
    'about',
    'again',
    'all',
    'an',
    'any',
    'are',
    'is',
    'be',
    'because',
    'been',
    'by',
    'could',
    'did',
    'do',
    'does',
    'doing',
    'down',
    'during',
    'each',
    'few',
    'for',
    'from',
    'further',
    'had',
    'has',
    'have',
    'having',
    'how',
    'if',
    'in',
    'into',
    'is',
    'it',
    'its',
    'itself',
    'more',
    'most',
    'must',
    'no',
    'nor',
    'not',
    'of',
    'off',
    'on',
    'once',
    'only',
    'or',
    'other',
    'ought',
    'our',
    'ours',
    'own',
    'same',
    'so',
    'some',
    'such',
    'than',
    'that',
    'the',
    'their',
    'theirs',
    'them',
    'themselves',
    'then',
    'there',
    'these',
    'they',
    'this',
    'those',
    'through',
    'to',
    'too',
    'under',
    'until',
    'up',
    'very',
    'was',
    'we',
    'were',
    'what',
    'when',
    'where',
    'which',
    'while',
    'with',
    'would',
  ]
  const keywords = query
    .toLowerCase()
    .replace(/[^\w\s]|_/g, '') // Strip punctuation
    .trim()
    .split(' ')
    .filter((word) => !stopWords.includes(word))
  const results: TComponentData[] = []

  components.forEach((component) => {
    const match = keywords.every((keyword) => {
      return (
        component.tags.includes(keyword) || component.name.includes(keyword)
      )
    })
    if (match) {
      results.push(component)
    }
  })

  return results
}
